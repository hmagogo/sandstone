sdsomwebApp.controller("configController",["$rootScope", "$scope", "$compile", "$state", "configFactory",
    function($rootScope, $scope, $compile, $state,configFactory){
    "use strict";
    baseModal.call(this, $rootScope, $scope);

    //ip正则
    $scope.IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;
    var HOST_ID_NAME_REGEXP = /^[a-zA-Z][a-zA-Z]{0,11}$/

    $scope.now_show_log = ""
    //var ipTest = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

    /**
    * 请求创建进度展示
    */
    $scope.node_log_cache = {};
    $scope.show_log_init_flag = false;

    $scope.has_show_log_init = function (){
        if($scope.show_log_init_flag == false){
            angular.forEach($scope.nodeObj.physical_pool.servers, function(node){
                //can't use $scope.ipArray ,because $scope.ipArray is different between before create and start create
                $scope.node_log_cache[node.originalIp.ipaddr] = " ";
            });
            $scope.show_log_init_flag = true;
        }
        return true;
    }


    /*
    *  显示安装log
    */
    $scope.showInstallLog = function(hostip) {
        if($scope.has_show_log_init()){
            $scope.now_show_log = hostip;
            var index = 0;
            $scope.showInstallLogRecorder = "";
            if($scope.node_log_cache[hostip].length != 0){
                var record_list = $scope.node_log_cache[hostip].split('\n');
                var log_length = record_list[hostip];
                var i = 0;
                for(i=log_length-1;i>=0;i--){
                    $scope.showInstallLogRecorder += ("<br />" + record_list[i]);
                }
            }
            $("#LogShow").modal('show');
            var scroll_height = $("#LogRecorder").height();
            $("#LogRecorderDiv").scrollTop(scroll_height);
        }
    }

    $scope.getConfigureProgress = function() {
        if(0 == getObjectSize($scope.ipObjSave)){
            return;
        }else{
            angular.forEach($scope.ipObjSave, function(obj,index){
                configFactory.getProgress({"ipaddr": obj}, function(response){
                    if(response.success){
                        var progressObjTemp = response.data;
                        angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
                            if(node.originalIp.ipaddr == progressObjTemp.ipaddr ||
                                node.bussinessIP.ipaddr == progressObjTemp.ipaddr  ||
                                node.publicIP.ipaddr == progressObjTemp.ipaddr  ||
                                node.clusterIP.ipaddr == progressObjTemp.ipaddr){
                                var progress = parseInt(progressObjTemp.progress);
                                if(progress > 100) progress = 100;
                                node.progress = progress;

                                // add log cache
                                var biz_ip = response.data.ipaddr;
                                if($scope.has_show_log_init()){
                                    $scope.node_log_cache[biz_ip] = response.data.initialize_log;
                                }
                                //add node install log
                                if(biz_ip==$scope.now_show_log){
                                    var record_list = response.data.initialize_log.split('\n');
                                    var length = record_list.length;
                                    var i = 0;
                                    $scope.showInstallLogRecorder = "";
                                    for(i=length-1;i>=0;i--){
                                        $scope.showInstallLogRecorder += ("<br />" + record_list[i]);
                                    }
                                    var scroll_height = $("#LogRecorder").height() ;
                                    $("#LogRecorderDiv").scrollTop(scroll_height);
                                }

                            };
                        });
                        
                        if(progressObjTemp.progress == 100){
                            $scope.showInstallProccessing = false;
                            delete $scope.ipObjSave[index];
                        };
                    };
                });
            });
        };
    };

    $scope.getProgress = function() {
        if(0 == getObjectSize($scope.ipObjSave)){
            $scope.isComplete = false;
            $("#LogShow").modal('hide');
            $('#complete').modal('show');
            if($scope.progressId) clearTimeout($scope.progressId);
        } else {
            $scope.getConfigureProgress();
            if($scope.progressId) clearTimeout($scope.progressId);
            $scope.progressId = setTimeout(function(){
                $scope.getProgress();
            }, 3000);
        };
    };

    $scope.initPage = function (){
        $scope.appSelectValue = "0";
        $scope.seniorModeValue = 0;
        $scope.isScanning = true;
        $scope.isReadWriteCacheMix = false;
        $scope.showInstallProccessing = false;
        $scope.showAdvancedOption = false;
        $scope.tabIsShow = true;
        $scope.disablecreate = false;
        $scope.isShowNodeNum = false;
        $scope.isScanIp = true;
        $scope.ipObjSave = {};
        $scope.saveScanningIp = [];
        $scope.rackData = [];
    };
    $scope.closeProgress = function(){
        $('#complete').modal('hide');
        $scope.toLogin();
    };

    /**
    * 扫描网段
    */
    $scope.scanningIp = function () {
        var ipList = $scope.saveScanningIp;
        if(ipList.length == 0){
            $scope.setIpRangeErrorMsg("非法ip,请输入正确的ip地址");
            return;
        }

        //make sure the iprange is ok, so we can break when length = 1 and value = ""
        for(var i = 0; i < ipList.length; i++){
            if(!$scope.IP_REGEXP.test( ipList[i])){
                if(ipList.length == 0 && ipList[i] == ""){
                    break;
                }
                $scope.setIpRangeErrorMsg("非法ip,请输入正确的ip地址");
                return;
            }
        }
        //显示加载图标
        $scope.showLoading = true;
        $scope.isScanIp = true;
        $scope.configResourse();
        $scope.initWindow();
    };

    /**
    * 跳转到登录页面
    */
    $scope.toLogin = function () {
        $state.transitionTo("loginManager");
    };

    /**
    * 请求集群名称,外部访问IP地址,NTP Server
    */
    $scope.configResourse = function () {
        $scope.showTimeTips = true;
        $scope.progressRecord = 0;
        $scope.scanIPRangeDict = {
            "pool_name": "system",
            "ipRangeList":[],
            "ipList":[]
        };

        var ipList = $scope.saveScanningIp;
        for(var i = 0; i < ipList.length; i++){
            if(ipList[i] == ""){
                continue;
            }
            var obj = {
                "ip": ipList[i]
            }
            $scope.scanIPRangeDict["ipList"].push(obj);
        }

        configFactory.getSysNode($scope.scanIPRangeDict, function(response){
            $scope.showLoading = false;
            $scope.isScanIp = false;
            setTimeout($scope.fitWindowSize, 10);

            if(response.success){
                $scope.isConfig = true;
                $scope.isScanning = false;
                $scope.isShowNodeNum = true;
                $scope.nodeObj = response.data;
                $scope.num = 0;
                $scope.nodeObj.physical_pool.pool_name = "system";
                $scope.securityLevel = $scope.nodeObj.physical_pool.install_info.installer.security_level;
                $scope.securityLevelOptions = $scope.nodeObj.physical_pool.install_info.installer.security_level_options;

                angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
                    if(node.progress != -1){
                        $scope.progressRecord = $scope.progressRecord + 1;
                        $scope.disablecreate = true;
                        $scope.showTimeTips = false;
                    }
                    if(node.selected) {
                        node.$checked = true;
                        $scope.ipObjSave[$scope.num] = node.originalIp.ipaddr;
                        $scope.num++;
                    }
                    for (var i = 0; i < node.disks.length; i++) {
                        if (node.disks[i].selected == 1) {
                            node.disks[i].useType = 'disk';
                        }
                    }
                    //默认机架添加到机架列表中
                    var addServerRack2ListFlag = true;
                    for (var i=0; i<$scope.rackData.length; i++){
                        if (node.rackInfo.rackSerial == $scope.rackData[i]['name']){
                            addServerRack2ListFlag = false;
                            break;
                        }
                    };
                    if (addServerRack2ListFlag){
                        $scope.rackData.push({'name': node.rackInfo.rackSerial, 'ip': [node.originalIp.ipaddr], 'selected': 1});
                    }
                });
                if($scope.progressRecord > 0){
                    $scope.isComplete = true;
                    $scope.getProgress();
                };

                $scope.allIsChecked = false;

                if($scope.num == $scope.nodeObj.physical_pool.install_info.servers.length){
                    $scope.allIsChecked = true;
                };

                $scope.networks_config = $scope.nodeObj.cluster.networks_config;
                if ($scope.nodeObj.cluster.application.used_application == 'jzgk') {
                    $scope.appSelectValue = "1";
                    $scope.appSelect();
                } else if ($scope.nodeObj.cluster.application.used_application == 'openstack') {
                    $scope.appSelectValue = "2";
                    $scope.appSelect();
                } else if ($scope.nodeObj.cluster.application.used_application == 'object_storage') {
                    $scope.appSelectValue = "3";
                    $scope.appSelect();
                } else {
                    // common
                    $scope.appSelectValue = "0";
                    $scope.appSelect();
                }

                $scope.readWriteCacheMixChanged($scope.nodeObj.cluster.isReadWriteCacheMix);

                //add by hosfore
                if($scope.showTimeTips === true && $scope.nodeObj.physical_pool.install_info.servers.length != 0){
                    if($scope.nodeObj.physical_pool.install_info.timeinfo.skewedFlag == true){
                        $scope.setConfigMessage("节点时差超过10秒，请先同步节点时间！");
                        $scope.showTimeAlertDialog("扫描成功，但节点时差超过10秒，请点击确认，先同步节点时间！");
                        $scope.disablecreate = true;
                    }else{
                        $scope.showTimeAlertDialog("扫描成功，请确认服务器时间无误后再开始配置操作！");
                    };
                } else {
                    $scope.setFailNoticeMsg("存在已配置节点，请勿重复创建!");
                }

                setTimeout(function () {
                    var height = parseInt($('#configModal').height()) + 200;
                    $('.configure-background').css('height', height);
                    multSelect();
                }, 1000);
            }else{
                $scope.showDialog("扫描失败");
            };
        });
    };

    /**
    * 切换tab标签
    */
    $scope.refreshTimeInfo = function (showtip)
    {
        if (showtip){
            $scope.timeConfigNoticeMessage = "正在刷新节点时间信息，请稍后......";
            $("#timeConfigNoticeMessage").show();
        }

        var ipList = []
        angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function (node) {
            ipList.push(node.originalIp.ipaddr)
        })
        configFactory.getNodeListTime( {"nodeIpList":ipList}, function(response){
            if(response.success){
                $scope.freshTimeInfo = response.data;
                angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function (node) {
                    angular.forEach($scope.freshTimeInfo.timeInfoList, function (nodeTime) {
                        if (nodeTime.ipaddr == node.originalIp.ipaddr){
                            node.humanCheckTime = nodeTime.time;
                        };
                    });

                });

                if (showtip){
                    $scope.timeConfigNoticeMessage = "节点时间信息刷新完成！"
                }

            }else{
                if (showtip){
                    $scope.timeConfigNoticeMessage = "节点时间信息刷新失败！"
                }
            }
        }); //end configFactory
    }

    $scope.showTimeManagementBox = function () {
        $('#timeManagement').modal('show');
        $('#alertTimeDrift').modal('hide');
    }

    $scope.closeTimeManagementBox = function () {
        $('#timeManagement').modal('hide');
    }

    $scope.showSetNodeTime = function (server) {
        $scope.nodeToChangeTime = server;
        $scope.newSystemTime = server.humanCheckTime;
        $('#timeManagement').modal('hide');
        $('#nodeTimeSet').modal('show');
    }

    $scope.closeNodeTimeSet = function () {
        $('#nodeTimeSet').modal('hide');
        $('#timeManagement').modal('show');
    }

    $scope.updateNodeTime = function () {
        //TODO: check if time format is legal
        $scope.closeNodeTimeSet()
        $scope.timeConfigNoticeMessage = "正在更新节点(" + $scope.nodeToChangeTime.originalIp.ipaddr + ")时间，请稍后...";

        configFactory.setNodeTime({"nodeIp":$scope.nodeToChangeTime.originalIp.ipaddr, "newSystemTime":$scope.newSystemTime}, function(resp){
            $("#timeConfigNoticeMessage").show();
            if (resp.success) {
                $scope.timeConfigNoticeMessage = "节点" + $scope.nodeToChangeTime.originalIp.ipaddr + " 时间成功更新为   " + $scope.newSystemTime;
                $scope.refreshTimeInfo(false);
            } else {
                $scope.timeConfigNoticeMessage = "节点" + $scope.nodeToChangeTime.originalIp.ipaddr + "时间更新失败!";
            };
        });
    }

    $scope.syncServersTime = function () {
        $scope.closeConfirmSyncTimeDialog()
        var ipList = []
        angular.forEach($scope.nodeObj.physical_pool.servers, function (node) {
            ipList.push(node.originalIp.ipaddr)
        })

        $scope.timeConfigNoticeMessage = "正在通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "同步所有节点时间，请稍后...";
        configFactory.syncClusterNodeTime({"ntpServerIp":$scope.ntpserver.originalIp.ipaddr,
                                           "netmask":$scope.ntpserver.originalIp.netmask,
                                           "newSystemTime":$scope.newSystemTime,
                                           "nodeIpList":ipList},
                                           function(resp){
                if (resp.success) {
                    $scope.disablecreate = false;
                    $scope.configMessage = "";
                    $scope.timeConfigNoticeMessage = ("所有节点均已通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "完成时间同步！")
                    $scope.refreshTimeInfo(false);
                } else {
                    $scope.timeConfigNoticeMessage = ("通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "同步所有节点时间失败！");
                };
            });
    }

    $scope.showConfirmSyncTimeDialog = function (ntpserver)
    {
        $scope.ntpserver = ntpserver;
        $('#syncConfirmDialog').modal('show');
        $('#timeManagement').modal('hide');
    }

    $scope.closeConfirmSyncTimeDialog = function ()
    {
        $('#syncConfirmDialog').modal('hide');
        $('#timeManagement').modal('show');
    }

    $scope.showTimeAlertDialog = function (msg)
    {
        $('#alertTimeDrift').modal('show');
        $scope.DialogInfo = msg;
    }

    $scope.showDialog = function (msg)
    {
        $('#AlertInfo').modal('show');
        $scope.DialogInfo = msg;
    }

    $scope.showClusterTab = function () {
        $scope.tabIsShow = true;
    }

    $scope.showServiceTab = function () {
        $scope.tabIsShow = false;
        setTimeout(function () {
            $("#rightTDiv").width($("#TDiv").width() - 415);
            $("#rightTable").scrollLeft(0);
            $("#rightTable").scrollTop(0);
        }, 10);
    }
    /**
    * 双击节点列表展示详情
    */
    $scope.clickNum = 0;
    $scope.nodeDblClick = function (index) {
        if($scope.clickNum == 0 || $scope.detailIsShow != index){
            $scope.detailIsShow = index;
            $scope.clickNum ++;
        }else{
            $scope.clickNum = 0;
            $scope.detailIsShow = null;
        }
    };
    /**
    * 全选
    */
    $scope.checkAll = function () {
        $scope.allIsChecked = !$scope.allIsChecked;
        $scope.num = 0;
        angular.forEach($scope.nodeObj.physical_pool.servers, function (node) {
            node.$checked = $scope.allIsChecked;
            if(node.$checked){
                $scope.num++;
                node.selected = 1;
            }else{
                node.selected = 0;
            }
        })
    }

    /**
    * 单选
    */
    $scope.oneCheck = function (node) {
        node.$checked = !node.$checked;
        if(node.$checked){
            $scope.num++;
            node.selected = 1;
        }else{
            $scope.num--;
            node.selected = 0;
        }
        $scope.allIsChecked = ($scope.nodeObj.physical_pool.servers.length>0 && 
            ($scope.num == $scope.nodeObj.physical_pool.servers.length)) ? true:false;
    }


    $scope.initPage();

    $scope.changeSeletedNic = function(networkName, selected) {
        for(var i = 0; i < $scope.nodeObj.physical_pool.install_info.servers.length; i ++){
            for(var j = 0; j < $scope.nodeObj.physical_pool.install_info.servers[i].nics.length; j++){
                if($scope.nodeObj.physical_pool.install_info.servers[i].nics[j].network == networkName){
                    $scope.nodeObj.physical_pool.install_info.servers[i].nics[j].selected = selected;
                }
            }
        }
    };

    $scope.appSelect = function(){
        if($scope.appSelectValue == 1){
            $scope.netwokModeSelectValue = "4";
            $scope.jzgkIsSelected();
        } else if($scope.appSelectValue == 2){
            $scope.netwokModeSelectValue = "3";
            $scope.openStackIsSelected();
        } else if($scope.appSelectValue == 3){
            $scope.netwokModeSelectValue = "2";
            $scope.objectStorageIsSelected();
        } else { //($scope.appSelectValue == 0)
            $scope.netwokModeSelectValue = "1";
            $scope.onCommonStorageSelected();
        }
        // Enable network mode
        $scope.netwokModeSelect();
    }

    $scope.onCommonStorageSelected = function (){
        $scope.nodeObj.cluster.application.jzgk.selected = 0;
        $scope.nodeObj.cluster.application.openstack.selected = 0;
        $scope.nodeObj.cluster.diskReplaceMode = "manual";
        $scope.nodeObj.cluster.application.used_application = "common";
    }

    $scope.jzgkIsSelected = function () {
        $scope.nodeObj.cluster.application.openstack.selected = 0;
        $scope.nodeObj.cluster.application.jzgk.selected = 1;
        $scope.nodeObj.cluster.application.used_application = "jzgk";
        $scope.nodeObj.cluster.diskReplaceMode = "auto";
    }

    $scope.openStackIsSelected = function () {
        $scope.nodeObj.cluster.application.openstack.selected = 1;
        $scope.nodeObj.cluster.application.jzgk.selected = 0;
        $scope.nodeObj.cluster.application.used_application = "openstack";
        $scope.nodeObj.cluster.diskReplaceMode = "manual";
    }

    $scope.objectStorageIsSelected = function() {
        $scope.nodeObj.cluster.application.openstack.selected = 0;
        $scope.nodeObj.cluster.application.jzgk.selected = 0;
        $scope.nodeObj.cluster.application.used_application = "object_storage";
        $scope.nodeObj.cluster.diskReplaceMode = "manual";
    }

    $scope.netwokModeSelect = function() {
        // <option value="0">iSCSI网络使用独立网卡</option>
        // <option value="1">iSCSI网络与内部网络共用网卡</option>
        // <option value="2">存储服务网络使用独立网卡</option>
        // <option value="3">存储服务网络与内部网络共用网卡及IP地址</option>
        // <option value="4" ng-show="appSelectValue == 1">OM与iSCSI网络共用网卡</option>
        if($scope.netwokModeSelectValue == 0){
            $scope.changeNetworkM_B_C();
        } else if($scope.netwokModeSelectValue == 2){
            $scope.changeNetworkM_P_C();
        } else if($scope.netwokModeSelectValue == 3){
            $scope.changeNetworkM_PC();
        } else if($scope.netwokModeSelectValue == 4){
            $scope.changeNetworkMB_C();
        } else { //($scope.netwokModeSelectValue == 1)
            $scope.changeNetworkM_BC();
        }
    }

    $scope.changeNetworkM_B_C = function(){
        // bussiness
        $scope.networks_config.bussiness.enable = 1;
        $scope.networks_config.bussiness.using_independent_nics = 1;
        $scope.networks_config.bussiness.share_nics_from = '';
        $scope.changeSeletedNic('bussiness', 1);
        // public
        $scope.networks_config.public.enable = 0;
        $scope.changeSeletedNic('public', 0);
        // cluster
        $scope.networks_config.cluster.enable = 1;
        $scope.networks_config.cluster.using_independent_nics = 1;
        $scope.networks_config.cluster.share_nics_from = '';
        $scope.changeSeletedNic('cluster', 1);
        // om_bussiness
        $scope.networks_config.om_bussiness.enable = 1;
        $scope.networks_config.om_bussiness.using_independent_nics = 1;
        $scope.networks_config.om_bussiness.share_nics_from = 'bussiness';
        $scope.changeSeletedNic('om_bussiness', 1);
        // om_public
        $scope.networks_config.om_public.enable = 1;
        $scope.networks_config.om_public.using_independent_nics = 0;
        $scope.networks_config.om_public.share_nics_from = 'cluster';
        $scope.changeSeletedNic('om_public', 0);
        // om_cluster
        $scope.networks_config.om_cluster.enable = 0;
        $scope.changeSeletedNic('om_cluster', 0);
    }

    $scope.changeNetworkM_BC = function() {
        // bussiness
        $scope.networks_config.bussiness.enable = 1;
        $scope.networks_config.bussiness.using_independent_nics = 0;
        $scope.networks_config.bussiness.share_nics_from = 'cluster';
        $scope.changeSeletedNic('bussiness', 0);
        // public
        $scope.networks_config.public.enable = 0;
        $scope.changeSeletedNic('public', 0);
        // cluster
        $scope.networks_config.cluster.enable = 1;
        $scope.networks_config.cluster.using_independent_nics = 1;
        $scope.networks_config.cluster.share_nics_from = '';
        $scope.changeSeletedNic('cluster', 1);
        // om_bussiness
        $scope.networks_config.om_bussiness.enable = 1;
        $scope.networks_config.om_bussiness.using_independent_nics = 1;
        $scope.networks_config.om_bussiness.share_nics_from = '';
        $scope.changeSeletedNic('om_bussiness', 1);
        // om_public
        $scope.networks_config.om_public.enable = 1;
        $scope.networks_config.om_public.using_independent_nics = 0;
        $scope.networks_config.om_public.share_nics_from = 'cluster';
        $scope.changeSeletedNic('om_public', 0);
        // om_cluster
        $scope.networks_config.om_cluster.enable = 0;
        $scope.changeSeletedNic('om_cluster', 0);
    };

    $scope.changeNetworkMB_C = function() {
        // bussiness
        $scope.networks_config.bussiness.enable = 1;
        $scope.networks_config.bussiness.using_independent_nics = 1;
        $scope.networks_config.bussiness.share_nics_from = '';
        $scope.changeSeletedNic('bussiness', 1);
        // public
        $scope.networks_config.public.enable = 0;
        $scope.changeSeletedNic('public', 0);
        // cluster
        $scope.networks_config.cluster.enable = 1;
        $scope.networks_config.cluster.using_independent_nics = 1;
        $scope.networks_config.cluster.share_nics_from = '';
        $scope.changeSeletedNic('cluster', 1);
        // om_bussiness
        $scope.networks_config.om_bussiness.enable = 1;
        $scope.networks_config.om_bussiness.using_independent_nics = 0;
        $scope.networks_config.om_bussiness.share_nics_from = 'bussiness';
        $scope.changeSeletedNic('om_bussiness', 0);
        // om_public
        $scope.networks_config.om_public.enable = 1;
        $scope.networks_config.om_public.using_independent_nics = 0;
        $scope.networks_config.om_public.share_nics_from = 'cluster';
        $scope.changeSeletedNic('om_public', 0);
        // om_cluster
        $scope.networks_config.om_cluster.enable = 0;
        $scope.changeSeletedNic('om_cluster', 0);
    };

    $scope.changeNetworkM_P_C = function() {
        // bussiness
        $scope.networks_config.bussiness.enable = 0;
        $scope.changeSeletedNic('bussiness', 0);
        // public
        $scope.networks_config.public.enable = 1;
        $scope.networks_config.public.using_independent_nics = 1;
        $scope.networks_config.public.share_nics_from = '';
        $scope.changeSeletedNic('public', 1);
        // cluster
        $scope.networks_config.cluster.enable = 1;
        $scope.networks_config.cluster.using_independent_nics = 1;
        $scope.networks_config.cluster.share_nics_from = '';
        $scope.changeSeletedNic('cluster', 1);
        // om_bussiness
        $scope.networks_config.om_bussiness.enable = 1;
        $scope.networks_config.om_bussiness.using_independent_nics = 1;
        $scope.networks_config.om_bussiness.share_nics_from = 'cluster';
        $scope.changeSeletedNic('om_bussiness', 1);
        // om_public
        $scope.networks_config.om_public.enable = 1;
        $scope.networks_config.om_public.using_independent_nics = 0;
        $scope.networks_config.om_public.share_nics_from = 'public';
        $scope.changeSeletedNic('om_public', 0);
        // om_cluster
        $scope.networks_config.om_cluster.enable = 0;
        $scope.changeSeletedNic('om_cluster', 0);
    };


    $scope.changeNetworkM_PC = function(){
        // bussiness
        $scope.networks_config.bussiness.enable = 0;
        $scope.changeSeletedNic('bussiness', 0);
        // public
        $scope.networks_config.public.enable = 0;
        $scope.changeSeletedNic('public', 0);
        // cluster
        $scope.networks_config.cluster.enable = 1;
        $scope.networks_config.cluster.using_independent_nics = 1;
        $scope.networks_config.cluster.share_nics_from = '';
        $scope.changeSeletedNic('cluster', 1);
        // om_bussiness
        $scope.networks_config.om_bussiness.enable = 1;
        $scope.networks_config.om_bussiness.using_independent_nics = 1;
        $scope.networks_config.om_bussiness.share_nics_from = '';
        $scope.changeSeletedNic('om_bussiness', 1);
        // om_public
        $scope.networks_config.om_public.enable = 1;
        $scope.networks_config.om_public.using_independent_nics = 0;
        $scope.networks_config.om_public.share_nics_from = 'cluster';
        $scope.changeSeletedNic('om_public', 0);
        // om_cluster
        $scope.networks_config.om_cluster.enable = 0;
        $scope.changeSeletedNic('om_cluster', 0);
    }

    $scope.diskIsSelected = function (disk) {
        if(!disk.selected){
            disk.selected = 1;
        }else{
            disk.selected = 0;
        }
    }

    $scope.nicIsSelected = function (nic) {
        if(!nic.selected){
            nic.selected = 1;
        }else{
            nic.selected = 0;
        }
    }

    $scope.readWriteCacheMixChanged = function(mode) {
        if(mode == 1){
            $scope.nodeObj.cluster.isReadWriteCacheMix = 1;
            $scope.isReadWriteCacheMix = true;
            $("#configureTable").width($("#configureTable").width() - 260);
            for(var i = 0; i < $scope.nodeObj.physical_pool.install_info.servers.length; i ++){
                for(var j = 0; j < $scope.nodeObj.physical_pool.install_info.servers[i].disks.length; j++){
                    if ($scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose == "writecache" ||
                        $scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose == "readcache") {
                        $scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose = "rwcache";
                    }
                }
            }
        } else if(mode == 0){
            $scope.nodeObj.cluster.isReadWriteCacheMix = 0;
            $scope.isReadWriteCacheMix = false;
            $("#configureTable").width($("#configureTable").width() + 260);
            for(var i = 0; i < $scope.nodeObj.physical_pool.install_info.servers.length; i ++){
                var allc_cache = 0;
                for(var j = 0; j < $scope.nodeObj.physical_pool.install_info.servers[i].disks.length; j++){
                    if ($scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose == "rwcache") {
                        if (allc_cache % 2 == 0) {
                            $scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose = "writecache";
                        } else {
                            $scope.nodeObj.physical_pool.install_info.servers[i].disks[j].purpose = "readcache";
                        };

                        allc_cache += 1;
                    };
                };
            };
        };
    };

    $scope.setIpRangeErrorMsg = function (val) {
        $scope.errorMessageBox = val;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $("#errorMessageBox").show();
        $scope.succTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.succTime = null;
            $("#errorMessageBox").hide();
        }, 5000);
    };

    //add by hosfore 20160224
    $scope.setConfigMessage = function (val) {
        $scope.configMessage = val;
        $("#configMessage").show();
    };

    $scope.setSuccNoticeMsg = function (val) {
        $scope.configMessage = val;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $("#configMessage").show();
        $scope.succTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.succTime = null;
            $("#configMessage").hide();
        }, 8000);
    };

    $scope.setFailNoticeMsg = function (val) {
        $scope.configMessage = val;
        if ($scope.failTime) clearTimeout($scope.failTime);
        //$("#configMessage").style = 'color:red';
        $("#configMessage").show();
        $scope.failTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.failTime = null;
            $("#configMessage").hide();
        }, 8000);
    };

    var selectors = [".div-config input"]
    for (var i = 0; i < selectors.length; i++) {
        $(selectors[i]).each(function () {
            var _this = $(this);
            _this.popover({
                trigger: "manual",
                placement: "top",
                html: true,
                content: function () {
                    if (_this.data("tipMsg")) {
                        return "<div style='color:#000;'>" + _this.data("tipMsg") + "</div>";
                    }
                    return "";
                }
            });
        });
    };

    $scope.ip2int = function(ip){
        var num = 0;
        ip = ip.split(".");
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    }

    // 检查IP地址冲突，子网掩码，IP地址是否存在网段冲突
    $scope.check_ipaddr_netmask_samenet = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        // 检查IP是否相同以及IP/netmask的合法性
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) == false) {
            return false;
        };
        if (mask1 != mask2){
            $scope.showDialog("子网掩码有误  " +  hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        // 检查网段是否一致
        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));
        if (ip1_net != ip2_net){
            $scope.showDialog("IP地址不在同一网段  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };
    $scope.check_ipaddr_netmask_diffnet = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        // 检查IP是否相同以及IP/netmask的合法性
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) == false) {
            return false;
        };
        // 检查网段是否不一致
        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));
        if (ip1_net == ip2_net){
            $scope.showDialog("IP地址在同一网段  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };

    $scope.check_ipaddr_netmask1 = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        if (!$scope.IP_REGEXP.test(ip1)) {
            $scope.showDialog("IP地址不合法  " + hostid1 + ": " + ip1);
            return false;
        };
        if (!$scope.IP_REGEXP.test(ip2)) {
            $scope.showDialog("IP地址不合法  " + hostid2 + ": " + ip2);
            return false;
        };
        if (ip1 == ip2){
            $scope.showDialog("IP冲突  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        if (!$scope.IP_REGEXP.test(mask1)) {
            $scope.showDialog("子网掩码不合法  " + hostid1 + ": " + ip1 + "/" + mask1);
            return false;
        };
        if (!$scope.IP_REGEXP.test(mask2)) {
            $scope.showDialog("子网掩码不合法  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };

    // 检查是否选择了网卡
    $scope.checkNicSlected = function(server, networkConfig, notFirstCalling){
        var networkName = networkConfig.name;
        if (networkConfig.enable == 0) {
            if (notFirstCalling != true) {
                return true;
            } else {
                $scope.showDialog(getNetworkNameCN(networkName) + "未启用");
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
                $scope.showDialog("节点 " + server.hostid + "(" + server.originalIp.ipaddr + ") " +
                    getNetworkNameCN(networkName) + "未选择网卡");
            }
            return haveSelectNic;
        } else {
            var shareNicNetworkName = networkConfig.share_nics_from;
            return $scope.checkNicSlected(server, $scope.networks_config[shareNicNetworkName], true);
        }
    };

    /**
    * 创建
    */
    $scope.checkAndcreateCluster = function () {
        if (!HOST_ID_NAME_REGEXP.test($scope.nodeObj.cluster.nodeNamePrefix)){
            $scope.showDialog("高级选项->节点名称前缀，仅支持英文字母，长度为1-12");
            return;
        };
        // TODO: 检查网络配置是否有冲突，节点个数是否大于等于2
        $scope.nodeAddingCount = 0;
        angular.forEach( $scope.nodeObj.physical_pool.install_info.servers, function(node4AddServer,iindex){
            if(node4AddServer.selected != 1){
                return;
            };
            $scope.nodeAddingCount = $scope.nodeAddingCount + 1;
        });
        if ($scope.nodeAddingCount < 2){
            $scope.showDialog("请选择2个或以上的节点");
            return;
        };
        // 检查rack
        var serverLength = $scope.nodeObj.physical_pool.install_info.servers.length;
        var rackTempArray = [];
        for (var i = 0; i < serverLength; i++) {
            var server = $scope.nodeObj.physical_pool.install_info.servers;
            if (server[i].rackInfo.rackSerial == undefined || server[i].rackInfo.rackSerial == null || server[i].rackInfo.rackSerial == '') {
                $scope.showDialog("机柜不能为空！");
                return;
            }
            rackTempArray.push(server[i].rackInfo.rackSerial)
            
        }

        if ($scope.securityLevel == 'rack' && arrayIsRepeat(rackTempArray)) {
            $scope.showDialog("安全级别为 rack，机柜名称不能相同！");
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

            var serversLen = $scope.nodeObj.physical_pool.install_info.servers.length;
            for (var i =0; i < serversLen; i++) {
                var iserver = $scope.nodeObj.physical_pool.install_info.servers[i];
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
                        $scope.showDialog("节点" + iserver.hostid + "不同的网络使用相同的IP");
                        return;
                    }
                }

                // 节点网络IP与其它节点配置不可以：IP相同或网段不一致
                for (var j = i + 1; j < serversLen; j++) {
                    var jserver = $scope.nodeObj.physical_pool.install_info.servers[j];
                    if(jserver.selected != 1){
                        continue;
                    };
                    // 验证每个ipaddr/mask
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
                            $scope.showDialog("节点" + iserver.hostid + "和节点" + jserver.hostid +"使用相同的IP");
                            return;
                        }
                    }
                }

                // 该节点配置 与 OM网络冲突检查
                var checkOmNetwork = ['om_bussiness', 'om_public', 'om_cluster'];
                for (var m = 0; m < checkOmNetwork.length; m++) {
                    var omNetworkName = checkOmNetwork[m];
                    var omNetworkConfig = $scope.networks_config[omNetworkName];
                    if (omNetworkConfig.enable == 0) {
                        // 取消选择了该网络的网卡
                        $scope.changeSeletedNic(omNetworkName, 0);
                        continue;
                    } else {
                        // 检查是否选择了网卡
                        if ($scope.checkNicSlected(iserver, omNetworkConfig) != true) {
                            return;
                        }
                    };

                    // 检查IP是否有冲突
                    var ret = false;
                    var checkOmHostid = null;
                    var checkOmIpaddr = null;
                    var checkOmNetmask = null;
                    if (omNetworkName == 'om_bussiness'){
                        checkOmHostid = '管理系统网络';
                        checkOmIpaddr = $scope.nodeObj.cluster.omBussinessIpaddr;
                        if (omNetworkConfig.using_independent_nics == 0 &&
                            omNetworkConfig.share_nics_from == networkName){
                            checkOmNetmask = iserver[networkNameIP].netmask;
                            $scope.nodeObj.cluster.omBussinessNetmask = checkOmNetmask;
                        } else {
                            checkOmNetmask = $scope.nodeObj.cluster.omBussinessNetmask;
                        }
                    } else if (omNetworkName == 'om_public'){
                        checkOmHostid = '管理系统内部网络';
                        checkOmIpaddr = $scope.nodeObj.cluster.omPublicIpaddr;
                        checkOmNetmask = iserver[networkNameIP].netmask;
                        // Public network has no netmask
                    } else if (omNetworkName == 'om_cluster') {
                        $scope.showDialog("使用了未定义的管理系统网络：om_cluster");
                        return;
                    }
                    // OM 网络没有配置独立网卡，不允许 IP相同或网段不一致
                    // OM 网络配置独立网卡，不允许 IP相同或网段一样
                    if (omNetworkConfig.using_independent_nics == 0 &&
                        omNetworkConfig.share_nics_from == networkName) {
                        ret = $scope.check_ipaddr_netmask_samenet(iserver.hostid,
                            iserver[networkNameIP].ipaddr,
                            iserver[networkNameIP].netmask,
                            checkOmHostid,
                            checkOmIpaddr,
                            checkOmNetmask);
                        if (ret == false) {
                            return;
                        }
                    } else if (omNetworkConfig.using_independent_nics == 1) {
                        ret = $scope.check_ipaddr_netmask_diffnet(iserver.hostid,
                            iserver[networkNameIP].ipaddr,
                            iserver[networkNameIP].netmask,
                            checkOmHostid,
                            checkOmIpaddr,
                            checkOmNetmask);
                        if (ret == false) {
                            return;
                        };
                    }
                }
            }
        };
        // OM IP不可以相同
        if ($scope.nodeObj.cluster.omPublicIpaddr == $scope.nodeObj.cluster.omBussinessIpaddr) {
            $scope.showDialog("管理系统网络与内部网络不可使用相同的IP");
            return;
            
        }

        // 检查磁盘是否选择正确
        $scope.ipArray = []
        $scope.selected_data_disk = false;
        var keepServersGoing = true;
        angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
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
                    $scope.showDialog("节点：" + node.hostid + "没有选择数据盘");
                    return;
                }
            }
        });
        if (!$scope.selected_data_disk){
            return;
        }

        $scope.setSuccNoticeMsg("配置检查通过！");
        // 弹出提示，确认后执行创建提交
        $scope.showConfirm('commitCreatingCluster');
    };

    /**
    *  前提： 检查顺利通过
    *  提交创建
    */
    $scope.commitCreatingCluster = function () {
        $scope.setSuccNoticeMsg("提交后台执行创建集群！");
        $scope.disablecreate = true;
        configFactory.updateSysNode($scope.nodeObj, function(resp){
            if (resp.success) {
                $scope.isComplete = true;
                $scope.showInstallProccessing = true;
                $scope.setSuccNoticeMsg("配置提交成功！");
                angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
                    if(node.selected == 1){
                        node.progress = 0;
                        $scope.ipArray.push(node.clusterIP.ipaddr);
                    };
                });
                $scope.getProgress();
            } else {
                if (resp.data && foundInObject('equal_wwid', resp.data)){
                    $scope.wwidEqualServer = resp.data.server_list
                    $('#alertDiskWwidEqual').modal('show');
                }
                $scope.isComplete = false;
                $scope.disablecreate = false;
                $scope.showDialog("配置提交失败！Message: " + resp.message);
            };
        });
    };


    /**
    *  添加 IP 扫描范围
    */
    $scope.addIpRange = function () {
        var startIp        = $scope.startIp;
        var endIp          = $scope.endIp;
        var start_ip_check = verify(startIp);
        var end_ip_check   = verify(endIp);

        if (start_ip_check && !foundInArray(startIp, $scope.saveScanningIp)) {
            $scope.saveScanningIp.push(startIp);
        }

        if (start_ip_check && end_ip_check) {
            var beforeIP = startIp.substring( 0, startIp.lastIndexOf(".") + 1 );
            var start    = parseInt(startIp.substring( startIp.lastIndexOf(".") + 1 ));
            var end      = parseInt(endIp.substring( endIp.lastIndexOf(".") + 1 ));
            var between = 0, ipMaxNo = 0;
            if (start > end) {
                between = start - end;
                ipMaxNo = start;
            } else {
                between = end - start;
                ipMaxNo = end;
            }
            for (var i = 1; i < between; i++) {
                var ip = beforeIP + (ipMaxNo - i);
                if (!foundInArray(ip, $scope.saveScanningIp)) {
                    $scope.saveScanningIp.push(ip);
                }
            }
        }

        if (end_ip_check && !foundInArray(endIp, $scope.saveScanningIp)) {
            $scope.saveScanningIp.push(endIp);
        }

        $scope.saveScanningIp.sort(function (start, end) {
            var first  = start.substring( start.lastIndexOf(".") + 1 );
            var second = end.substring( end.lastIndexOf(".") + 1 );
            return parseInt(first) - parseInt(second);
        });
        $scope.isScanIp = false;
        $scope.startIp = "";
        $scope.endIp   = "";

        // 验证 IP 是否正确，并且不为 0.0.0.0，并且不为 255.255.255.255
        function verify(ip) {
            if (ip == null || ip == '') {
                return;
            }
            if (!$scope.IP_REGEXP.test(ip)) {
                $scope.setIpRangeErrorMsg("IP地址有误！");
                return false;
            }
            if (ZERO_IP_REGEXP.test(ip)) {
                $scope.setIpRangeErrorMsg("IP地址不能为 0.0.0.0");
                return false;
            }
            if (FULL_IP_REGEXP.test(ip)) {
                $scope.setIpRangeErrorMsg("IP地址不能为 255.255.255.255");
                return false;
            }
            return true;
        }
    };

    /**
    * 删除 IP节点范围
    */
    $scope.ipRemove = function (removeIP) {
        if (foundInArray(removeIP, $scope.saveScanningIp)) {
            arrayRemove($scope.saveScanningIp, removeIP)
        }
    }

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


    //os support model show
    $scope.showOsSupport = function () {
        $('#osSupport').modal({backdrop: 'static', keyboard: false});
        $('#osSupport').modal('show');
    };

    $scope.osSupportObj = "";
    $scope.osSupportShowObj = {};
    $scope.diskobj = "";
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
        if(node.osSupport.min_version_support == 0 && type != "osddisk" && type != "writecache"){
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
                if(obj.selected == 0){
                    obj.selected = 1;
                    $scope.diskobj.attr('checked','checked')
                    $scope.showOsSupport();
                } else {
                    obj.selected = 0;
                }
            } else{
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

    // 选择硬盘 单选操作
    $scope.selectDisksRadio = function (obj) {
        angular.forEach($scope.selectArr, function(obj1){
            obj1.selected = 0;
        });
        if (obj.useCapacity == undefined || obj.useCapacity == null) {
            obj.useType = 'disk';
        }
        if (obj.purpose !== 'osddisk') {
            obj.purpose = 'osddisk';
        }

        obj.selected = obj.selected == 1 ? 0 : 1;
    };

    // 选择硬盘使用方式
    $scope.selectDiskWay = function (useWay) {
        var currentDisks = $scope.selectArr;
        switch (useWay) {
            case 'disk':
                for (var i = 0; i < currentDisks.length; i++) {
                    if (currentDisks[i].selected == 1) {
                        currentDisks[i].useType = 'disk';
                    } else {
                        if (typeof currentDisks[i].useType !== "undefined") {
                            delete currentDisks[i].useType;
                        }
                    }
                }
                break;
            case 'partition':
                for (var i = 0; i < currentDisks.length; i++) {
                    if (currentDisks[i].selected == 1) {
                        currentDisks[i].useType = 'partition';
                    } else {
                        if (typeof currentDisks[i].useType !== "undefined") {
                            delete currentDisks[i].useType;
                        }
                        if (typeof currentDisks[i].useCapacity !== "undefined") {
                            delete currentDisks[i].useCapacity;
                        }
                    }
                }
                break;
        }
    };

    // 分配分区容量
    $scope.assignmentPartition = function (event) {
        var partitionByte = parseInt(event.currentTarget.value) * 1073741824;
        var currentDisks = $scope.selectArr;
        for (var i = 0; i < currentDisks.length; i++) {
            if (currentDisks[i].selected == 1 && currentDisks[i].useType == 'partition') {
                currentDisks[i].useCapacity = partitionByte;
            }
        }
    };

    $scope.osSupportClick = function (){
        $scope.osSupportObj.selected = 1;
        var diskID = $scope.osSupportShowObj.wwid + $scope.osSupport_type
        if(!$scope.checkDiskSize($scope.osSupportObj, $scope.osSupport_type, $scope.osSupport_node)) {
            $scope.diskobj.removeAttr('checked', 'checked');
            $scope.osSupportObj.selected = 0;
        }
        $('#osSupport').modal('hide');
    };

    $scope.osSupportCancel = function (){
        $scope.diskobj.removeAttr('checked','checked')
        $scope.osSupportObj.selected = 0;
    };

    $scope.selectRadio = function (obj, type) {
        angular.forEach($scope.selectArr, function(obj1){
            if (obj1.network == type) {
                obj1.selected = 0;
            };
        });
        $scope.select(obj, type);
    };

    $scope.selectBond = function (obj) {
        obj.network = "cluster";
        obj.selected = obj.selected == 1 ? 0 : 1;
        return;
    };

    /**
    *     动态固定
    */
    $scope.regDropdown = function () {
        //将下拉框固定
        $(".dropdown-menu").click(function (event) {
            event.stopPropagation();
        });
    };

    $scope.showCreateRack = function () {
        $('#createRackModal').modal('show');
    }

    $scope.showManageRack = function () {
        $('#manageRackModal').modal('show');
        $scope.manageRackStore = {};
        $scope.$watch("manageRackStore.name", function (obj) {
            if (obj == undefined) {
                $scope.manageRackStore.name = [];
            }
        });
    }

    /** 创建 Rack **/
    $scope.createRack = function () {
        var ipStore = [];
        var $li = $('#msContainer').children('.ms-selection').find('li');
        for (var i = 0; i < $li.length; i++) {
            var ip = getDivText(angular.element($li[i])[0]);
            ipStore.push(ip);
        }

        var rackName = $scope.rackName;
        if (rackName == null || rackName == '') {
            createRackErrorFun('rack 名称不能为空！');
            return;
        }
        if (ipStore.length == 0) {
            createRackErrorFun('已选节点不能为空！');
            return;
        }
        if ($scope.rackData.length !== 0) {
            for (var i = 0; i < $scope.rackData.length; i++) {
                if($scope.rackData[i].name === rackName){
                    createRackErrorFun(key + '名称已存在');
                    return;
                }
            }
        }

        angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
            for (var i = 0; i < ipStore.length; i++) {
                if (ipStore[i] === node.originalIp.ipaddr) {
                    node.rack = rackName;
                }
            }
        });
        
        var rackObj = new Object();
        rackObj.name = rackName;
        rackObj.ip = ipStore;
        $scope.rackData.push(rackObj);
        $scope.rackName = '';
        $('#createRackModal').modal('hide');
        clearSelection();
    }

    $scope.createSingleRack = function(ip) {
        var oid = ip.slice(ip.lastIndexOf('.') + 1);
        var hostidRack = $('#' + oid + 'Rack');

        if ($scope.rackData.length !== 0) {
            for (var i = 0; i < $scope.rackData.length; i++) {
                $scope.rackData[i].selected = 0;
                if($scope.rackData[i].name === hostidRack.val()){
                    createRackErrorFun(hostidRack.val() + '名称已存在');
                    return;
                }
            }
        }

        angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
            if (node.originalIp.ipaddr === ip) {
                node.rackInfo.rackSerial = hostidRack.val();
                $scope.rackData.push({'name': hostidRack.val(), 'ip': [node.originalIp.ipaddr], 'selected': 1});
                hostidRack.val('');
            }
        });
    };

    function createRackErrorFun(message) {
        $scope.createRackError = message;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $scope.succTime = setTimeout(function () {
            $scope.createRackError = "";
            $scope.succTime = null;
            $("[name='createRackError']").hide();
        }, 3000);
    };

    /**
     * 管理 Rack
     * @return {[type]} [description]
     */
    $scope.manageRack = function () {
        if ($scope.manageRackStore.name.length == 0 || $scope.manageRackStore.name == '') {
            return;
        }
        if ($scope.manageRackStore.updateName == undefined || $scope.manageRackStore.updateName == '') {
            return;
        }
        var updateName = $scope.manageRackStore.updateName;
        var rack = $scope.manageRackStore.name;

        rack.name = updateName;
        $scope.manageRackStore.updateName = "";
        $('#manageRackModal').modal('hide');
    };

    $scope.selectRackCell = function (arr) {
        if (arr.rackInfo.rackSerial !== undefined) {
            angular.forEach($scope.rackData, function(r){
                if (r.name === arr.rackInfo.rackSerial) {
                    r.selected = 1;
                } else {
                    r.selected = 0;
                }
            });
        } else {
            angular.forEach($scope.rackData, function(rack){
                rack.selected = 0;
            });
        }
        $scope.selectArr = arr;
    };

    /** 选择 Rack */
    $scope.selectRack = function (obj) {
        angular.forEach($scope.rackData, function(rack){
            rack.selected = 0;
        });
        obj.selected = obj.selected == 1 ? 0 : 1;
        $scope.selectArr.rackInfo.rackSerial = obj.name;
    }

/************************************* 窗口大小变化 *************************************/
    $scope.initWindow = function () {
        window.onresize = function () {
            // $scope.fitWindowSize();
        };
        // $scope.fitWindowSize();
        $('.configure-background').css('height', $(window).height());

        $("#rightTable").scroll(function () {
            $("#leftTable").scrollTop($("#rightTable").scrollTop());
            $("#rightHead").scrollLeft($("#rightTable").scrollLeft());
        });
    };

    $scope.fitWindowSize = function () {
        //让背景自适应屏幕大小
        // $("#configContainer").height($(window).height());
        // $("#configContainer").width($(window).width());
        // $("#rightTDiv").width($("#TDiv").width() - 415);
    };

    $scope.initWindow();

/************************************************************************************/

    //弹出框控制器
    $scope.modal = {
        message: "", //弹出框标题信息
        to: "", //当前要去做的业务
        sureTo: "", //确定时调用的方法
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

    /**
    * 显示弹出框
    */
    $scope.showModal = function (to, obj) {
        //$scope.setStorageErrMsg("");
        switch (to) {
        case "advancedOption":
            $scope.modal.message = " 高级选项";
            $scope.modal.to = to;
            return;
        }
    };

    $scope.advancedOptionClickTimes = 0;
    $scope.showFeatureSelected = function () {
        $scope.advancedOptionClickTimes ++;
        if($scope.advancedOptionClickTimes == 2){
            if($scope.showAdvancedOption == true){
                $scope.showAdvancedOption = false;
            }else{
                $scope.showAdvancedOption = true;
            }
            $scope.advancedOptionClickTimes = 0;
        }
        $scope.clickATimout = setTimeout(function () {
            $scope.advancedOptionClickTimes = 0;
        }, 400);
    };

    function multSelect() {
        var el = angular.element(document.getElementById('msContainer'));

        el.children('.ms-selectable').find('li').on('click', function (e) {
            // 向 .ms-selection ul li 追加元素
            var selection_ul = el.children('.ms-selection').find('ul'),
                _this = angular.element(this);
            selection_ul.append(_this.clone());
            _this.addClass('ms-selected');
        });

        el.children('.ms-selection').find('ul').on('mouseenter', function () {
            var _this = $(this);
            if (_this.find('li').length > 0) {
                _this.find('li').one('click', function () {
                    $(this).remove();
                    var n = $(this).attr('ms-value');
                    el.children('.ms-selectable').find('[ms-value="'+n+'"]').removeClass('ms-selected');
                });
            }
        });
    }
    /**
     * 清除选择
     * @return {[type]} [description]
     */
    function clearSelection() {
        var el = angular.element(document.getElementById('msContainer'));
        el.children('.ms-selectable').find('li').removeClass('ms-selected');
        el.children('.ms-selection').find('li').remove();
    }

}]);
