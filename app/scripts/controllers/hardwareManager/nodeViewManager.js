/**
 * Created by huangminxuan on 2016/4/21.
 */
sdsomwebApp.controller('nodeViewManager', ['$rootScope', '$scope', '$timeout', 'nodeFactory', 'mainFactory',
    function ($rootScope, $scope, $timeout, nodeFactory, mainFactory) {
    'use strict';

    baseModal.call(this, $rootScope, $scope);

    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;

    //弹出框控制器
    $scope.modal = {
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

    /**
     * 初始化页面视图
     */
    $scope.initView = function () {
        $scope.gMainStateRouteView.current = 'main.container.hardware_view';
		$scope.networks_config = null;
        // 初始化信息提示
        $scope.showView = 'clusterView';
        $scope.nodeDropdown = true;
        $scope.setNodeInfoHeight();

        // 设置定时开关
        $scope.stopTimerTicker = false;
        function cancelTimer(){$scope.stopTimerTicker = true;}
        $rootScope.$on('$stateChangeStart', cancelTimer);
        
        // 初始化节点信息
        $scope.freshHardwareNodesDetail();
        
        
    };

    /**
     * 初始化节点
     */
    $scope.freshHardwareNodesDetail = function () {
        //获取前后视图信息
        nodeFactory.getSysHardView(function (response) {
            if (response.success) {
                $scope.hardwareNodesDetail = response.data;
                $scope.hardwareNodesDetail.status.sort(byParam('nodeName', 'str'));
                $scope.nodeState = 'ok';
                var index = 0;
                for (var i = 0; i < $scope.hardwareNodesDetail.status.length; i++) {
                    $scope.hardwareNodesDetail.status[i].disks.sort(byParam('wwid', 'str'));
                    $scope.hardwareNodesDetail.status[i].nics.sort(byParam('name', 'str'));

                    // 磁盘、网卡  --告警
                    $scope.hardwareNodesDetail.status[i].diskAlarm = false;
                    $scope.hardwareNodesDetail.status[i].nicsAlarm = false;

                    angular.forEach($scope.hardwareNodesDetail.status[i].disks, function (disk) {
                        if (disk.status === 'warn' || disk.status === 'down') {
                            $scope.hardwareNodesDetail.status[i].diskAlarm = true;
                        }
                    });
                    angular.forEach($scope.hardwareNodesDetail.status[i].nics, function (nic) {
                        if (nic.status === 'down') {
                            $scope.hardwareNodesDetail.status[i].nicsAlarm = true;
                        }
                    });

                    if ($scope.hardwareNodesDetail.status[i].nodeStatus === 'warn' && $scope.nodeState !== 'down') {
                        $scope.nodeState = 'warn';
                    }
                    if ($scope.hardwareNodesDetail.status[i].nodeStatus === 'down') {
                        $scope.nodeState = 'down';
                    }
                    if ($scope.nodeState !== 'warn' && $scope.nodeState !== 'down' && $scope.hardwareNodesDetail.status[i].nodeStatus === 'ok') {
                        $scope.nodeState = 'ok';
                    }
					$scope.networks_config = $scope.hardwareNodesDetail.networks_config;

					if (!$scope.selectedNodeDetail) {
						$scope.selectedNodeDetail = $scope.hardwareNodesDetail.status[0];
					} else if ($scope.selectedNodeDetail.nodeName == $scope.hardwareNodesDetail.status[i].nodeName) {
						$scope.selectedNodeDetail = $scope.hardwareNodesDetail.status[i];
					}

                    if ($scope.hardwareNodesDetail.status[i].nodeStatus === 'is_expanding' ||
                        $scope.hardwareNodesDetail.status[i].nodeStatus === 'is_rollbacking') {
                        $scope.initNodeCapacity($scope.hardwareNodesDetail.status[i]);
                    }
                }

                $scope.selectNodeOfNodeInfoView(undefined, $scope.selectedNodeDetail);
            }
            if($scope.stopTimerTicker === false){
                setTimeout(function(){$scope.freshHardwareNodesDetail()}, 30000);
            }
        });
    };

    /**
     * 显示视图
     */
    $scope.exhibition = function (event, view) {
        var current = event.currentTarget;
        $(current).siblings().removeClass("active");
        $(current).addClass("active");
        $scope.showView = view;
    };

    $scope.showNodeView = function() {
        $scope.showView = 'nodeView';
    };

    $scope.showIpView = function() {
        $scope.showView = 'ipView';
    };

    $scope.selectedNodeDom = null;

    $scope.showNodeDropdown = function () {
        $scope.breviaryHeight = "100%";
        $scope.nodeInfoHeight = "0%";
        $scope.nodeUp = true;
        $scope.nodeDropdown = false;
    };

    $scope.showNodeUp = function () {
        $scope.breviaryHeight = "17.8999%";
        $scope.nodeInfoHeight = "78.8999%";
        $scope.nodeUp         = false;
        $scope.nodeDropdown   = true;
    };

    /**
     * 选中NODE节点改变节点的样式
     * @ new-version
     */
    $scope.selectNodeOfClusterNodeView = function (nodeDetail) {
        if (nodeDetail.nodeStatus == 'is_expanding' || nodeDetail.nodeStatus == 'is_rollbacking') {
            return;
        }

        $('#nodeInfo').siblings().removeClass("active");
        $('#nodeInfo').addClass("active");
        $scope.showView = 'nodeView';

        if ($scope.selectedNodeDom === null) {
            $scope.selectedNodeDom = document.getElementById(nodeDetail.nodeName);
            $($scope.selectedNodeDom).siblings().children('.smNodeSelect').addClass('node-thumbnail2');
            $($scope.selectedNodeDom).siblings().children('.smNodeSelect').removeClass('smNodeSelect');
            $($scope.selectedNodeDom).children('.pt5').addClass('smNodeSelect');
        } else {
            $($scope.selectedNodeDom).children('.pt5').addClass('node-thumbnail2');
            $($scope.selectedNodeDom).children('.pt5').removeClass('smNodeSelect');
            $scope.selectedNodeDom = document.getElementById(nodeDetail.nodeName);
            $($scope.selectedNodeDom).children('.pt5').addClass('smNodeSelect');
        }
        $scope.selectedNodeDetail = nodeDetail;
        $scope.showNodeInfoView();
    };

    /**
     * 选中缩略图 NODE节点改变节点的样式
     * @ new-version
     */
    $scope.selectNodeOfNodeInfoView = function (event, nodeDetail) {
        if (nodeDetail.nodeStatus == 'is_expanding' || nodeDetail.nodeStatus == 'is_rollbacking') {
            return;
        }

        if (event !== undefined) {
            if ($scope.selectedNodeDom === null) {
                $scope.selectedNodeDom = event.currentTarget;
                $($scope.selectedNodeDom).siblings().children('.smNodeSelect').addClass('node-thumbnail2');
                $($scope.selectedNodeDom).siblings().children('.smNodeSelect').removeClass('smNodeSelect');
                $($scope.selectedNodeDom).children('.pt5').addClass('smNodeSelect');
            } else {
                $($scope.selectedNodeDom).children('.pt5').addClass('node-thumbnail2');
                $($scope.selectedNodeDom).children('.pt5').removeClass('smNodeSelect');
                $scope.selectedNodeDom = event.currentTarget;
                $($scope.selectedNodeDom).children('.pt5').addClass('smNodeSelect');
            }
        }

        if ($scope.nodeUp) {
            $scope.showNodeUp();
        }
		$scope.selectedNodeDetail = nodeDetail;
		$scope.showNodeInfoView();
    };


	$scope.showNodeInfoView = function(){
		$scope.showDisks();
		$scope.showNics();

		$scope.showNodeCpuMemChart();
		$scope.showDiskUtilChart();
		$scope.showNicTxRxChart();
	};

    $scope.nodeStatus = {};

    $scope.selectedDiskDetail = {};

    $scope.selectDisk = function (disk) {
        $scope.selectedDiskDetail = disk;
		var disks = $scope.selectedNodeDetail.disks;
		for (var i = 0; i < disks.length; i++) {
			var obj = document.getElementsByName("disksDomName" + disks[i].device_name)
			$(obj).removeClass('node-selected');
		}
		var obj = document.getElementsByName("disksDomName" + $scope.selectedDiskDetail.device_name)
		$(obj).addClass('node-selected');

		$scope.showDiskUtilChart();
    };

    /**
     * 获取单个网卡的信息
     */
    $scope.selectNic = function (nic) {
		$scope.selectedNicDetail = nic;

		var nics = $scope.selectedNodeDetail.nics;
		for (var i = 0; i < nics.length; i++) {
			var obj = document.getElementsByName("nicsDomName" + nics[i].name)
			$(obj).removeClass('node-selected');
		}
		var obj = document.getElementsByName("nicsDomName" + $scope.selectedNicDetail.name)
		$(obj).addClass('node-selected');

		$scope.freshNicDropPackage();
		$scope.showNicTxRxChart();
    };

    $scope.showDisks = function () {
		var disks = $scope.selectedNodeDetail.disks;
        $scope.nodeDisks = disks;
        $scope.diskStr= [];
        $scope.diskNum = 0;
        $scope.disksModel = {
            'dataDisk': false,
            'readDisk': false,
            'writeDisk': false,
            'cacheDisk': false
        };
		var hasSelectDisk = false;
        for (var i = 0; i < disks.length; i++) {
            if (disks[i].function == 'data') {
                $scope.disksModel.dataDisk = true;
            } else if (disks[i].function == 'read_cache') {
                $scope.disksModel.readDisk = true;
            } else if (disks[i].function == 'write_cache') {
                $scope.disksModel.writeDisk = true;
            } else if (disks[i].function == 'read_write_cache') {
                $scope.disksModel.cacheDisk = true;
            }

			if (!$scope.selectedDiskDetail) {
				$scope.selectedDiskDetail = disks[i];
				hasSelectDisk = true;
			} else if ($scope.selectedDiskDetail.device_name == disks[i].device_name) {
				$scope.selectedDiskDetail = disks[i];
				hasSelectDisk = true;
			}
        }

		if (hasSelectDisk == false) {
			$scope.selectedDiskDetail = disks[0];
		}

        if ($scope.disksModel.dataDisk) {
            $scope.diskNum = $scope.diskNum + 1;
            $scope.diskStr.push('data');
        }
        if ($scope.disksModel.readDisk) {
            $scope.diskNum = $scope.diskNum + 1;
            $scope.diskStr.push('read_cache');
        }
        if ($scope.disksModel.writeDisk) {
            $scope.diskNum = $scope.diskNum + 1;
            $scope.diskStr.push('write_cache');
        }
        if ($scope.disksModel.cacheDisk) {
            $scope.diskNum = $scope.diskNum + 1;
            $scope.diskStr.push('read_write_cache');
        }

		$scope.selectDisk($scope.selectedDiskDetail);
    };

    $scope.showNics = function () {
        var bussinessIndex = 0;
	    var clusterIndex = 0;
	    var bizclusterIndex = 0;
		var hasSelectNic = false;
        angular.forEach($scope.selectedNodeDetail.nics, function (obj) {
			if ($scope.selectedNicDetail && $scope.selectedNicDetail.name == obj.name) {
				$scope.selectedNicDetail = obj;
				hasSelectNic = true;
			}
        });
		angular.forEach($scope.selectedNodeDetail.bonds, function (obj) {
			if ($scope.selectedNicDetail && $scope.selectedNicDetail.name == obj.name) {
				$scope.selectedNicDetail = obj;
				hasSelectNic = true;
			}
        });
		if (hasSelectNic == false) {
			if ($scope.selectedNodeDetail.bonds.length > 0){
				$scope.selectedNicDetail = $scope.selectedNodeDetail.bonds[0];
			} else {
				$scope.selectedNicDetail = $scope.selectedNodeDetail.nics[0];
			};
		}
        $scope.selectNic($scope.selectedNicDetail);
    };

    $scope.getServerBizIpList = function (modalId) {
        nodeFactory.omNetBussGet(function (res) {
            if (res.success) {
                $scope.omBizIp = {
                    bussinessNetwork: res.data.bussinessNetwork,
                    publicNetwork: res.data.publicNetwork
                };
            } else {
				$(modalId).modal('hide');
                $scope.showDialog(res.message);
            }
        });
    };

    $scope.modifyNodeBussinessIp = function () {
        $scope.nodeDetailOfModifingBizIp = $scope.selectedNodeDetail;
		$scope.getServerBizIpList('#modifyBizIpModalId');
        $('#modifyBizIpModalId').modal('show');
    };

    $scope.showManageSysIp = function(){
		$scope.getServerBizIpList('#modifyOmBizIpModalId');
        $('#modifyOmBizIpModalId').modal('show');
    };

    $scope.showEdit = function (server) {
        server.$edit = true;
        server.edit = angular.copy(server.bussinessNetwork);
    };

    $scope.hideEdit = function (server) {
        server.$edit = false;
    };

    $scope.saveEdit = function (server) {
        if (!IP_REGEXP.test(server.edit.ipaddr)) {
            $scope.setFailNoticeMsg('IP不合法!');
            return;
        };
        if (!IP_REGEXP.test(server.edit.netmask)) {
            $scope.setFailNoticeMsg('子网掩码不合法!');
            return;
        };
		var gateway = server.edit.gateway;

        if (server.nodeName) {
			// 修改节点业务IP
			// 节点所有IP都未使用该IP；不需要检查是否属于同一网段
			var servers = $scope.hardwareNodesDetail.status;
			var editServerConfig = null;
			for (var i = 0; i < servers.length; i++) {
				var iserver = servers[i];
				if (server.nodeName == iserver.nodeName) {
					editServerConfig = iserver;
					if (server.edit.ipaddr == iserver.bussinessNetwork.ipaddr &&
					    server.edit.netmask == iserver.bussinessNetwork.netmask) {
						if ($scope.isConfigNetworkGateway($scope.networks_config, 'bussiness')){
							if (server.edit.netmask == iserver.bussinessNetwork.gateway){
								$scope.setFailNoticeMsg("与原IP相同，不需修改");
								return;
							}
						} else {
							$scope.setFailNoticeMsg("与原IP相同，不需修改");
							return;
						}
					}
					if (server.edit.ipaddr == iserver.clusterNetwork.ipaddr){
						$scope.setFailNoticeMsg("该IP被" + iserver.nodeName + "使用，请尝试使用其它IP");
						return;
					}
					continue;
				}
				if (server.edit.ipaddr == iserver.bussinessNetwork.ipaddr ||
					server.edit.ipaddr == iserver.clusterNetwork.ipaddr){
					$scope.setFailNoticeMsg("该IP被" + iserver.nodeName + "使用，请尝试使用其它IP");
					return;
				};
			};

            // OM也未使用该IP
            if (server.edit.ipaddr == $scope.omBizIp.bussinessNetwork.ipaddr ||
				server.edit.ipaddr == $scope.omBizIp.publicNetwork.ipaddr){
                $scope.setFailNoticeMsg('该IP被管理系统使用，请尝试使用其它IP');
                return;
            }

			// 检查网关IP设置是否正常
			// 不需要检查是否配置 isConfigNetworkGateway('bussiness')
			if ($scope.isConfigNetworkGateway($scope.networks_config, 'bussiness') || true){
				if (!IP_REGEXP.test(gateway)) {
					$scope.setFailNoticeMsg('默认网关IP不合法!');
					return;
				};
				if (!(ZERO_IP_REGEXP.test(gateway) || FULL_IP_REGEXP.test(gateway))) {
					var ip1_net = ($scope.ip2int(gateway) & $scope.ip2int(server.edit.netmask));
					var ip2_net = ($scope.ip2int(server.edit.ipaddr) & $scope.ip2int(server.edit.netmask));
					if (ip1_net != ip2_net){
						$scope.setFailNoticeMsg("IP地址和默认网关不在同一网段  " + server.nodeName + ": " + server.edit.ipaddr + "/" + server.edit.netmask + "  " + gateway + "/" + server.edit.netmask);
						return;
					};
				};
			}

			// 提交修改
            $scope.setWaitNoticeMsg('正在修改，请稍后');
            nodeFactory.netBussUpdate({
                hostid: server.nodeName,
                bussinessNetwork: {
                    ipaddr: server.edit.ipaddr,
                    netmask: server.edit.netmask,
                    gateway: server.edit.gateway
                }
            }, function (res) {
                if (res.success) {
                    $scope.setSuccNoticeMsg('修改成功！');
                    $('#modifyBizIpModalId').modal('hide');
					// 更新显示
					if (editServerConfig) {
						editServerConfig.bussinessNetwork.ipaddr = server.edit.ipaddr;
						editServerConfig.bussinessNetwork.netmask = server.edit.netmask;
						editServerConfig.bussinessNetwork.gateway = server.edit.gateway;
					}
                    server.bussinessNetwork.ipaddr = server.edit.ipaddr;
                    server.bussinessNetwork.netmask = server.edit.netmask;
                    server.bussinessNetwork.gateway = server.edit.gateway;
                    server.$edit = false;
                } else {
                    $scope.setFailNoticeMsg(res.message);
                }
            });
		} else {
			// 修改OM 业务IP

            // 检查与原IP是否相同
            if (server.edit.ipaddr == $scope.omBizIp.bussinessNetwork.ipaddr &&
				server.edit.netmask == $scope.omBizIp.bussinessNetwork.netmask ){
				if ($scope.isConfigNetworkGateway($scope.networks_config, 'om_bussiness')){
					if (server.edit.gateway == $scope.omBizIp.bussinessNetwork.gateway){
						$scope.setFailNoticeMsg("与原IP相同，不需修改");
						return;
					}
				} else {
					$scope.setFailNoticeMsg("与原IP相同，不需修改");
					return;
				}
            }
			if (server.edit.ipaddr == $scope.omBizIp.publicNetwork.ipaddr) {
                $scope.setFailNoticeMsg('该IP被管理系统内部网络使用，请尝试使用其它IP');
				return;
			}
			// 节点所有IP都未使用该IP；不需要检查是否属于同一网段
			var servers = $scope.hardwareNodesDetail.status;
			for (var i = 0; i < servers.length; i++) {
				var iserver = servers[i];
				if (server.edit.ipaddr == iserver.bussinessNetwork.ipaddr ||
					server.edit.ipaddr == iserver.clusterNetwork.ipaddr){
					$scope.setFailNoticeMsg("该IP被" + iserver.nodeName + "使用，请尝试使用其它IP");
					return;
				};
			};
			// 检查网关IP设置是否正常
			// 不需要检查是否配置 isConfigNetworkGateway('bussiness')
			if ($scope.isConfigNetworkIpaddr($scope.networks_config, 'om_bussiness') || true){
				if (!IP_REGEXP.test(gateway)) {
					$scope.setFailNoticeMsg('默认网关IP不合法!');
					return;
				};
				if (!(ZERO_IP_REGEXP.test(gateway) || FULL_IP_REGEXP.test(gateway))) {
					var ip1_net = ($scope.ip2int(gateway) & $scope.ip2int(server.edit.netmask));
					var ip2_net = ($scope.ip2int(server.edit.ipaddr) & $scope.ip2int(server.edit.netmask));
					if (ip1_net != ip2_net){
						$scope.setFailNoticeMsg("IP地址和默认网关不在同一网段: " + server.edit.ipaddr + "/" + server.edit.netmask + "  " + gateway + "/" + server.edit.netmask);
						return;
					};
				};
			}

			// 提交修改
            $scope.setWaitNoticeMsg('正在修改，请稍后。。。');
            nodeFactory.omNetBussUpdate({
                bussinessNetwork: {
                    ipaddr: server.edit.ipaddr,
                    netmask: server.edit.netmask,
                    gateway: server.edit.gateway
                }
            }, function (res) {
                if (res.success) {
                    $scope.setSuccNoticeMsg('修改成功！');
                    $('#modifyOmBizIpModalId').modal('hide');
                    server.bussinessNetwork.ipaddr = server.edit.ipaddr;
                    server.bussinessNetwork.netmask = server.edit.netmask;
                    server.bussinessNetwork.gateway = server.edit.gateway;
                    server.$edit = false;
                } else {
                    $scope.setFailNoticeMsg(res.message);
                }
            });
		};
    };


    /**
     * 关机
     */
    $scope.showShutdownModal = function () {
        $("#shutdownModal").modal("show");
    };
    $scope.shutdown = function () {
        $("#shutdownModal").modal("hide");
        nodeFactory.nodeOperation({"operation": "shutdown"}, function () {
            if (success == 1) {
                $scope.setSuccNoticeMsg('成功关机！');
            }
        });
    };

    /**
     * 重启
     */
    $scope.showRebootModal = function () {
        $("#rebootModal").modal("show");
    };
    $scope.reboot = function () {
        $("#rebootModal").modal("hide");
        nodeFactory.nodeOperation({"operation": "reboot"}, function () {
            if (success == 1) {
                $scope.setSuccNoticeMsg('成功重启！');
            }
        });
    };

    /**
     * 维护
     */
    $scope.showMaintenanceModal = function () {
        $("#maintenanceModal").modal("show");
    };
    $scope.maintenance = function () {
        $("#maintenanceModal").modal("hide");
        nodeFactory.nodeOperation({"operation": "maintenance"}, function () {
            if (success == 1) {
                $scope.setSuccNoticeMsg('成功维护！');
            }
        });
    };

    /*********************** 图表 ***********************/

    // 初始化节点扩容容量
    $scope.initNodeCapacity = function (currentNode) {
        setTimeout(function () {
            $scope.initCycleOfClusterNode(currentNode.progress_status, 100 - currentNode.progress_status,
                currentNode.nodeName);
            $scope.initCycleOfNodeInfo(currentNode.progress_status, 100 - currentNode.progress_status,
                currentNode.nodeName);
        }, 2000);
    };

    // 群集：节点扩容容量显示
    $scope.cycleOfClusterNode = null;
    $scope.initCycleOfClusterNode = function (usedSpace, freeSpace, nodeName) {
        $scope.cycleOfClusterNode = echarts.init(document.getElementById(nodeName + 'CycleOfCluster'));
        var nodeCycleOption = getNodeCyclePieOption(usedSpace, freeSpace);
        $scope.cycleOfClusterNode.setOption(nodeCycleOption);
    };

    // 缩略：节点扩容容量显示
    $scope.cycleOfNodeInfo = null;
    $scope.initCycleOfNodeInfo = function (usedSpace, freeSpace, nodeName) {
        $scope.cycleOfNodeInfo = echarts.init(document.getElementById(nodeName + 'Cycle'));
        var nodeCycleOption = getNodeCyclePieOption(usedSpace, freeSpace);
        $scope.cycleOfNodeInfo.setOption(nodeCycleOption);
    };

    // cpu使用率
    $scope.showNodeCpuMemChart = function (nodeName) {
		var nodeName = $scope.selectedNodeDetail.nodeName;
		var cpuTarget = 'servers.' + nodeName + '.cpu.total.used_percentage';
		var memTarget = 'servers.' + nodeName + '.memory.used_percentage';
        var perfTargets = [cpuTarget, memTarget];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var values2 = [];
				var value1 = 0;
				var value2 = 0;
                var pointDatas = datas.data.datapoints;
                for (var i = 0; i < pointDatas.length; i++) {
                    times.push(pointDatas[i][0]);
                    if (null === pointDatas[i][1] || undefined === pointDatas[i][1]) {
                        if (i > 0 && null != pointDatas[i - 1][1] && undefined != pointDatas[i - 1][1]) {
                            value1 = pointDatas[i - 1][1].toFixed(2);
                        } else {
                            value1 = 0;
                        }
                    } else {
                        value1 = pointDatas[i][1].toFixed(2);
                    }
                    if (null === pointDatas[i][2] || undefined === pointDatas[i][2]) {
                        if (i > 0 && null != pointDatas[i - 1][2] && undefined != pointDatas[i - 1][2]) {
                            value2 = pointDatas[i - 1][2].toFixed(2);
                        } else {
                            value2 = 0;
                        }
                    } else {
                        value2 = pointDatas[i][2].toFixed(2);
                    }
					if (value1 > 100) {
						value1 = 100;
					}
					if (value2 > 100) {
						value2 = 100;
					}
					values.push(value1);
					values2.push(value2);
                }
                $scope.drawCpuMemChart(times, values, values2);
            }
        });
    };

    $scope.selectedNodeCpuMemChart = echarts.init(document.getElementById('selectedNodeCpuMemDom'));
    $scope.drawCpuMemChart = function (times, values, values2) {
        var cpuMemOptions = getEchartsLineOption('CPU/内存利用率(百分比)', times, 'cpu', values, 'mem', values2, 1024);
        var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
        var readColorTransparency  = 'rgba(149,203,213, 0.01)';
        var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
        cpuMemOptions = setEchartsOptionColor(cpuMemOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'cpu');
        cpuMemOptions.yAxis[0].max = 100;
        cpuMemOptions.yAxis[0].min = 0;
        cpuMemOptions.yAxis[0].interval = 20;
        cpuMemOptions.yAxis[0].splitNumber = 5;
        $scope.selectedNodeCpuMemChart.setOption(cpuMemOptions);
    };

    // 磁盘利用率(百分比)
    $scope.showDiskUtilChart = function () {
		var nodeName = $scope.selectedNodeDetail.nodeName;
		var diskName = $scope.selectedDiskDetail.device_name;
        var perfTargets = ['servers.' + nodeName + '.iostat.' + diskName + '.util_percentage'];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var pointDatas = datas.data.datapoints;
				var value = null;
                for (var i = 0; i < pointDatas.length; i++) {
                    times.push(pointDatas[i][0]);
                    if (null === pointDatas[i][1] || undefined === pointDatas[i][1]) {
                        if (i > 0 && null != pointDatas[i - 1][1] && undefined != pointDatas[i - 1][1]) {
                            value = pointDatas[i - 1][1].toFixed(2);
                        } else {
                            value = 0;
                        }
                    } else {
                        value = pointDatas[i][1].toFixed(2);
                    }
					if (value > 100) {
						value = 100;
					}
					values.push(value);
                }
                $scope.drawDiskUtilChart(diskName, times, values);
            }
        });
    };

    $scope.selectedDiskUtilChart = echarts.init(document.getElementById('selectedDiskUtilChartDom'));
    $scope.drawDiskUtilChart = function (diskName, times, values) {
        var dickOptions = getEchartsLineOption('磁盘利用率(百分比): ' + diskName, times, 'util', values, '', null, 1024);
        var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
        var readColorTransparency  = 'rgba(149,203,213, 0.01)';
        var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
        dickOptions = setEchartsOptionColor(dickOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
		dickOptions.yAxis[0].max = 100;
		dickOptions.yAxis[0].min = 0;
		dickOptions.yAxis[0].interval = 20;
		dickOptions.yAxis[0].splitNumber = 5;
        $scope.selectedDiskUtilChart.setOption(dickOptions);
    };

    // 收发包流量
    $scope.showNicTxRxChart = function () {
		var nodeName = $scope.selectedNodeDetail.nodeName;
		var nicName = $scope.selectedNicDetail.name;
        var perfTargets = ['servers.' + nodeName + '.network.' + nicName + '.tx_byte',
							'servers.' + nodeName + '.network.' + nicName + '.rx_byte'];

        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var values2 = [];
                var pointDatas = datas.data.datapoints;
                for (var i = 0; i < pointDatas.length; i++) {
                    times.push(pointDatas[i][0]);
                    if (null === pointDatas[i][1] || undefined === pointDatas[i][1]) {
                        if (i > 0 && null != pointDatas[i - 1][1] && undefined != pointDatas[i - 1][1]) {
                            values.push(pointDatas[i - 1][1].toFixed(2));
                        } else {
                            values.push(0);
                        }
                    } else {
                        values.push(pointDatas[i][1].toFixed(2));
                    }
                    if (null === pointDatas[i][2] || undefined === pointDatas[i][2]) {
                        if (i > 0 && null != pointDatas[i - 1][2] && undefined != pointDatas[i - 1][2]) {
                            values2.push(pointDatas[i - 1][2].toFixed(2));
                        } else {
                            values2.push(0);
                        }
                    } else {
                        values2.push(pointDatas[i][2].toFixed(2));
                    }
                }
                $scope.drawNicTxRxChart(nicName, times, 'tx',  values, 'rx', values2);
            }
        });
    };

    $scope.selectedNicTxRxChart = echarts.init(document.getElementById('selectedNicTxRxDom'));
    $scope.drawNicTxRxChart = function (nicName, times, name1, values, name2, values2) {
        var networkOptions         = getEchartsLineOption('网卡带宽(B/s): ' + nicName,
														  times, name1, values, name2, values2, 1024);
        var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
        var readColorTransparency  = 'rgba(149,203,213, 0.01)';
        var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
        networkOptions = setEchartsOptionColor(networkOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, name1);
        $scope.selectedNicTxRxChart.setOption(networkOptions);
    };

    // 丢包数
    $scope.freshNicDropPackage = function () {
		$scope.selectedNicDetail.dropCount = 'NA';
		if ($scope.selectedNicDetail.status == 'down'){
			return;
		}
		var nodeName = $scope.selectedNodeDetail.nodeName;
		var nicName = $scope.selectedNicDetail.name;
        var perfTargets = ['servers.' + nodeName + '.network.' + nicName + '.rx_drop',
							'servers.' + nodeName + '.network.' + nicName + '.tx_drop'];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var dropCount = 0;
                var pointDatas = datas.data.datapoints;
                for (var i = 0; i < pointDatas.length; i++) {
                    if (null != pointDatas[i][1] || undefined != pointDatas[i][1]) {
                        dropCount += pointDatas[i][1];
                    }
                    if (null != pointDatas[i][2] || undefined != pointDatas[i][2]) {
                        dropCount += pointDatas[i][2];
                    }
                }
				var count = 1;
				if (pointDatas.length > 0){
					count = pointDatas.length;
				}
        $scope.selectedNicDetail.dropCount = dropCount;
				//$scope.selectedNicDetail.dropCount = (dropCount * 3600 / count).toFixed(0);
            }
        });
    };

    // 当页面发生改变时，图表宽高也跟着变化
    $scope.$on('onMainWindowsResize', function () {
		if ($scope.cycleOfClusterNode) {
			$scope.cycleOfClusterNode.resize();
		}
		if ($scope.cycleOfNodeInfo){
			$scope.cycleOfNodeInfo.resize();
		}
		if ($scope.selectedNodeCpuMemChart){
			$scope.selectedNodeCpuMemChart.resize();
		}
		if ($scope.selectedDiskUtilChart){
			$scope.selectedDiskUtilChart.resize();
		}
		if ($scope.selectedNicTxRxChart){
			$scope.selectedNicTxRxChart.resize();
		}

        $scope.setNodeInfoHeight();
    });

    // 页面上的分割线进行高度定义
    $scope.setNodeInfoHeight = function () {
        var dom             = document.getElementById('hardwareHeightId');
        var referenceHeight = dom.offsetHeight;
        var marginTop       = referenceHeight * 0.1;
        $scope.height1 = {
            'margin-top': marginTop + 'px',
            'height': referenceHeight * 0.8 + 'px'
        };
        $scope.height2 = {
            'margin-top': marginTop + 'px',
            'height': referenceHeight * 0.87 + 'px'
        };
    };

    // 设置定时任务
    $scope.nodeTimeTicker = null;
    if ($scope.nodeTimeTicker) {
        clearInterval($scope.nodeTimeTicker);
    }
    $scope.nodeTimeTicker = setInterval (function () {
		$scope.freshHardwareNodesDetail();
    }, 30000);

    // 设置定时任务取消的触发事件
    $rootScope.$on('$stateChangeStart', cancelTimer);
    function cancelTimer(event, toState, toParams, fromState, fromParams) {
        clearInterval($scope.nodeTimeTicker);
    }

    /*********************** 图表 end ***********************/

    $scope.swapDiskShow = function (diskStatus){
        if ($scope.selectedNodeDetail.nodeStatus === 'down' || diskStatus !== 'down') {
            return;
        }
        $scope.swapDiskNodeName = $scope.selectedNodeDetail["nodeName"];
        $scope.diskOp     = "swap" ;
        $('#SwapDisk').modal('show');
        var param = {"nodeName": $scope.selectedNodeDetail["nodeName"]};
        var opts = {
            lines: 7, // The number of lines to draw
            length: 0, // The length of each line
            width: 4, // The line thickness
            radius: 6, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#08C', // #rgb or #rrggbb
            speed: 1.8, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var targets = document.getElementsByName('discover');
        var spinner = Array(targets.length);
        for(var i = 0; i < targets.length; i++) {
            spinner[i] = new Spinner(opts).spin(targets[i]);
        }
        $scope.checkoutDisk(param);
    };

    /**
     * 点灯操作
     * @param  {[type]} nodeDetail [description]
     * @param  {[type]} diskDetail [description]
     * @return {[type]}            [description]
     */
    $scope.diskLight = function (nodeDetail, diskDetail) {
        if (nodeDetail.nodeStatus === 'down') {
            return;
        }
        var lightOps = (diskDetail['lightStatus'] == 'off') ? 'turn_on' : 'turn_off';
        $scope.diskLightTurn({'hostid':nodeDetail['nodeName'], 'wwid':diskDetail['wwid'], 'lightOps': lightOps});
    };
    $scope.diskLightTurn = function (param) {
        NProgress.start();
        nodeFactory.nodeDiskLightTurn(param, function (response) {
            if (response.success) {
                $scope.freshHardwareNodesDetail();
            } else {
                $scope.showDialog(response.message);
            }
            NProgress.done();
        });
    };

    $scope.rediscoverDisk = function () {
        var param = {"nodeName": $scope.swapDiskNodeName};
        $scope.checkoutDisk(param);
    };

    $scope.checkoutDisk = function(param) {
        $scope.setStorageNormal();
        $scope.adisk = {};
        $scope.diskDiscoverDone = false;
        $scope.lostDiskList = new Array();
        $scope.newDiskList = new Array();
        nodeFactory.nodeDiskCheckout(param, function (response) {
            $scope.diskDiscoverDone = true;
            if (response.success) {
                $scope.setStorageNormal();
                $scope.lostDiskList = response.data.lostDiskList;
                $scope.newDiskList = response.data.newDiskList;
                if ($scope.lostDiskList.length == 0 && $scope.newDiskList.length == 0) {
                    $scope.setStorageErrMsg("未扫描到拔插磁盘状态，请拔出旧磁盘并插入新磁盘后重新扫描");
                }
                else {
                    if ($scope.lostDiskList.length == 0) {
                        $scope.setStorageErrMsg("未扫描到被拔出的磁盘,请拔出需要被替换的磁盘再重新扫描");
                    }
                    if ($scope.newDiskList.length == 0) {
                        $scope.setStorageErrMsg("未扫描到被新插入的磁盘,请插入用于替换的磁盘再重新扫描");
                    }
                }
            } else {
                $scope.setStorageErrMsg("磁盘状态扫描失败，可能是内部网络通信有阻塞，请稍后再试");
            }
        });
    };
    $scope.setStorageNormal = function() {
        $scope.errMsg = "";
    };

    // 换盘时检查缓存盘大小是否一致
    $scope.checkDiskSize = function(){
        // 缓存盘类型
        var cacheType = ["read_write_cache", "write_cache", "read_cache"]
        // lost_id为有故障的磁盘id
        var lost_id = $scope.adisk.lostDisk.wwid
        // 初始化故障磁盘的类型
        var lost_disk_type = ''
        //  lost_node_disks 为故障节点所有的硬盘
        var lost_node_disks = $scope.selectedNodeDetail.disks
        // 遍历节点硬盘，取到故障硬盘的类型
        for (var i=0; i<lost_node_disks.length; i++){
            if (lost_node_disks[i].wwid == lost_id){
                lost_disk_type= lost_node_disks[i].function
                break
            }
        }
        if (lost_disk_type && $.inArray(lost_disk_type, cacheType)!=-1){
            for (var j=0; j<lost_node_disks.length; j++){
                // 如果新的磁盘大小与原有的相同磁盘类型的缓存盘大小不一致，则返回并提示。
                if (lost_node_disks[j].wwid != lost_id && lost_node_disks[j].function==lost_disk_type
                    && lost_node_disks[j].capacity != $scope.adisk.newDisk.capacity){
                    $scope.setStorageErrMsg("新磁盘容量应与替换掉的磁盘保持一致!");
                    return false
                }
            }
        }
        return true
    }

    $scope.swapDisk = function() {
        if (!$scope.adisk.lostDisk) {
            $scope.showTipMsg("请选择被替换的磁盘", "adisk.lostDisk");
            return
        }
        if (!$scope.adisk.newDisk) {
            $scope.showTipMsg("请选择用于替换的磁盘","adisk.newDisk");
            return
        }
        if (!$scope.checkDiskSize()){return}
        var lostDiskWwid = Trim($scope.adisk.lostDisk.wwid);
        var lostDiskCapacity = $scope.adisk.lostDisk.capacity;	//unit: kb
        var newDiskWwid = Trim($scope.adisk.newDisk.wwid);
        var newDiskCapacity = $scope.adisk.newDisk.capacity;	//unit: bytes, shit ...
		if ( parseInt(lostDiskCapacity)*1024 > parseInt(newDiskCapacity)) {
            $scope.setStorageErrMsg("禁止换盘,因为新磁盘的容量小于原磁盘的容量！");
            return;
        }

        var param = {"nodeName":$scope.swapDiskNodeName,'lostDiskWwid':lostDiskWwid,'newDiskWwid':newDiskWwid ,'lostDiskCapacity':lostDiskCapacity,'newDiskCapacity':newDiskCapacity}
        NProgress.start();
        nodeFactory.nodeDiskSwapDisk(param, function(response) {
            if (response.success) {
                $("#SwapDisk").modal("hide");
                $scope.showDialog("换盘成功，正在对新盘做数据恢复。在磁盘状态显为健康之前不要有任何换盘，拔、插盘操作！");
            }else {
                $("#SwapDisk").modal("hide");
                if (response.data && $.inArray('server_list',response.data)==-1){
                    $scope.wwidEqualServer = response.data.server_list
                    $('#RepalceDiskWwidEqual').modal('show')
                }else {
                    $scope.showDialog(response.message);
                }
            }
        });
        $scope.freshHardwareNodesDetail();
        NProgress.done();
    };

    $scope.addDisk = function() {
        NProgress.start();
        NProgress.done();
    };

    $scope.ip2int = function(ip){
        var num = 0;
        ip = ip.split('.');
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    };

    $scope.usedPercent = 40;

    $scope.showNodeAddModal = function () {
        $('#nodeAddModal').modal({backdrop: 'static', keyboard: false});
        $('#nodeAddModal').modal('show');
    };

    $scope.setStorageErrMsg = function(msg) {
        $scope.errMsg = msg;
    };

    $scope.initView();

     /**
     * 扩容回滚
     * @param  {string} nodeName 当前节点名
     */
    $scope.showNodeRollback = function (nodeName) {
        $('#nodeRollbackModal').modal('show');
        $scope.modal.param = {'hostid': nodeName};
        $scope.modal.sureTo = $scope.nodeRollback;
    };
    $scope.nodeRollback = function () {
        nodeFactory.nodeRollback($scope.modal.param, function (res) {
            if (res.success) {
                $scope.modal.param = {};
                $scope.setSuccNoticeMsg(res.data.message);
                $scope.freshHardwareNodesDetail();
            }
        });
        $('#nodeRollbackModal').modal('hide');
    };

}]);
