/**
 * 节点扩容controller
 * @author wuchanggui
 * @createTime 2015-5-23
 */
sdsomwebApp.controller('nodeAddCtrl', ['$rootScope', '$scope', 'nodeFactory', function ($rootScope, $scope, nodeFactory) {
    'use strict';
    baseModal.call(this, $rootScope, $scope);

    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;

    //弹出框控制器
    $scope.modalCtrl = {
        message: "",    //弹出框标题信息
        to: "",         //当前要去做的业务
        sureTo: "",     //确定时调用的方法
        param: {},
        set: function (message, to, func) {
            this.message = message;
            this.to = to;
            this.sureTo = func;
        },
        sure: function () {
            //当点击确定按钮，跳转到指定方法
            if (this.sureTo) {
                this.sureTo();
            }
        }
    };

    var init = function () {
        $scope.disabledScan = false;
        $scope.isReadWriteCacheMix = false;
        // 控制扩容节点编辑框
        $scope.isEditStatus = false;

        //获取现有的node节点
        nodeFactory.nodeConfGet(function (res) {
            if (res.success) {
                $scope.nodes = res.data;
                if ($scope.nodes.cluster.isReadWriteCacheMix === '0') {
                    $scope.isReadWriteCacheMix = false;
                } else {
                    $scope.isReadWriteCacheMix = true;
                }
                $scope.networks_config = $scope.nodes.cluster.networks_config;
            } else {
                $scope.setFailNoticeMsg('查询失败！');
            }
        });
    };

    init();

    $scope.changeNode4AddSeletedNic = function(networkName, selected) {
        for(var i = 0; i < $scope.node4Add.servers.length; i ++){
            for(var j = 0; j < $scope.node4Add.servers[i].nics.length; j++){
                if($scope.node4Add.servers[i].nics[j].network == networkName){
                    $scope.node4Add.servers[i].nics[j].selected = selected;
                }
            }
        }
    };

    /**
     * 开始扫描
     */
    $scope.startDiscover = function () {
        if (!IP_REGEXP.test($scope.addIp)) {
            $scope.setFailNoticeMsg('请输入正确的IP！');
            return;
        }
        $scope.isDiscover = true;
        $scope.disabledScan = true;
        $scope.nodeAddProccessing = false;
        $scope.atProccessingNodeCount = 0;
        $scope.nodeAddingIpaddrArray = [];
        $scope.expandRollbackMes = ''

        nodeFactory.singledislover({
            startIp: $scope.addIp,
            endIp: $scope.addIp
        }, function (res) {
            $scope.isDiscover = false;
            if (res.success) {
                $scope.setSuccNoticeMsg('扫描完成！');
                $scope.node4Add = res.data;
                $scope.disabledScan = false;
                $scope.disableNodeAdd = false;
                if ($scope.node4Add.servers.length != 0) {
                    //查看扫描出的节点是否正在初始化
                    angular.forEach($scope.node4Add.servers, function (node) {
                        if (node.progress == 100) {
                            $scope.disableNodeAdd = true;
                        }
                        if (node.progress != -1 && node.progress != 100) {
                            $scope.atProccessingNodeCount = $scope.atProccessingNodeCount + 1;
                            $scope.nodeAddingIpaddrArray.push(node.originalIp.ipaddr);
                            node.selected = 0;
                        }
                        if ($scope.isReadWriteCacheMix) {
                            for (var j = 0; j < node.disks.length; j++) {
                                if (node.disks[j].purpose == 'writecache' || node.disks[j].purpose == 'readcache') {
                                    node.disks[j].purpose = 'rwcache';
                                }
                            }
                        };
                    });

                    $scope.correctSelected();
                    $scope.isAdd = true;

                    if ($scope.atProccessingNodeCount > 0) {
                        $scope.allIsChecked = false;
                        $scope.getScanedNodeProgress();
                    }
                }
                if (!$scope.disableNodeAdd){
                    $scope.checkPoolStats()
                }
            } else {
                $scope.setFailNoticeMsg(res.message);
            }
        });
    };

    /**
    * 检查osd pool状态是否允许扩容
    */
    $scope.checkPoolStats = function(){
        var data = {'all_list': true}
        nodeFactory.checkPoolStats(data, function (response){
            if (response.success){
                var poolList = response.data;
                for (var i=0; i<poolList.length; i++){
                    $scope.expandStatMsg = ""
                    var status = poolList[i].status.state;
                    if (status == "recovering"){
                        $scope.expandStatMsg = "集群处于恢复状态, 请恢复正常后重试!";
                        $scope.disableNodeAdd = true;
                        return
                    }
                    else if (status == "unhealthy"){
                        $scope.expandStatMsg = "集群异常, 请修复后重试!"
                        $scope.disableNodeAdd = true;
                        return
                    }
                }
                $scope.disableNodeAdd = false;
                return
            }else{
                $scope.expandStatMsg = "集群异常, 请修复后重试!"
                $scope.disableNodeAdd = true;
                return
            } 
        });
    }

    /*
    *  创建定时器，每10秒刷新一次检测osd pool状态
    */
    $scope.checkPoolStatsTimer = function(){
        $scope.check_pool_stats_timer = setInterval($scope.checkPoolStats, 10000);
    }

    /*
    * 关闭定时器，停止检测osd pool状态
    */
    $scope.clearCheckPoolStatsTimer = function(){
        clearInterval($scope.check_pool_stats_timer)
    };


    /**
     * 根据用户选择发生的变化而变化
     */
    $scope.correctSelected = function () {
        angular.forEach($scope.node4Add.servers, function (node) {
            if (node.progress != -1) {
                node.selected = 0;
            }
            if (node.selected == 1) {
                node.$checked = true;
            } else {
                node.$checked = false;
            }
        });
    };

    $scope.getScanedNodeProgress = function () {
        if ($scope.nodeAddingIpaddrArray.length === 0) {
            $scope.setSuccNoticeMsg('节点添加成功！');
            if ($scope.getScanedNodeProgressFlag) {
                clearTimeout($scope.getScanedNodeProgressFlag);
            }
        } else {
            $scope.getScanedNodeProgressRemote();

            if ($scope.getScanedNodeProgressFlag) {
                clearTimeout($scope.getScanedNodeProgressFlag);
            }
            $scope.getScanedNodeProgressFlag = setTimeout(function () {
                $scope.getScanedNodeProgress();
            }, 3000);
        }
    };

    $scope.getScanedNodeProgressRemote = function () {
        if ($scope.nodeAddingIpaddrArray.length === 0) {
            return;
        } else {
            angular.forEach($scope.nodeAddingIpaddrArray, function (obj, index) {
                nodeFactory.nodeProgGet({'ipaddr': obj}, function (response) {
                    if (response.success) {
                        var progressObjTemp = response.data;
                        angular.forEach($scope.node4Add.servers, function (node) {
                            if (node.originalIp.ipaddr == progressObjTemp.ipaddr ||
                                node.bussinessIP.ipaddr == progressObjTemp.ipaddr ||
                                node.publicIP.ipaddr == progressObjTemp.ipaddr ||
                                node.clusterIP.ipaddr == progressObjTemp.ipaddr) {
                                var progress = parseInt(progressObjTemp.progress);
                                if (progress > 100) {
                                    progress = 100;
                                }
                                node.progress = progress;
                            }
                        });
                        if (progressObjTemp.progress >= 100) {
                            $scope.nodeAddProccessing = false;
                            $scope.nodeAddingIpaddrArray.splice(index, 1);
                        }
                        if (progressObjTemp.status == 'Rollback'){
                            $scope.expandRollbackMes = '停止扩容,正在回滚!'
                            clearTimeout($scope.getScanedNodeProgressFlag);
                        }
                    }
                });
            });
        }
    };


    $scope.changeSeletedNic = function(networkName, selected) {
        for(var i = 0; i < $scope.node4Add.servers.length; i ++){
            for(var j = 0; j < $scope.node4Add.servers[i].nics.length; j++){
                if($scope.node4Add.servers[i].nics[j].network == networkName){
                    $scope.node4Add.servers[i].nics[j].selected = selected;
                }
            }
        }
    };


    // 检查是否选择了网卡
    $scope.checkNicSlected = function(server, networkConfig, notFirstCalling){
        var networkName = networkConfig.name;
        if (networkConfig.enable == 0) {
            if (notFirstCalling != true) {
                return true;
            } else {
                $scope.setFailNoticeMsg(getNetworkNameCN(networkName) + "未启用");
                return false;
            }
        }

        // 检查是否选择了网卡
        if (networkConfig.using_independent_nics == 1) {
            var haveSelectNic = false;
            for (var nicNum = 0; nicNum < server.nics.length; nicNum++) {
                var nic = server.nics[nicNum];
                if(nic.selected ==1 && nic.network == networkName) {
                    haveSelectNic = true;
                }
            }
            if (haveSelectNic != true) {
                $scope.setFailNoticeMsg("节点 " + server.hostid + "(" + server.originalIp.ipaddr + ") " +
                                        getNetworkNameCN(networkName) + "未选择网卡");
            }
            return haveSelectNic;
        } else {
            var shareNicNetworkName = networkConfig.share_nics_from;
            return $scope.checkNicSlected(server, $scope.networks_config[shareNicNetworkName], true);
        }
    };

    /**
     * 创建新的节点
     */
    $scope.checkAndAddServers = function () {
        //检查是否选择的节点数据为空
        //检查IP是否有冲突
        $scope.clearCheckPoolStatsTimer()
        $scope.ipaddrNetmaskConfictFlag = false;
        $scope.nodeAddingCount = 0;
        angular.forEach($scope.node4Add.servers, function (node4AddServer, iindex) {
            if (node4AddServer.selected != 1) {
                return;
            }
            $scope.nodeAddingCount = $scope.nodeAddingCount + 1;
        });
        if ($scope.nodeAddingCount < 1) {
            $scope.setFailNoticeMsg('请选择要添加的节点');
            return;
        }

        // 检查网络配置
        var checkNetwork = ['bussiness', 'public', 'cluster'];
        for (var n = 0; n < checkNetwork.length; n++) {
            var networkName = checkNetwork[n];
            var networkNameIP = networkName + "IP";
            var networkConfig = $scope.networks_config[networkName];
            if (networkConfig.enable == 0){
                // 取消选择了该网络的网卡
                $scope.changeSeletedNic(networkName, 0);
                continue;
            }

            var serversLen = $scope.node4Add.servers.length;
            for (var i =0; i < serversLen; i++) {
                var iserver = $scope.node4Add.servers[i];
                if(iserver.selected != 1){
                    continue;
                };

                // 检查是否选择了网卡
                if ($scope.checkNicSlected(iserver, networkConfig) != true) {
                    return;
                }

                // gateway是否合法
                if ($scope.isConfigNetworkGateway($scope.networks_config, networkName)){
					if (!(ZERO_IP_REGEXP.test(iserver[networkNameIP].gateway) ||
						  FULL_IP_REGEXP.test(iserver[networkNameIP].gateway))) {
						var ret = $scope.check_ipaddr_netmask_samenet(iserver.hostid,
																	  iserver[networkNameIP].ipaddr,
																	  iserver[networkNameIP].netmask,
																	  iserver.hostid,
																	  iserver[networkNameIP].gateway,
																	  iserver[networkNameIP].netmask);
						if (ret != true) {
							return;
						}
					}
                }

                // 是否节点其它网络也使用了该IP
                for (var nn = 0; nn < checkNetwork.length; nn++) {
                    var nn_networkName = checkNetwork[nn];
                    var nn_networkNameIP = nn_networkName + 'IP';
                    if (networkName == nn_networkName) {
                        continue;
                    }
                    if ($scope.networks_config[nn_networkName].enable == 0){
                        continue;
                    }
                    if (iserver[networkNameIP].ipaddr == iserver[nn_networkNameIP].ipaddr) {
                        $scope.setFailNoticeMsg("节点" + iserver.hostid + "不同的网络使用相同的IP");
                        return;
                    }
                }

                // 节点网络IP与其它节点配置不可以：IP相同或网段不一致
                for (var j = i + 1; j < serversLen; j++) {
                    var jserver = $scope.node4Add.servers[j];
                    if(jserver.selected != 1){
                        continue;
                    };
                    // 验证每个ipaddr/mask是否合法
                    // 每个节点内该网络IP地址不可冲突（IP相同或网段不一致），
                    var ret = $scope.check_ipaddr_netmask_samenet(iserver.hostid,
                                                                  iserver[networkNameIP].ipaddr,
                                                                  iserver[networkNameIP].netmask,
                                                                  jserver.hostid,
                                                                  jserver[networkNameIP].ipaddr,
                                                                  jserver[networkNameIP].netmask);
                    if (ret != true) {
                        return;
                    }

                    // 是否其它节点也使用了该IP
                    for (var nn = 0; nn < checkNetwork.length; nn++) {
                        var nn_networkName = checkNetwork[nn];
                        var nn_networkNameIP = nn_networkName + 'IP';
                        if ($scope.networks_config[nn_networkName].enable == 0){
                            continue;
                        }
                        if (iserver[networkNameIP].ipaddr == jserver[nn_networkNameIP].ipaddr) {
                            $scope.setFailNoticeMsg("节点" + iserver.hostid + "和节点" + jserver.hostid +"使用相同的IP");
                            return;
                        }
                    }
                }

                //检查与已有节点的IP设置是否冲突
                var existedServerLen = $scope.nodes.servers.length;
                for (var k = 0; k < existedServerLen; k++) {
                    var kserver = $scope.nodes.servers[k];
                    // 验证每个ipaddr/mask/gateway是否合法
                    // 每个节点内该网络IP地址不可冲突（IP相同或网段不一致）
                    if (networkName != 'bussiness' && $scope.networks_config[networkName].enable == 1){
                        var ret = $scope.check_ipaddr_netmask_samenet(iserver.hostid,
                                                                      iserver[networkNameIP].ipaddr,
                                                                      iserver[networkNameIP].netmask,
                                                                      kserver.hostid,
                                                                      kserver[networkNameIP].ipaddr,
                                                                      kserver[networkNameIP].netmask);
                        if (ret != true) {
                            return;
                        }
                    }

                    for (var nn = 0; nn < checkNetwork.length; nn++) {
                        var nn_networkName = checkNetwork[nn];
                        var nn_networkNameIP = nn_networkName + 'IP';
                        if ($scope.networks_config[nn_networkName].enable == 0){
                            continue;
                        }
                        if (iserver[networkNameIP].ipaddr == kserver[nn_networkNameIP].ipaddr) {
                            $scope.setFailNoticeMsg("节点" + iserver.hostid + "和节点" + kserver.hostid +"使用相同的IP");
                            return;
                        }
                    }
                }


				// 检查是否选择了网卡
				if ($scope.isConfigNetworkNics($scope.networks_config, 'om_bussiness')){
					if ($scope.checkNicSlected(iserver, $scope.networks_config['om_bussiness'], 'om_bussiness') != true) {
						return;
					}
				}

                // 该节点配置 与 OM网络冲突检查
                if (iserver[networkNameIP].ipaddr == $scope.nodes.cluster.omBussinessIpaddr) {
                    $scope.setFailNoticeMsg("节点" + iserver.hostid + "与管理系统使用相同的IP");
					return;
                }
                if (iserver[networkNameIP].ipaddr == $scope.nodes.cluster.omPublicIpaddr) {
                    $scope.setFailNoticeMsg("节点" + iserver.hostid + "与管理系统内部网络使用相同的IP");
					return;
                }
            }
        }

        // 检查磁盘是否选择正确
        $scope.ipArray = []
        $scope.selected_data_disk = false;
        var keepServersGoing = true;
        angular.forEach($scope.node4Add.servers, function(node){
            if (keepServersGoing){
                var keepDisksGoing = true;
                $scope.selected_data_disk = false;
                angular.forEach(node.disks, function(disk){
                    if (keepDisksGoing){
                        if (disk.purpose == 'osddisk' && disk.selected == 1){
                            $scope.selected_data_disk = true;
                            keepDisksGoing = false;
                        }
                    }
                });
                if (!$scope.selected_data_disk){
                    keepServersGoing = false;
                    $scope.setFailNoticeMsg("节点：" + node.hostid + "没有选择数据盘");
                    return;
                }
            }
        });
        if (!$scope.selected_data_disk){
            return;
        }

        // Check nic
        var checkNicError = false;
        if (checkNicError === true) {
            return;
        }

        //$scope.setSuccNoticeMsg('配置检查通过！');

        // 弹出提示，确认后执行创建提交
        $scope.showNodeExtendConfirm('commitAddingServers');
    };


	$scope.commitAddingServers = function(){
        //不允许扫描
        $scope.disableNodeAdd = true;
        //提交配置
        $scope.nodeAddingIpaddrArray = [];
        $scope.nodeAddProccessing = true;
        nodeFactory.nodeAdd($scope.node4Add, function (res) {
            if (res.success) {
                $scope.setSuccNoticeMsg('节点配置提交成功！');
                angular.forEach($scope.node4Add.servers, function (node) {
                    if (node.selected == 1) {
                        node.progress = 0;
                        $scope.nodeAddingIpaddrArray.push(node.clusterIP.ipaddr);
                    }
                });
                $scope.getScanedNodeProgress();
            } else {
                $scope.disabledScan = false;
                $scope.disableNodeAdd = false;
                $scope.nodeAddProccessing = false;
                if (res.data && $.inArray('server_list',res.data)==-1){
                    $scope.wwidEqualServer = res.data.server_list
                    $('#alertDiskWwidEqual').modal('show')
                }else{
                    $scope.setFailNoticeMsg('节点添加失败！Message: ' + res.message);
                }
            }
        });
	};

    $scope.setNormalFailNoticeMsg = function (msg) {
        $scope.ipaddrNetmaskConfictFlag = true;
        $scope.setFailNoticeMsg(msg);
    };

    $scope.check_ipaddr_netmask_diffnet = function (hostid1, ip1, mask1, hostid2, ip2, mask2) {
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) === false) {
            return false;
        }
        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));
        if (ip1_net == ip2_net) {
            $scope.setNormalFailNoticeMsg('IP地址在同一网段  ' + hostid1 + ': ' + ip1 + '/' + mask1 + '  ' + hostid2 + ': ' + ip2 + '/' + mask2);
            return false;
        }
        return true;
    };

    $scope.check_ipaddr_netmask1 = function (hostid1, ip1, mask1, hostid2, ip2, mask2) {
        if (!IP_REGEXP.test(ip1)) {
            $scope.setNormalFailNoticeMsg('IP地址不合法  ' + hostid1 + ': ' + ip1);
            return false;
        }
        if (!IP_REGEXP.test(ip2)) {
            $scope.setNormalFailNoticeMsg('IP地址不合法  ' + hostid2 + ': ' + ip2);
            return false;
        }
        if (ip1 == ip2) {
            $scope.setNormalFailNoticeMsg('IP冲突  ' + hostid1 + ': ' + ip1 + '/' + mask1 + '  ' + hostid2 + ': ' + ip2 + '/' + mask2);
            return false;
        }
        if (!IP_REGEXP.test(mask1)) {
            $scope.setNormalFailNoticeMsg('子网掩码不合法  ' + hostid1 + ': ' + ip1 + '/' + mask1);
            return false;
        }
        if (!IP_REGEXP.test(mask2)) {
            $scope.setNormalFailNoticeMsg('子网掩码不合法  ' + hostid2 + ': ' + ip2 + '/' + mask2);
            return false;
        }
        return true;
    };

    // 检查IP地址冲突，子网掩码，IP地址是否存在网段冲突
    $scope.check_ipaddr_netmask_samenet = function (hostid1, ip1, mask1, hostid2, ip2, mask2) {
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) === false) {
            return false;
        }
        if (mask1 != mask2) {
            $scope.setNormalFailNoticeMsg('子网掩码有误  ' + hostid1 + ': ' + ip1 + '/' + mask1 + '  ' + hostid2 + ': ' + ip2 + '/' + mask2);
            return false;
        }

        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));

        if (ip1_net != ip2_net) {
            $scope.setNormalFailNoticeMsg('IP地址不在同一网段  ' + hostid1 + ': ' + ip1 + '/' + mask1 + '  ' + hostid2 + ': ' + ip2 + '/' + mask2);
            return false;
        }
        return true;
    };

    /**
     * 选择编辑
     */
    $scope.selectCell = function (arr) {
        $scope.selectArr = arr;
    };

    /**
     * 选择
     */
    $scope.select = function (obj, type) {
        if (type) {
            if (obj.network === type) {
                obj.selected = obj.selected == 1 ? 0 : 1;
            } else {
                obj.network = type;
                obj.selected = 1;
            }
            return;
        }
        obj.selected = obj.selected == 1 ? 0 : 1;
    };

    $scope.selectRadio = function (obj, type) {
        angular.forEach($scope.selectArr, function (obj1) {
            if (obj1.network == type) {
                obj1.selected = 0;
            }
        });
        $scope.select(obj, type);
    };

    $scope.osSupportObj = '';
    $scope.osSupportShowObj = {};
    $scope.diskobj = '';
    // 检测硬盘操作
    $scope.checkDiskSize = function(obj, type, node){
        var cacheType = ["rwcache", "writecache", "readcache"]
        if($.inArray(type,cacheType)!= -1){
            for(var i=0; i<node.disks.length; i++){
                if (node.disks[i].purpose == type && node.disks[i].selected ==1 && node.disks[i].name != obj.name){
                    if (node.disks[i].capacity != obj.capacity){
                        $scope.showDiskSizeDiff("同一节点中不支持添加容量大小不一致的硬盘作为缓存盘!")
                        return false
                    }
                }
            }
        }
        return true
    }
    $scope.showDiskSizeDiff = function(msg){
        $('#alertDiskSize').modal('show')
        $scope.DiskSizeDiffInfo = msg
    }
    // 选择硬盘操作
    $scope.selectDisks = function (obj, type, node) {
        if (node.osSupport.min_version_support === 0 && type != 'osddisk' && type != 'writecache') {
            $scope.osSupportObj = obj;
            $scope.osSupportShowObj.wwid = obj.wwid;
            $scope.osSupportShowObj.hostid = node.hostid;
            $scope.osSupportShowObj.versionName = node.osSupport.kernel_version_name;
            $scope.osSupportShowObj.diskName = obj.name;
            $scope.osSupportShowObj.maxVersionSupport = node.osSupport.max_version_support;
            $scope.osSupportShowObj.kernelVersionSupportList = node.osSupport.kernel_version_support_list;
            $scope.osSupport_type = type
            $scope.osSupport_node = node

            $scope.diskobj = $('#' + $scope.wwid + type);
            if (obj.purpose === type) {
                if (obj.selected === 0) {
                    obj.selected = 1;
                    $scope.diskobj.attr('checked', 'checked');
                    $scope.showOsSupport();
                }
                else {
                    obj.selected = 0;
                }
            }
            else {
                obj.purpose = type;
                obj.selected = 0;
                $scope.showOsSupport();
            }
            return;
        }
        /**
        *  如果type(设置的磁盘类型)不为空，判断该磁盘原有类型是否等于type,如果是，则执行第一个分支
        */
        if (type) {
            if (obj.purpose === type) {
                /**
                * 如果磁盘原类型跟type相等，分为两种情况，一种是selectd=1，通过以下语句将置为0，此时取消选中，不需要检测大小;
                * 另一种是selectd=0，通过以下语句将置为1，此时选中，需检测大小，当大小不一致(if条件为true),将重新取消选中并将selectd置为0,返回。
                */
                obj.selected = obj.selected == 1 ? 0 : 1;
                if (obj.selected == 1){
                    if(!$scope.checkDiskSize(obj, type, node)){
                        var diskID = obj.wwid + type
                        document.getElementById(diskID).checked = false
                        obj.selected = 0
                        return
                    }
                }
            } else {
                var diskID = obj.wwid + type
                if(!$scope.checkDiskSize(obj, type, node))
                {
                    var diskID = obj.wwid + type
                    document.getElementById(diskID).checked = false
                    return
                }
                obj.purpose = type;
                obj.selected = 1;
            }
            return;
        }
        obj.selected = obj.selected == 1 ? 0 : 1;
    };

    /**
     * 扩容回滚
     * @param  {string} nodeName 当前节点名
     */
    $scope.showRollbackModal = function (nodeName) {
        $('#rollbackModal').modal('show');
        $scope.modalCtrl.param = {'hostid': nodeName};
        $scope.modalCtrl.sureTo = $scope.nodeRollbackFun;
    };
    $scope.nodeRollbackFun = function () {
        nodeFactory.nodeRollback($scope.modalCtrl.param, function (res) {
            if (res.success) {
                $scope.modalCtrl.param = {};
                $scope.setSuccNoticeMsg(res.data.message);
            }
        });
        $('#rollbackModal').modal('hide');
    };

    $scope.showOsSupport = function () {
        $('#osSupport').modal({backdrop: 'static', keyboard: false});
        $('#osSupport').modal('show');
    };

    $scope.osSupportCancel = function () {
        $scope.diskobj.removeAttr('checked', 'checked');
        $scope.osSupportObj.selected = 0;
    };

    $scope.osSupportClick = function () {
        $scope.osSupportObj.selected = 1;
        var diskID = $scope.osSupportShowObj.wwid + $scope.osSupport_type
        if(!$scope.checkDiskSize($scope.osSupportObj, $scope.osSupport_type, $scope.osSupport_node))
        {
            $scope.diskobj.removeAttr('checked', 'checked');
            $scope.osSupportObj.selected = 0;
        }
        $('#osSupport').modal('hide');
    };

}]);
