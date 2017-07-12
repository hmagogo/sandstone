'use strict';
sdsomwebApp.controller('mainLeftCtrl', ['$rootScope', '$scope', '$state', 'Restangular', 'mainFactory',
    function ($rootScope, $scope, $state, Restangular, mainFactory) {
        $scope.capacity = {};//存储容量

        // 初始化
        $scope.init = function () {
            if ($state.current.name == 'main.container.container_view') {
                $scope.isDashboardView = true;
            } else {
                $scope.isDashboardView = false;
            }
            $scope.refreshDynamicStyle();
            $scope.initCapacity();

            // 设置定时任务开关
            $scope.stopTimerTicker = false;
            function cancelTimer(){ $scope.stopTimerTicker = true};
            $rootScope.$on('$stateChangeStart', cancelTimer);
            
            //异步请求修改为嵌套请求 initIops >> initMbps >> initLatency
            $scope.initIops();
            $scope.initMbps();
            $scope.initLatency();
        };

        // 初始化存储容量显示
        $scope.initCapacity = function () {
            mainFactory.queryCapacity(function (datas) {
                if (1 === datas.success) {
                    var usedSpace = datas.data.used_bytes;
                    var freeSpace = datas.data.free_bytes;
                    var assignedSpace = datas.data.assigned_bytes;
                    var totalSpace = datas.data.capacity_bytes;
                    $scope.capacity.used_bytes = usedSpace;
                    $scope.capacity.free_bytes = freeSpace;
                    $scope.capacity.assigned_bytes = assignedSpace;
                    $scope.capacity.capacity_bytes = totalSpace;
                    
                    if (assignedSpace < totalSpace){
                        $scope.capacity.used_percent = (usedSpace * 100 / totalSpace).toFixed(0);
                        $scope.capacity.assinged_percent = (assignedSpace * 100 / totalSpace).toFixed(0) - $scope.capacity.used_percent;
                    }else{
                        $scope.capacity.used_percent = (usedSpace * 100 / totalSpace).toFixed(0);
                        $scope.capacity.assinged_percent = 100 - $scope.capacity.used_percent;
                    }
                    
                    if (assignedSpace > (freeSpace+usedSpace)){
                        var freeSpaceRate = 0;
                        var assignedSpaceRate = 100;
                        var usedSpaceRate = usedSpace/(totalSpace) * 100;
                    }else{
                        var freeSpaceRate = 100;
                        var assignedSpaceRate = assignedSpace/(freeSpace+usedSpace) * 100;
                        var usedSpaceRate = usedSpace/(freeSpace+usedSpace) * 100;
                    }
                    $scope.initCapacityChart(usedSpaceRate, freeSpaceRate, assignedSpaceRate);
                }
            });
        };

        // 初始化集群数据 IOPS
        $scope.initIops = function () {
            var perfTargets = ['sds.cluster.*.pool.all.sds_read', 'sds.cluster.*.pool.all.sds_write'];
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
                    $scope.initIopsChart(times, values, values2);
                }
                $scope.initMbps();
            });
        };

        // 初始化集群数据 MBPS
        $scope.initMbps = function () {
            var perfTargets = ['sds.cluster.*.pool.all.sds_read_b', 'sds.cluster.*.pool.all.sds_write_b'];
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
                    $scope.initMbpsChart(times, values, values2);
                }
                $scope.initLatency();
            });
        };

        //初始化集群数据 时延
        $scope.initLatency = function () {
            var perfTargets = ['sds.cluster.*.pool.all.sds_read_latency', 'sds.cluster.*.pool.all.sds_write_latency'];
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
                    $scope.initLatenceChart(times, values, values2);
                }
                if($scope.stopTimerTicker === false){
                    setTimeout(function(){
                        //存储容量显示
                        $scope.initCapacity();
                        //定时任务的异步请求，改为嵌套请求  initIops >> initMbps >> initLatency
                        $scope.initIops();
                    }, 28000);
                }
            });
        };

        // 存储容量显示
        $scope.capacityChart = null;
        $scope.initCapacityChart = function (usedSpace, freeSpace, assignedSpace) {
            if ($scope.isDashboardView) {
                $scope.capacityChart = echarts.init(document.getElementById('capacityCycle'));
                var summaryOption = getEchartCapacityPieOption(usedSpace, freeSpace, assignedSpace);
                $scope.capacityChart.setOption(summaryOption);
            }
        };

        // 集群IOPS显示
        $scope.iopsChart = echarts.init(document.getElementById('iops'));
        $scope.initIopsChart = function (times, values, values2) {
            var iopsOptions = getEchartsLineOption('系统IOPS', times, 'read', values, 'write', values2, 1000);
            var readColor = 'rgba(225,87,87, 0.4)'; //'#e15757';
            var readColorTransparency = 'rgba(225,87,87, 0.01)';
            var writeColor = 'rgba(230, 176, 88, 0.4)'; //'#e6b058';
            var writeColorTransparency = 'rgba(230, 176, 88, 0.01)';
            iopsOptions = setEchartsOptionColor(iopsOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            $scope.iopsChart.setOption(iopsOptions);
        };

        // 集群MBPS显示
        $scope.mbpsChart = echarts.init(document.getElementById('mbps'));
        $scope.initMbpsChart = function (times, values, values2) {
            var mbpsOptions = getEchartsLineOption('系统MBPS(B/s)', times, 'read', values, 'write', values2, 1024);
            var readColor = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
            var readColorTransparency = 'rgba(149,203,213, 0.01)';
            var writeColor = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
            var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
            mbpsOptions = setEchartsOptionColor(mbpsOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            $scope.mbpsChart.setOption(mbpsOptions);
        };

        // 集群平均时延显示
        $scope.latencyChart = echarts.init(document.getElementById('latency'));
        $scope.initLatenceChart = function (times, values, values2) {
            var latenceOptions = getEchartsLineOption('系统时延(ms)', times, 'read', values, 'write', values2, 1024);
            var readColor = 'rgba(36,167,202, 0.3)'; //'#24a7ca';
            var readColorTransparency = 'rgba(36,167,202, 0.01)';
            var writeColor = 'rgba(101, 158, 73, 0.3)'; //'#659e49';
            var writeColorTransparency = 'rgba(101, 158, 73, 0.01)';
            latenceOptions = setEchartsOptionColor(latenceOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            $scope.latencyChart.setOption(latenceOptions);
        };

        // 刷新页面所有动态样式
        $scope.refreshDynamicStyle = function () {
            $scope.refreshMiddleSolidBarStyle();
            $scope.refreshProgressBarStyle();
        };

        // 刷新中间隔断条的样式
        $scope.refreshMiddleSolidBarStyle = function () {
            var dom = document.getElementById('sdsFrameReferenceHeightId');
            var referenceHeight = dom.offsetHeight;
            var marginTop = referenceHeight * 0.13;
            var marginBottom = referenceHeight * 0.3;
            var height = referenceHeight * 0.45;
            if ($scope.isDashboardView) {
                marginTop = referenceHeight * 0.23;
            }
            $scope.middleSolidStyle = {
                'margin-top': marginTop + 'px',
                'margin-bottom': marginBottom + 'px',
                'height': height + 'px'
            };
        };

        // 刷新进度条的字体样式
        $scope.refreshProgressBarStyle = function () {
            var dom = document.getElementById('usedProgress');
            var referenceHeight = dom.offsetHeight;
        };

        // 页面高度和宽度发生变化时刷新相应的图及样式
        $scope.$on('onMainWindowsResize', function () {
            if ($scope.capacityChart) {
                $scope.capacityChart.resize();
            }
            $scope.iopsChart.resize();
            $scope.mbpsChart.resize();
            $scope.latencyChart.resize();
            $scope.refreshDynamicStyle();
        });

        // 设置定时任务
        $scope.mainLeftTimeTicker = null;
        if ($scope.mainLeftTimeTicker) {
            clearInterval($scope.mainLeftTimeTicker);
        }
        $scope.mainLeftTimeTicker = setInterval(function () {
            //存储容量显示
            $scope.initCapacity();
            $scope.initIops();
            $scope.initMbps();
            $scope.initLatency();
        }, 30000);// refresh least interval is 30s, for bakend server update data once every 30s);

        // 设置定时任务取消的触发事件
        $rootScope.$on('$stateChangeStart', cancelTimer);
        function cancelTimer(event, toState, toParams, fromState, fromParams) {
            clearInterval($scope.mainLeftTimeTicker);
        }
    }]);
