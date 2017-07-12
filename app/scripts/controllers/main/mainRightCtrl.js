sdsomwebApp.controller('mainRightCtrl', ['$rootScope', '$scope', '$state', 'Restangular', 'mainFactory', 'nodeFactory', 'alarmFactory',
    function ($rootScope, $scope, $state, Restangular, mainFactory, nodeFactory, alarmFactory) {
        'use strict';

        $scope.init = function () {
            $scope.gMainStateRouteView.current = 'main.container.container_view';
            $scope.poolCount = '';
            $scope.lunCount = '';
            $scope.blockCount = '';

            $scope.hardwareNode = {
                total: '',
                up: '',
                down: ''
            };
            $scope.hardwareSummary = {
                hddCount: '',
                nodeCount: '',
                ssdCount: '',
                totalCPU: '',
                totalMem: '',
                memory: {
                    total_bytes: '',
                    used_bytes: '',
                    free_bytes: '',
                    used_percent: ''
                },
                cpu: {
                    cores: '',
                    total_mhz: '',
                    used_percent: ''
                }
            };
            $scope.refreshMiddleSolidBarStyle();
            $scope.refreshAlarmItemStyle();
            $scope.refreshStorage();
            $scope.refreshHardware();
            $scope.cpuTop3 = [];
            $scope.iopsTop3 = [];
            $scope.mbpsTop3 = [];
            $scope.refreshTop();
            $scope.mainRightAlarmList = [];
            $scope.refreshAlarmList();
        };
        // 刷新存储数据
        $scope.refreshStorage = function () {
            //请求存储池数量
            mainFactory.queryResourcePool({pagesize: 100, pageno: 1}, function (res) {
                if (1 === res.success) {
                    $scope.poolCount = res.data.physical_pools.length || 0;
                    $scope.poolSummary = res.data;
                }
            });
            //请求卷数量
            mainFactory.queryResourceVolume({pagesize: 100, pageno: 1}, function (res) {
                if (1 === res.success) {
                    console.log(res.data.results);
                    $scope.volumeCount = res.data.totalCount || 0;
                }
            });
        };

        // 更新硬件状态信息
        $scope.refreshHardware = function () {
            // 查询硬件summary节点数
            mainFactory.querySysNodes(function (res) {
                if (1 === res.success) {
                    $scope.hardwareNode.total = res.data.total;
                    $scope.hardwareNode.up = res.data.ok;
                    $scope.hardwareNode.down = res.data.down;
                } else {
                    //$scope.showDialog(res.message);
                }
            });
            // 查询磁盘状态
            nodeFactory.getSysHard(function (res) {
                if (1 === res.success) {
                    $scope.hardwareSummary = res.data;
                    var innerValue = [];
                    // 红色#e6b058 蓝色#24a7ca，绿色#a5c59e，
                    var innerColorArray = new Array('rgba(230, 176, 88, 0.5)', 'rgba(36,167,202, 0.5)', 'rgba(165, 197, 158, 1)');
                    for (var i = 0; i < $scope.hardwareSummary.servers.length; i++) {
                        var innerColor = innerColorArray[i % 3];
                        if (i == $scope.hardwareSummary.servers.length - 1 && i % 3 == 0) {
                            innerColor = innerColorArray[1];
                        }
                        innerValue.push({
                            name: $scope.hardwareSummary.servers[i].hostid,
                            value: $scope.hardwareSummary.servers[i].used_bytes,
                            itemStyle: {
                                normal: {
                                    color: innerColor
                                }
                            }
                        });
                    }

                    var outerValue = [];
                    var outerColorArray = new Array('#f7f8f8', '#efefef', '#e6e7e7'); // f7 247  ef 239 e7 231 dc 220
                    for (var j = 0; j < $scope.hardwareSummary.servers.length; j++) {
                        for (var k = 0; k < $scope.hardwareSummary.servers[j].disks.length; k++) {
                            var disk_name = $scope.hardwareSummary.servers[j].hostid + ':' + $scope.hardwareSummary.servers[j].disks[k].device_name
                            var used_bytes = $scope.hardwareSummary.servers[j].disks[k].used_bytes;
                            var outColor = outerColorArray[k % 3];
                            if (k == $scope.hardwareSummary.servers[j].disks.length - 1 && k % 3 == 0) {
                                outColor = outerColorArray[1];
                            }
                            if (used_bytes > 0) {
                                outerValue.push({
                                    name: disk_name,
                                    value: used_bytes,
                                    itemStyle: {
                                        normal: {
                                            color: outColor
                                        }
                                    }
                                });

                            }
                        }
                    }
                    $scope.initNodeDiskChart(innerValue, outerValue);
                }
            });
        };

        $scope.initNodeDiskChart = function (innerValue, outerValue) {
            $scope.nodeDiskChart = echarts.init(document.getElementById('capacityNodeDisk'));
            var option = getNodeDiskPieOption(innerValue, outerValue, 1024);
            $scope.nodeDiskChart.setOption(option);
        };

        // TOP
        $scope.refreshTop = function () {
            // TOP CPU
            nodeFactory.top3node({top: 3, resType: 'CPU'}, function (res) {
                if (1 === res.success) {
                    var nodes = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var obj = {
                            nodeIp: res.data[i][1],
                            cpu: res.data[i][2]
                        };
                        nodes.push(obj);
                    }
                    $scope.cpuTop3 = nodes;
                } else {
                    //$scope.showDialog(res.message);
                }
            });

            // TOP MBPS
            nodeFactory.top3node({top: 3, resType: 'MBPS'}, function (res) {
                if (1 === res.success) {
                    var nodes = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var obj = {
                            nodeIp: res.data[i][1],
                            mbps: res.data[i][2]
                        };
                        nodes.push(obj);
                    }
                    $scope.mbpsTop3 = nodes;
                } else {
                    //$scope.showDialog(res.message);
                }
            });

            // TOP IOPS
            nodeFactory.top3node({top: 3, resType: 'IOPS'}, function (res) {
                if (1 === res.success) {
                    var nodes = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var obj = {
                            nodeIp: res.data[i][1],
                            iops: res.data[i][2]
                        };
                        nodes.push(obj);
                    }
                    $scope.iopsTop3 = nodes;
                } else {
                    //$scope.showDialog(res.message);
                }
            });
        };

        // 更新告警
        $scope.refreshAlarmList = function () {
            var queryParams = {
                resolved: '',
                severity: ['critical', 'warning'],
                pageno: '1',
                pagesize: '10'
            };
            alarmFactory.sdsAlarmList(queryParams, function (res) {
                if (1 === res.success) {
                    // 只显示 8 条
                    if (res.data.results.length <= 6) {
                        $scope.mainRightAlarmList = res.data.results;
                    } else {
                        var alarmList = [];
                        for (var i = 0; i < 6; i++) {
                            alarmList.push(res.data.results[i]);
                        }
                        $scope.mainRightAlarmList = alarmList;
                    }

                    $scope.refreshAlarmItemStyle();
                }
            });
        };

        //页面跳转
        $scope.goToAlarm = function () {
            $state.transitionTo('main.alarmManage');
        };

        $scope.refreshMiddleSolidBarStyle = function () {
            var dom = document.getElementById('sdsFrameReferenceHeightId');
            var referenceHeight = dom.offsetHeight;
            var marginTop = referenceHeight * 0.23;
            var marginBottom = referenceHeight * 0.3;
            var height = referenceHeight * 0.45;
            $scope.middleSolidStyle = {
                'margin-top': marginTop + 'px',
                'margin-bottom': marginBottom + 'px',
                'height': height + 'px'
            };
        };

        $scope.refreshAlarmItemStyle = function () {
            var dom = document.getElementById('alarmItemListId');
            var referenceHeight = dom.offsetHeight;
            var lineHeight = referenceHeight / 12 - 1;
            $scope.alarmItemLineStyle = {
                'height': lineHeight + 'px',
                'line-height': lineHeight + 'px'
            };
        };
        //页面刷新
        $scope.$on('onMainWindowsResize', function () {
            if ($scope.nodeDiskChart) {
                $scope.nodeDiskChart.resize();
            }
            $scope.refreshMiddleSolidBarStyle();
            $scope.refreshAlarmItemStyle();
        });

        //设置定时任务
        $scope.mainRightTimeTicker = null;
        if ($scope.mainRightTimeTicker) {
            clearInterval($scope.mainRightTimeTicker);
        }
        $scope.mainRightTimeTicker = setInterval(function () {
            $scope.refreshStorage();
            $scope.refreshHardware();
            $scope.refreshTop();
            $scope.refreshAlarmList();
        }, 30000);

        $rootScope.$on('$stateChangeStart', cancelTimer);
        function cancelTimer(event, toState, toParams, fromState, fromParams) {
            clearInterval($scope.mainRightTimeTicker);
        }
    }]);
