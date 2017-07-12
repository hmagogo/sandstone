/**
 * Created by huangminxuan on 2016/4/18.
 */
sdsomwebApp.controller('alarmManagerCtrl', ['$scope', 'alarmFactory', 'eventFactory',
    function ($scope, alarmFactory, eventFactory) {
        'use strict';

        /**
         * 初始化函数
         */
        $scope.initPage = function () {
            $scope.gMainStateRouteView.current = 'main.alarmManage';
            //显示告警展示框
            $scope.showTab = 'alarm';

            //初始化告警日志列表查询
            $scope.queryParams = {
                resolved: '',
                severity: ['critical', 'warning'],
                pageno: '1',
                pagesize: '10'
            };
            //初始化事件查询条件
            $scope.eventQueryParams = {
                resolved: '',
                severity: ['info'],
                pageno: '1',
                pagesize: '10'
            };

            //查询告警日志
            $scope.getAlarmList();

        };


        /**
         * 显示告警列表或者事件列表
         */
        $scope.showAlarmTab = function () {
            $scope.getAlarmList();
            $scope.showTab = 'alarm';
        };
        $scope.showEventTab = function () {
            $scope.getEventList();
            $scope.showTab = 'event';
        };
        $scope.showLogTab = function () {
            $scope.getLogList();
            $scope.showTab = "log";
        };

        /**
         * 获取告警列表
         */
        $scope.getAlarmList = function (pageSize, goPage) {
            if (pageSize && goPage) {
                $scope.queryParams.pageno = goPage;
                $scope.queryParams.pagesize = pageSize;
            } else {
                $scope.queryParams.pageno = 1;
            }

            alarmFactory.sdsAlarmList($scope.queryParams, function (response) {
                if (response.success) {
                    $scope.alarmList = response.data.results;
                    $scope.resolveIndex.length = 0;
                    $scope.allIsChecked = false;
                    $scope.page = {
                        pageSize: response.data.pagesize || $scope.queryParams.pagesize,
                        currentPage: $scope.queryParams.pageno,
                        totalCount: response.data.totalCount
                    };
                }
            });
        };

        /**
         * 显示手工模板
         */
        $scope.showHandworkModal = function () {
            if (!$scope.resolveIndex.length) {
                $scope.showDialog("请至少选择一项!");
                return;
            }
            for (var i=0;i<$scope.resolveIndex.length;++i){
                if ($scope.resolveIndex[i].indexOf('LicenseDue') != -1){
                    $("#handworkModal").modal("hide");
                    $scope.showDialog("许可证相关告警仅能通过输入License修复");
                }
                return;
            }
            $scope.remark = "";
            $("#handworkModal").modal("show");
        };

        /**
         * 手工清除
         * @return {[type]} [description]
         */
        $scope.resolveAlarm = function() {
            if (!$scope.resolveIndex.length) {
                $scope.showDialog("请至少选择一项!");
                return;
            }

            alarmFactory.sdsAlarmResolve({
                resolveIndex: $scope.resolveIndex,
                remark: $scope.remark,
                operater: "admin"
            }, function(response) {
                if (response.success) {
                    $scope.getAlarmList();
                    $scope.showDialog("手工清除成功！");
                } else {
                    $scope.showDialog(response.message);
                }
            });
            $("#handworkModal").modal("hide");
        };

        /**
         * 查看修复详情
         */
        $scope.repairDetails = function (alarm) {
            if (alarm.resolved != 1) {
                return;
            }
            $scope.alarmRepair = {
                resolveTime: alarm.resolveTime,
                operater: alarm.operater,
                remark: alarm.remark
            };
            $('#showRepairDetails').modal('show');
        };

        /**
         * 获取事件列表
         */
        $scope.getEventList = function (pageSize, goPage) {
            if (pageSize && goPage) {
                $scope.eventQueryParams.pageno = goPage;
                $scope.eventQueryParams.pagesize = pageSize;
            } else {
                $scope.eventQueryParams.pageno = 1;
            }
            eventFactory.sdsEventList($scope.eventQueryParams, function (response) {
                if (response.success) {
                    $scope.eventList = response.data.results;
                    $scope.eventPage = {
                        pageSize: response.data.pagesize || $scope.eventQueryParams.pagesize,
                        currentPage: $scope.eventQueryParams.pageno,
                        totalCount: response.data.totalCount
                    };
                }
            });
        };

        /**
         * 获取日志列表
         */
        $scope.getLogList = function () {
            $scope.creating = true;
            $scope.getLogListLoop();
        };
        $scope.getLogListLoop = function () {
            if(false == $scope.creating){
                if($scope.creatingTimeout){
                    clearTimeout($scope.creatingTimeout);
                }
            } else {
                $scope.getLogListRemote();
                if($scope.creatingTimeout){
                    clearTimeout($scope.creatingTimeout);
                }
                $scope.creatingTimeout = setTimeout(function(){
                    $scope.getLogListLoop();
                }, 5000);
            }
        };
        $scope.getLogListRemote = function () {
            alarmFactory.sdsClusterLog(function (res) {
                if (res.success) {
                    $scope.logList = res.data.sort(byParam('hostid', 'str'));
                    $scope.allLogIsChecked = false;
                    $scope.selectedHostList = [];
                    var creating = false;
                    angular.forEach($scope.logList, function(obj,index) {
                        if (obj.status == "creating"){
                            creating = true;
                        };
                    });
                    if (creating == false){
                        $scope.creating = false;
                    } else {
                        $scope.creating = true;
                    }
                }
            });
        };

        /**
         * 收集日志
         */
        $scope.goCreateLog = function () {
            if ($scope.selectedHostList.length === 0) {
                $scope.showDialog("请选择主机！");
                return;
            }
            $scope.logTime = "onemonth";
            $scope.logModule = "all";
            $('#createLog').modal('show');
        };
        $scope.collectLog = function() {
            $('#createLog').modal('hide');
            angular.forEach($scope.logList, function(log) {
                if (log.$checked) {
                    log.$proccessing = true;
                } else {
                    log.$proccessing = false;
                }
            });
            alarmFactory.createSdsClusterLog({"hostList": $scope.selectedHostList, "time": $scope.logTime, "module": $scope.logModule}, function (resp) {
                if (resp.success) {
                    $scope.getLogList();
                    $scope.setSuccNoticeMsg("日志收集请求发送成功！");
                } else {
                    $scope.showDialog(resp.message);
                }
            });
        };

        /**
         * 清除日志
         */
        $scope.deleteLog = function () {
            $('#deleteLog').modal('hide');
            alarmFactory.deleteSdsClusterLog({"hostList": $scope.selectedHostList}, function (resp) {
                if (resp.success) {
                    $scope.getLogList();
                    $scope.setSuccNoticeMsg("清除成功！");
                } else {
                    $scope.showDialog(resp.message);
                }
            });
        };
        $scope.goDeleteLog = function () {
            if ($scope.selectedHostList.length === 0) {
                $scope.showDialog("请选择要清除的日志！");
                return;
            }
            $("#deleteLog").modal('show');
        };
        $scope.downloadLog = function(ip) {
            alarmFactory.downloadSdsLog({"ip":ip}, function(content){
                if(content.success != 1){
                    $scope.showDialog("获取日志失败");
                    return;
                }
                window.location.href=content.data;
            });
        };

        /**
         * 全选
         */
        $scope.resolveIndex = [];
        $scope.checkedAll = function () {
            $scope.allIsChecked = !$scope.allIsChecked;
            $scope.resolveIndex.length = 0;
            angular.forEach($scope.alarmList, function (alarm) {
                if (alarm.resolved != 1 && alarm.confirmed != 1) {
                    alarm.$checked = $scope.allIsChecked;
                    if (alarm.$checked){
                        $scope.resolveIndex.push(alarm.index);
                    }   
                }
            });
        };
        $scope.checked = function (alarm) {
            // 系统自动修改/已手工清除的告警，不可以勾选进行手工清除。 
            if (alarm.resolved == '1' || alarm.confirmed == '1') {
                return;
            }

            alarm.$checked = !alarm.$checked;
            if (alarm.$checked) {
                alarm.object
                $scope.resolveIndex.push(alarm.index);
            } else {
                angular.forEach($scope.resolveIndex, function (id, index) {
                    if (id == alarm.index) {
                        $scope.resolveIndex.splice(index, 1);
                    }
                })
            }
            $scope.allIsChecked = ($scope.resolveIndex.length > 0 && $scope.resolveIndex.length == $scope.alarmList.length) ? true : false;
        };

        /**
         * 日志 (多选)
         */
        $scope.selectedHostList = [];
        $scope.checkedAllLog = function () {
            $scope.allLogIsChecked = !$scope.allLogIsChecked;
            $scope.selectedHostList.length = 0;
            angular.forEach($scope.logList, function(log) {
                if ($scope.allLogIsChecked) {
                    log.$checked = true;
                    $scope.selectedHostList.push({hostid: log.hostid, ipaddr: log.ipaddr});
                } else {
                    log.$checked = false;
                }
            });
        };
        $scope.checkedLog = function (log) {
            log.$checked = !log.$checked;
            $scope.selectedHostList.length = 0;
            angular.forEach($scope.logList, function(log) {
                if (log.$checked) {
                    $scope.selectedHostList.push({hostid: log.hostid, ipaddr: log.ipaddr});
                }
            });
            if ($scope.selectedHostList.length === $scope.logList.length) {
                $scope.allLogIsChecked = true;
            } else {
                $scope.allLogIsChecked = false;
            }
        };

        /**
         * 级别 的颜色改变
         */
        $scope.alarmSevColor = function (value) {
            if (value !== undefined) {
                switch (value.toUpperCase()) {
                    case 'WARNING':
                        return '#FFB400';
                    case 'CRITICAL':
                        return '#F60510';
                    case 'INFO':
                        return '#ACB3BE';
                    default:
                        return 'white';
                }
            }
        };

        /**
         * 状态 的颜色改变
         */
        $scope.alarmStateColor = function (value) {
            if (value !== undefined) {
                switch (value) {
                    case 0:
                        return '#F60510';
                    case 1:
                        return '#27a555';
                    default:
                        return 'white';
                }
            }
        };

    }]);
