/**
*  Created by huangminxuan on 2016/07/04.
*/
sdsomwebApp.controller('hardwareLeft', ['$rootScope', '$scope', 'nodeFactory', 'mainFactory',
    function ($rootScope, $scope, nodeFactory, mainFactory) {
    'use strict';

    $scope.init = function () {
        // 设置定时任务开关
        $scope.stopTimerTicker = false;
        function cancelTimer(){$scope.stopTimerTicker = true};
        $rootScope.$on('$stateChangeStart', cancelTimer);

        $scope.initClusterInfo();
        $scope.initCpuTotal();
        $scope.initMemTotal();
        $scope.initDiskTotal();
    };

    $scope.initClusterInfo = function () {
        nodeFactory.getClusterInfo(function (response) {
            if (response.success) {
                $scope.clusterInfo = response.data;
            }
        });
    };

    /*********************** 图表 ***********************/
    // 总CPU利用率
    $scope.initCpuTotal = function () {
        var perfTargets = ['averageSeries(servers.*.cpu.total.used_percentage)'];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var value = 0;
                var pointDatas = datas.data.datapoints;
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

                $scope.initCpu(times, values, null);
            }
            $scope.initMemTotal();
        });
    };

    $scope.cpuTotal = echarts.init(document.getElementById('cpuTotal'));
    $scope.initCpu = function (times, values, values2) {
        var cpuOptions = getEchartsLineOption('总CPU利用率(百分比)', times, 'cpu', values, null, null, 1024);
        var readColor = 'rgba(165, 197, 158, 0.6)'; //'#95cbd5';
        var readColorTransparency = 'rgba(165, 197, 158, 0.01)';
        var writeColor = 'rgba(149,203,213, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(149,203,213, 0.01)';
        cpuOptions = setEchartsOptionColor(cpuOptions, readColor, writeColor, readColorTransparency, writeColorTransparency);
        cpuOptions.yAxis[0].max = 100;
        cpuOptions.yAxis[0].min = 0;
        cpuOptions.yAxis[0].interval = 20;
        cpuOptions.yAxis[0].splitNumber = 5;

        $scope.cpuTotal.setOption(cpuOptions);
    };

    // 总内存利用率
    $scope.initMemTotal = function () {
        var perfTargets = ['averageSeries(servers.*.memory.used_percentage)'];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var value = 0;
                var pointDatas = datas.data.datapoints;
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
                $scope.initMem(times, values, null);
            }
            $scope.initDiskTotal();
        });
    };

    $scope.memTotal = echarts.init(document.getElementById('memTotal'));
    $scope.initMem = function (times, values, values2) {
        var memOptions = getEchartsLineOption('总内存利用率(百分比)', times, 'mem', values, null, null, 1024);
        var readColor = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
        var readColorTransparency = 'rgba(149,203,213, 0.01)';
        var writeColor = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
        memOptions = setEchartsOptionColor(memOptions, readColor, writeColor, readColorTransparency, writeColorTransparency);
        memOptions.yAxis[0].max = 100;
        memOptions.yAxis[0].min = 0;
        memOptions.yAxis[0].interval = 20;
        memOptions.yAxis[0].splitNumber = 5;
        $scope.memTotal.setOption(memOptions);
    };

    // 总磁盘使用率
    $scope.initDiskTotal = function () {
        var perfTargets = ['averageSeries(servers.*.diskspace._sandstone-data*.used_percentage)'];
        mainFactory.getSeriesData({'from': '-1h', 'targets': perfTargets}, function (datas) {
            if (1 === datas.success) {
                var times = [];
                var values = [];
                var value = 0;
                var pointDatas = datas.data.datapoints;
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
                $scope.initDisk(times, values, null);
            }
            if($scope.stopTimerTicker === false){
                setTimeout(function(){ $scope.initCpuTotal();}, 29000);
            }
        });
    };

    $scope.diskTotal = echarts.init(document.getElementById('diskTotal'));
    $scope.initDisk = function (times, values, values2) {
        var diskOptions = getEchartsLineOption('总磁盘使用率(百分比)', times, 'disk', values, null, null, 1024);
        var readColor = 'rgba(165, 197, 158, 0.6)'; //'#95cbd5';
        var readColorTransparency = 'rgba(165, 197, 158, 0.01)';
        var writeColor = 'rgba(149,203,213, 0.6)'; //'#a5c59e';
        var writeColorTransparency = 'rgba(149,203,213, 0.01)';
        diskOptions = setEchartsOptionColor(diskOptions, readColor, writeColor, readColorTransparency, writeColorTransparency);
        diskOptions.yAxis[0].max = 100;
        diskOptions.yAxis[0].min = 0;
        diskOptions.yAxis[0].interval = 20;
        diskOptions.yAxis[0].splitNumber = 5;
        $scope.diskTotal.setOption(diskOptions);
    };

    // 当页面发生改变时，图表宽高也跟着变化
    $scope.$on('onMainWindowsResize', function () {
        $scope.cpuTotal.resize();
        $scope.memTotal.resize();
        $scope.diskTotal.resize();
    });

    // 设置定时任务
    $scope.totalTimeTicker = null;
    if ($scope.totalTimeTicker) {
        clearInterval($scope.totalTimeTicker);
    }
    $scope.totalTimeTicker = setInterval (function () {
        $scope.initCpuTotal();
        $scope.initMemTotal();
        $scope.initDiskTotal();
    }, 30000);

    // 设置定时任务取消的触发事件
    $rootScope.$on('$stateChangeStart', cancelTimer);
    function cancelTimer(event, toState, toParams, fromState, fromParams) {
        clearInterval($scope.totalTimeTicker);
    }
    /*********************** 图表 end ***********************/
}]);
