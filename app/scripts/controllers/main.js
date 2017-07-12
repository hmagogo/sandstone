'use strict';

/**
 * @ngdoc function
 * @name sdsomwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sdsomwebApp
 */
sdsomwebApp.controller('MainCtrl', ['$scope', '$state', 'Restangular', 'mainFactory', 'nodeFactory',
    function ($scope, $state, Restangular, mainFactory, nodeFactory) {
        $scope.systemMode = {};
        $scope.systemMode.isNormal = true;
        $scope.systemConfig = {};
        $scope.systemConfig.isISCSIEnable = true;
        $scope.gAlarm = {
            'risk': '低',
            'unresume': {
                critical: 0,
                warning: 0,
                info: 0
            }
        };

        $scope.last_upgradeNodes = null;
        $scope.updateAuthDone = true;
        $scope.editAccredit = true;
        
        // Analysis 页面公共变量
        $scope.gAnalysis = {};
        $scope.gAnalysis.time = '-1h';
        $scope.gAnalysis.items = [
            {
                name:'系统IOPS',
                id: 'cluster__pool__all__IOPS',
                targets: ['sds.cluster.*.pool.all.sds_read', 'sds.cluster.*.pool.all.sds_write'],
                chartNames: ['read', 'write'],
                unitSize: 1000,
                show: true
            },
            {
                name:'系统MBPS(B/s)',
                id: 'cluster__pool__all__MBPS',
                targets: ['sds.cluster.*.pool.all.sds_read_b', 'sds.cluster.*.pool.all.sds_write_b'],
                chartNames: ['read', 'write'],
                unitSize: 1024,
                show: true
            },
            {
                name:'系统时延(ms)',
                id: 'cluster__pool__all__LATENCY',
                targets: ['sds.cluster.*.pool.all.sds_read_latency', 'sds.cluster.*.pool.all.sds_write_latency'],
                chartNames: ['read', 'write'],
                unitSize: 1000,
                show: true
            }
        ];

        $scope.gMainStateRouteView = {current: 'main.container.container_view'};

        //ip正则
        var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
        var FULL_IP_REGEXP = /^(255\.){3}255$/;
        // 以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
        var PASSWORD_REGEXP = /^[a-zA-Z]([a-zA-Z0-9_]){5,17}$/;

        //菜单激活样式
        $scope.activeMenuStyle = function () {
            $('#navbar-header2 li').click(function (event) {
                var $this = $(this);
                if (!$this.hasClass('.active')) {
                    $this.addClass('active').siblings().removeClass('active');
                }
            });
        };

        //激活某一项的菜单样式，备用方案
        $scope.selectMenu = function (index) {
            var activeMenu = $('#navbar-header2 .active');
            activeMenu.removeClass('active');
            $('#navbar-header2 li').eq(index - 1).addClass('active');
        };

        $scope.initNProgress = function () {
            NProgress.configure({ minimum: 0.2 });
            NProgress.configure({ ease: 'ease', speed: 1000, showSpinner: false});
        };

        $scope.init = function () {
            $scope.initHeight();
            $scope.initNProgress();
            $scope.licenseCheck2();
            $scope.disk = {};
            $scope.snmp = {'enable': 2};
            $scope.uName =  urlConfig.get("userName");
            //用户
            if ($scope.uName){
                addCookie("userName", $scope.uName, 0);
            } else {
                $scope.uName = getCookie("userName");
            }

            if (typeof($scope.uName) == "undefined") {
                $state.transitionTo("login");
                return;
            }
            $scope.refreshAlarm();
            $scope.licenseCheckComplete = false;
            $scope.licenseCheckNum = 0;
            $scope.licenseCheckProgress = null;

            //定时器设置
            $scope.checkSystemModeCount = 0;
            $scope.lastIntervalCheckStartTime = Date.parse(new Date());
            $scope.lastIntervalCheckFinishTime = $scope.lastIntervalCheckStartTime;

            $scope.refreshSystemMode();
			$scope.getIscsiSystemConfig();

            $scope.queryDiskReplaceMode();

            mainFactory.queryAllConfrim(function(datas){
                if( 1 === datas.success ){
                    $scope.confirm = datas.data;
                } else {
                    $scope.confirm = {
                        critical:'0',
                        warning:'0',
                        info:'0'
                    };
                }
            });

            //查询当前版本
            mainFactory.getVersion(function (res) {
                if (res.success) {
                    if (res.data.version != ""){
                        $scope.version = "V" + res.data.version;
                        if (res.data.upgrader_version != ""){
                            $scope.newVersion = "V" + res.data.upgrader_version;
                    }else{
                            $scope.newVersion = ""
                        }
                    }else{
                        $scope.version = '版本未知';
                    }
                }else{
                    $scope.version = '版本未知';
                }

            });
            //这里需要用系统容量替代license查询容量，因为license查询到的容量和系统容量有出入
            mainFactory.queryCapacity(function (datas){
                if (1 === datas.success) {
                    $scope.used_capacity = datas.data.capacity_bytes;
                }
            });

            //查询邮件联系人
            mainFactory.querySysEmail(function (res) {
                if (res.success) {
                    $scope.emailList = res.data;
                }
            });

            //查询邮件服务状态
            mainFactory.queryEmailService(function (res) {
                if (res.success) {
                    $scope.esEnabled = res.data.enabled;
                }
            });
        };

        $scope.refreshAlarm = function () {
            mainFactory.queryAllConfrim(function (datas) {
                if (1 === datas.success) {
                    $scope.gAlarm.unresume = datas.data;
                    if ($scope.gAlarm.unresume.warning != 0) {
                        $scope.gAlarm.risk = '中';
                    }
                    if ($scope.gAlarm.unresume.critical != 0 || !$scope.systemMode.isNormal) {
                        $scope.gAlarm.risk = '高';
                    }
                };
                $scope.lastIntervalCheckFinishTime = Date.parse(new Date());
            });
        };

        $scope.queryDiskReplaceMode = function() {
            mainFactory.queryDiskReplaceMode(function (res) {
                if (res.success) {
                    $scope.disk.replaceModeSet = res.data.diskReplaceMode;
                    $scope.disk.replaceMode = res.data.diskReplaceMode;
                }
            });
        };

        // Get system config
        $scope.getIscsiSystemConfig = function(){
            NProgress.start();
            mainFactory.getIscsiSystemConf(function(datas){
                if(1===datas.success){
                    if (datas.data.iSCSIEnable == 1) {
                        $scope.systemConfig.isISCSIEnable = true;
                    } else {
                        $scope.systemConfig.isISCSIEnable = false;
                    }
                } else {
					$scope.systemConfig.isISCSIEnable = true;
					var getSystemConfigTimeoutId = setTimeout(function() {
						$scope.getIscsiSystemConfig()
					}, 3000);
                }
				NProgress.done();
            });
        };

        //注销
        $scope.logout = function () {
            $('#logoutModal').modal('hide');
            var param = {};
            NProgress.start();
            var logoutTimeoutId = setTimeout(function() {
                mainFactory.logout(param, function (responseData) {
                    delCookie('userName');
                    urlConfig.remove('userName');
                    if ($scope.mainTimeTicker) {
                        clearInterval($scope.mainTimeTicker);
                    }
                    $state.transitionTo('login');
                    NProgress.done();
                });
            },700);
        };

        function addCookie(objName, objValue, objHours){//添加cookie
            var str = objName + "=" + escape(objValue);
            if (objHours > 0) {     //为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours*3600*1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            document.cookie = str;
        }

        function getCookie(objName){//获取指定名称的cookie的值
            var arrStr = document.cookie.split("; ");
            for(var i = 0;i < arrStr.length;i ++){
                var temp = arrStr[i].split("=");
                if(temp[0] == objName) return unescape(temp[1]);
            }
        }

        //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
        function delCookie(name) {
            var date = new Date();
            date.setTime(date.getTime() - 365 * 24 * 3600 * 1000);
            document.cookie = name + '=a; expires=' + date.toGMTString();
        }

        //退出
        $scope.showLogout = function () {
            $('#logoutModal').modal('show');
        };

        //修改密码
        $scope.showModify = function () {
            $('#modifyPwModal').modal('show');
        };

        // 关于
        $scope.showAbout = function () {
            $('#aboutModal').modal('show');
        };

        //修改密码
        $scope.changePassword = function () {
            if (!$scope.oldPassword) {
                $scope.showTipMsg('原始密码不得为空！', 'oldPassword');
            } else if (!$scope.newPassword) {
                $scope.showTipMsg('新密码不得为空', 'newPassword');
            } else if ($scope.newPassword != $scope.newPassword2) {
                $scope.showTipMsg('两次输入密码不相同，请重新输入', 'newPassword2');
            } else if ($scope.newPassword == $scope.oldPassword) {
                $scope.showTipMsg('新密码不得和原始密码相同', 'newPassword');
            } else if (!PASSWORD_REGEXP.test($scope.newPassword)) {
                $scope.showTipMsg('密码应以字母开头，长度在6-18之间，只能包含字母、数字或下划线！', 'newPassword');
            } else {
                mainFactory.updatePassword({
                    oldPassword: $scope.oldPassword,
                    newPassword: $scope.newPassword
                }, function (resData) {
                    if (1 == resData.success) {
                        $('#modifyPwModal').modal('hide');
                        //$scope.showDialog('修改成功');
                        $scope.logout();
                    } else {
                        //$scope.showDialog('修改失败');
                        $('#modifyPwModal').modal('hide');
                    }
                });
            }
        };

        // Check emergence mode
        $scope.refreshSystemMode = function () {
            mainFactory.querySdsomDbMode(function (datas) {
                if (1 === datas.success) {
                    if ('emergency' == datas.data.dbmode) {
                        $scope.systemMode.isNormal = false;
                    } else {
                        $scope.systemMode.isNormal = true;
                    }
                } else {
                    $scope.systemMode.isNormal = true;
                }
            });
        };
        $scope.tipLicenseInfo = function (responseData){
            $scope.licenseCheckNum++;
            if (responseData.success == 1) {
                var trialVersion = false;
                var licenseData = responseData.data.license_data;
                if (licenseData.length > 0) {
                    $scope.licenseCheckComplete = true;
                    var minData = licenseData[0].expiredtime;
                    for (var i = 0; i < licenseData.length; i++) {
                        if (licenseData[i].license === '') {
                            trialVersion = true;
                        }
                        if (licenseData[i].expiredtime < minData) {
                            minData = licenseData[i].expiredtime;
                        }
                    }
                    if (minData === 0) {
                        var obj;
                        if (trialVersion) {
                            $scope.licenseInfo = '试用许可证已失效！';
                            obj = document.getElementById('licenseInfo');
                            obj.style.color = '#ef595a';
                        } else {
                            $scope.licenseInfo = '商用许可证已失效！';
                            obj = document.getElementById('licenseInfo');
                            obj.style.color = '#ef595a';
                        }
                        return;
                    }
                    var subtract = Math.floor((minData) / (60 * 60 * 24));
                    if (0 < subtract && subtract <= 90) {
                        if (trialVersion) {
                            $scope.licenseInfo = '您正在使用试用许可证，还有' + subtract + '天失效！';
                            console.log($scope.licenseInfo);
                        } else {
                            $scope.licenseInfo = '您正在使用商用许可证，还有' + subtract + '天失效！';
                        }
                    } else if (subtract === 0) {
                        subtract = Math.floor((minData) / (60 * 60));
                        if (trialVersion) {
                            $scope.licenseInfo = '您正在使用试用许可证，还有' + subtract + '小时失效！';
                        } else {
                            $scope.licenseInfo = '您正在使用商用许可证，还有' + subtract + '小时失效！';
                        }
                    } else {
                        $scope.licenseInfo = '';
                    }
                }
            } else {
                $scope.licenseInfo = '';
            }
        }
        //授权检测1
        $scope.licenseCheck1 = function () {
            NProgress.start();
            mainFactory.queryAllLicense($scope.tipLicenseInfo);
            NProgress.done();
        };

        //授权检测2
        $scope.licenseCheck2 = function () {
            if ($scope.licenseCheckProgress) {
                clearTimeout($scope.licenseCheckProgress);
            }
            if (!$scope.licenseCheckComplete) {
                if ($scope.licenseCheckNum >= 3) {
                    $scope.licenseInfo = 'License查询失败！';
                } else {
                    $scope.licenseCheck1();
                    $scope.licenseCheckProgress = setTimeout(function () {
                        $scope.licenseCheck2();
                    }, 5000);
                }
            }

        };

        $scope.mainTimeTicker = null;
        if ($scope.mainTimeTicker) {
            clearInterval($scope.mainTimeTicker);
        }
        $scope.checkSystemModeCount = 0;
        $scope.lastIntervalCheckStartTime = Date.parse(new Date());
        $scope.lastIntervalCheckFinishTime = $scope.lastIntervalCheckStartTime;
        $scope.mainTimeTicker = setInterval(function () {
            var milliseconds = Date.parse(new Date());
            if ($scope.lastIntervalCheckStartTime <= $scope.lastIntervalCheckFinishTime &&
                $scope.lastIntervalCheckFinishTime + 15000 < milliseconds) {
                $scope.lastIntervalCheckStartTime = Date.parse(new Date());
                $scope.refreshAlarm();
            }
            $scope.checkSystemModeCount += 1;
            if ($scope.checkSystemModeCount >= 1) {
                $scope.checkSystemModeCount = 0;
                $scope.refreshSystemMode();
            }
        }, 10000);

        //授权信息管理
        $scope.licenseQueryLicenseBoxShow = function (type) {
            NProgress.start();
            mainFactory.queryAllLicense(function(responseData){
                if (responseData.success == 1 && responseData.data.license_data.length > 0) {
                    $scope.licenseList = responseData.data.license_data;
                    $scope.used_capacity = responseData.data.used_capacity;
                    $scope.authorized_capacity = responseData.data.authorized_capacity;
                    if(type == 'Alarm'){
                        $scope.licenseAlarmBoxCheck();
                    }
                    if(type == 'Detail'){
                        $scope.licenseDetailBoxShow();
                    }
                } else{
                    $scope.licenseList = null;
                    $scope.used_capacity = null;
                    $scope.authorized_capacity = null;
                }
            });
            NProgress.done();
        };

        //更新授权
        $scope.updateLicense = function(){
            var param = {
                'hostid': $scope.licenseDetail.hostid,
                'license': $scope.newLicense
            };
            NProgress.start();
            $scope.isAdd = true;
            mainFactory.updateLicense(param,function(responseData){
                if(responseData.success == 1){
                    //更新授权成功
                    $scope.licenseErrorMsg = '';
                    $scope.closeLicenseDetail();
                }else{
                    //更新授权失败
                    $scope.licenseErrorMsg = responseData.message;
                }
                NProgress.done();
                $scope.isAdd = false;
                $scope.editAccredit = true;
            });
        };

        $scope.licenseAlarmBoxCheck = function(){
            var license_length = $scope.licenseList.length;
            var register_status = false;
            var show_alarm_windows = 0;
            if (license_length === 0) {
                return;
            }
            if ($scope.licenseList[0].license === '') {
                register_status = false;
            } else{
                register_status = true;
            }
            for(var i = 0; i < license_length; i++){
                if (register_status) {
                    if($scope.licenseList[i].license === ''){
                        show_alarm_windows = 1;
                    }
                } else {
                    if($scope.licenseList[i].license !== ''){
                        show_alarm_windows = 1;
                    }
                }
            }
            if(show_alarm_windows == 1) {
                $('#license_register_alarm').modal({backdrop: 'static', keyboard: false});
                $('#license_register_alarm').modal('show');
            }
            if(show_alarm_windows == 0){
                $scope.licenseDetailBoxShow();
            }
        };

        $scope.licenseDetailBoxShow = function(){
            $('#licenseMode').modal({backdrop: 'static', keyboard: false});
            $('#licenseMode').modal('show');
        };

        //显示节点授权详情
        $scope.showLicenseDetail = function (detail) {
            //day
            $scope.licenseDetail = detail;
            var day = (detail.expiredtime) / (60 * 60 * 24);
            if(day > 365){
                $scope.expiredtime_str = Math.floor(day / 365) + '年 ' + Math.floor(day%365) + '天';
            }else if(1 < day && day <= 365){
                $scope.expiredtime_str = Math.floor(day) + '天 ' + Math.floor(day%1*24) + '小时';
            }else if(0 < day && day <= 1){
                //minute
                var minute = day * 24 * 60;
                if(60 < minute){
                    $scope.expiredtime_str = Math.floor(minute / 60) + '小时 ' + Math.floor(minute%60) + '分钟';
                }else{
                    $scope.expiredtime_str = Math.floor(minute) + '分钟';
                }
            }else if(day === 0){
                $scope.expiredtime_str = '已失效';
            }else{
                $scope.expiredtime_str = '异常';
            }
            $scope.newLicense = detail.license;
            $scope.licenseErrorMsg = '';
            $('#licenseMode').modal('hide');
            $('#licenseDetail').modal({backdrop: 'static', keyboard: false});
            $('#licenseDetail').modal('show');
        };

        $scope.closeLicenseBoxCheck = function () {
            var license_length = $scope.licenseList.length;
            var register_status = false;
            //show_alarm_windows 0 代表不需要show license_register_alarm box
            var show_alarm_windows = 0;
            if(license_length === 0){
                return;
            }
            if($scope.licenseList[0].license === ''){
                register_status = false;
            }
            else{
                register_status = true;
            }
            for(var i = 0;i < license_length; i++){
                if (register_status){
                    if ($scope.licenseList[i].license === '') {
                        show_alarm_windows = 1;
                    }
                }
                else{
                    if ($scope.licenseList[i].license !== '') {
                        show_alarm_windows = 1;
                    }
                }
            }
            if(show_alarm_windows == 1){
                $('#license_register_alarm').modal({backdrop: 'static', keyboard: false});
                $('#license_register_alarm').modal('show');
                $('#licenseMode').modal('hide');
            }
            else if(show_alarm_windows === 0){
                $('#licenseMode').modal('hide');
            }
        };

        //关闭授权详情页面
        $scope.closeLicenseDetail = function(){
            $('#licenseDetail').modal('hide');
            $scope.editAccredit = true;
            $scope.licenseQueryLicenseBoxShow('Detail');
        };


        $scope.licenseList = null;
        $scope.used_capacity = null;
        $scope.authorized_capacity = null;
        //授权信息管理
        $scope.licenseQueryLicenseBoxShow = function(type){
            //Alarm
            //Detail
            NProgress.start();
            mainFactory.queryAllLicense(function(responseData){
                $scope.tipLicenseInfo(responseData)
                if(responseData.success == 1 && responseData.data.license_data.length > 0){
                    $scope.licenseList = responseData.data.license_data;
                    //这里需要用系统容量替代license查询容量，因为license查询到的容量和系统容量有出入
                    //$scope.used_capacity = responseData.data.used_capacity;
                    $scope.authorized_capacity = responseData.data.authorized_capacity;
                    if(type == 'Alarm'){
                        $scope.licenseAlarmBoxCheck();
                    }
                    if(type == 'Detail'){
                        $scope.licenseDetailBoxShow();
                    }
                }
                else{
                    $scope.licenseList = null;
                    //$scope.used_capacity = null;
                    $scope.authorized_capacity = null;
                }
            });
            NProgress.done();
        };

        // 配置NTP Server
        $scope.showNtpSet = function () {
            $scope.serverName = null;
            $scope.queryServer();
            $('#dNtpSet').modal('show');
        };

        //显示modal
        $scope.showModal = function (modelName,obj) {
            $scope.tempObj = obj;
            $('#' + modelName).modal('show');
        };

        //配置NTP server取消时，隐藏删除div
        $scope.hideDelDiv = function () {
            $('#deleteNtp').modal('hide');
        };

        //删除server
        $scope.delServer = function ( ntpServer) {
            $('#deleteNtp').modal('hide');
            angular.forEach($scope.serverList, function (server,index) {
                if(server.id == ntpServer.id){
                    $scope.serverList.splice(index, 1);
                }
            });
            NProgress.start();
            mainFactory.delServer({'id':ntpServer.id},function(response){
                if(!response.success) {
                    $scope.setFailNoticeMsg('时间服务器删除失败');
                }else{
                    $scope.setSuccNoticeMsg('时间服务器删除成功');
                }
                NProgress.done();
            });
        };

        //查询server
        $scope.queryServer = function () {
            mainFactory.queryServer(function(response){
                $scope.serverList = response.data;
            });
        };

        //新增server
        $scope.addServer = function () {
            if(!$scope.serverName){
                $scope.showTipMsg('NTP Server 不能为空', 'serverName');
                //需要改成Tip
                return;
            }
            if (!IP_REGEXP.test($scope.serverName)) {
                $scope.showTipMsg('时间服务器IP不合法！','serverName');
                return;
            }
            if (ZERO_IP_REGEXP.test($scope.serverName) || FULL_IP_REGEXP.test($scope.serverName)) {
                $scope.showTipMsg('时间服务器IP不合法！','serverName');
                return;
            }

            NProgress.start();
            $scope.isAdd = true;
            mainFactory.addServer({'servername':$scope.serverName}, function (response){
                if (response.success) {
                    $scope.setSuccNoticeMsg('时间服务器添加成功');
                    $scope.serverName = "";
                    $scope.queryServer();
                } else {
                    $scope.setFailNoticeMsg('时间服务器添加失败');
                }
                $scope.isAdd = false;
                NProgress.done();
            });
        };

        //配置恢复流量模型
        $scope.getRecoverConfig = function () {
            mainFactory.getRecoverConfig(function (res) {
                if(res.success){
                    var configMode = res.data.configMode;
                    switch(configMode){
                        case "businessFirst":
                            $scope.recoverConfigOption = "0";
                            $scope.currentRecoverConfig = "低";
                            break;
                        case "recoveryFirst":
                            $scope.recoverConfigOption = "1";
                            $scope.currentRecoverConfig = "高";
                            break;
                    }
                } else {
                    $scope.setClusterErrMsg("数据重构QoS控制配置失败");
                }
                $scope.recoverConfigOptionOld = $scope.recoverConfigOption
            });
        }

        $scope.recover_disable = false
        $scope.recover_setting = function(status){
            $scope.recover_disable = !$scope.recover_disable;
            if (status == 0){
                $scope.recoverConfigOption = $scope.recoverConfigOptionOld
            }
        }
        $scope.updateRecoverConfig = function () {
            var config = "";
            switch($scope.recoverConfigOption){
                case "0":
                    config = "businessFirst"; //low recover speed
                    break;
                case "1":
                    config = "recoveryFirst"; //high recover speed
                    break;
                };
            mainFactory.updateRecoverConfig({"configMode":config}, function (res) {
                if (!res.success){
                    $scope.setClusterErrMsg("数据重构QoS控制配置失败");
                }
                else{
                    $scope.recoverConfigOptionOld = $scope.recoverConfigOption
                    $scope.setSuccNoticeMsg('设置成功');
                }
            });
        }

        $scope.rebalance_disabled = false;
        $scope.rebalance_setting = function (status) {
            $scope.rebalance_disabled = !$scope.rebalance_disabled;
            if (status == 0){
                $scope.rebalanceTimeNow = $scope.rebalanceTimeNowOld;
            }
        };

        $scope.updateDiskReplaceMode = function () {
            var data = { 'diskReplaceMode' : $scope.disk.replaceMode };
            NProgress.start();
            mainFactory.updateDiskReplaceMode( data, function(res){
                $('#diskReplaceMode').modal('hide');
                if (res.success) {
                    $scope.setSuccNoticeMsg('设置成功');
                } else {
                    $scope.setFailNoticeMsg('设置失败');
                }
                $scope.queryDiskReplaceMode();
            });
            NProgress.done();
        };

        $scope.updateRebalance = function () {
            var time = 0;
            switch ($scope.rebalanceTimeOption) {
                case '0':
                    time = $scope.rebalanceTimeNow * 24 * 60 * 60;
                    break;
                case '1':
                    time = $scope.rebalanceTimeNow * 60 * 60;
                    break;
                case '2':
                    time = $scope.rebalanceTimeNow * 60;
                    break;
            }
            mainFactory.updateRebalance({'rebalance_time':time}, function (res) {
                $scope.rebalance_disabled = false;
                if (!res.success){
                    $scope.setClusterErrMsg("重建启动延时配置失败");
                }else{
                    $scope.rebalanceTimeNowOld = $scope.rebalanceTimeNow;
                    $scope.setSuccNoticeMsg('设置成功');
                }

            });
        };

        $scope.showDiskReplceSet = function(){
            $('#diskReplaceMode').modal('show');
        };
        $scope.cluster_edit_disable = false
        $scope.showEditCluster = function(){
            $scope.cluster_edit_disable = true

        };
        $scope.hideEditCluster = function(){
            $scope.cluster_edit_disable = false
        };
        // 集群参数配置
        $scope.showClusterParamentSet = function(){
            $scope.getRebalance();
            $scope.getScrub();
            $scope.getRecoverConfig();
            $scope.getThinAssignSetting();

            var scrubTimeList = new Array();
            for (var i=0; i<=24; i++)
            {
                if (i<10){
                    scrubTimeList[i] = '0' + i.toString() + ':00'
                }
                else{
                    scrubTimeList[i] = i.toString() + ':00'
                }
            }
            $scope.scrubTimeList = scrubTimeList
            $('#clusterParament').modal('show');
        };

        $scope.setClusterParaDisabled = function(){
            $scope.scrub_disabled = false;
            $scope.rebalance_disabled = false;
            $scope.recover_disable = false;
        }

        // AK/SK
        $scope.showAuthConfig = function(){
	    $scope.authInfo = "";
            mainFactory.getRestApi(function(res){
                if(res.success){
                    $scope.RestApi = res.data;
                }
            });
            $('#authConfigMode').modal('show');
        }
        $scope.sureUpdateAkSk = function(){
            $('#sureAuth').modal('show');
            $('#authConfigMode').modal('hide');
        }
        $scope.updateAuth = function(){
            $('#sureAuth').modal('hide');
            $('#authConfigMode').modal('show');
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

            $scope.tempRestApi = $scope.RestApi;
            $scope.RestApi.access_key = '------------------------------------------------------------';
            $scope.RestApi.secret_key = '------------------------------------------------------------';
            $scope.updateAuthDone = false;
            NProgress.start();
            mainFactory.updateRestApi(function(res){
                if(res.success){
                    $scope.RestApi = res.data;
                    $scope.authInfo = "";
                }else{
                    $scope.RestApi = $scope.tempRestApi;
                    $scope.authInfo = "failed to reset accesskey/secretkey";
                }
                $scope.updateAuthDone = true;
            });
            NProgress.done();
        }
        // SNMP show
        $scope.showSnmpConfig = function(){
            mainFactory.getSnmp(function (res) {
                if(res.success) {
                    $scope.snmp = res.data;
                }
            });
            $('#snmpConfigMode').modal('show');
        };

        // SNMP update
        $scope.updateSnmpConfig = function(){
            var snmpConfig = {'enable': $scope.snmp.enable,
                'version': $scope.snmp.version,
                'agent_host': $scope.snmp.agent_host,
                'community': $scope.snmp.community,
                'function_list': ['alarm']
            };
            if (!IP_REGEXP.test($scope.snmp.agent_host)) {
                $scope.showTipMsg('IP地址不合法！','snmp.agent_host');
                return;
            }
            if (ZERO_IP_REGEXP.test($scope.snmp.agent_host) || FULL_IP_REGEXP.test($scope.snmp.agent_host)) {
                $scope.showTipMsg('IP地址不合法！','snmp.agent_host');
                return;
            }
            mainFactory.updateSnmp(snmpConfig, function (res){
                if (res.success){
                    $scope.noticeMessage = "SNMP配置更新成功";
                }else {
                    $scope.noticeMessage = "SNMP配置更新失败"
                }
            });
            $('#snmpConfigMode').modal('hide');
        };

        $scope.showLicense_tip = function(){
            $('#license_register_alarm').modal('hide');
            $('#licenseMode').modal({backdrop: 'static', keyboard: false});
            $('#licenseMode').modal('show');
        };

        //配置rebalance时间
        $scope.rebalanceTimeNow = 48;
        $scope.rebalanceTimeOption = '1';
        $scope.getRebalance = function () {
            mainFactory.getRebalance(function (res) {
                if(res.success){
                    $scope.rebalanceTimeNow = res.data.mon_osd_down_out_interval;
                    if ($scope.rebalanceTimeNow > 0 && $scope.rebalanceTimeNow < 60){
                        $scope.rebalanceTimeNow = 1;
                        $scope.rebalanceTimeOption = '2';
                    }
                    else if($scope.rebalanceTimeNow >= 60 && $scope.rebalanceTimeNow < 60 * 60){
                        $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / 60;
                        $scope.rebalanceTimeOption = '2';
                    }
                    else if($scope.rebalanceTimeNow >= 60 * 60 && $scope.rebalanceTimeNow < 60 * 60 * 24){
                        $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / (60 * 60);
                        $scope.rebalanceTimeOption = '1';
                    }
                    else if($scope.rebalanceTimeNow >= 60 * 60 * 24){
                        $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / (60 * 60 * 24);
                        $scope.rebalanceTimeOption = '0';
                    }
                    $scope.rebalanceTimeNowOld = $scope.rebalanceTimeNow
                }
            });
        };

        // 配置scrub时间
        $scope.getScrub = function(){
            mainFactory.getScrub(function (res){
                $scope.data = {osdScrubBeginHour: $scope.changeTimeType(res.data.scrub_begin_hour),
                              osdScrubEndHour: $scope.changeTimeType(res.data.scrub_end_hour)};
                $scope.osdScrubBeginHourOld = $scope.data.osdScrubBeginHour;
                $scope.osdScrubEndHourOld = $scope.data.osdScrubEndHour;
            });
        }
        $scope.changeTimeType = function(time){
            if (isNaN(time)){
                return Number(time.split(":")[0])
            }
            else{
                if (time<10){
                return '0'+ time.toString()+':00'
            }else{
                return time.toString()+':00';
            }
            }
        }
        $scope.getThinAssignSetting = function(){
            mainFactory.getThinAssignSetting(function (res){
                if (res.success){
                    $scope.allowThinAssign = res.data.allow_thin_assign_setting;
                }else{
                    // TODO
                }
            });
        }
        $scope.updateThinAssignSetting = function(){
            var param = {'allow_thin_assign_setting' : $scope.allowThinAssign };
            mainFactory.updateThinAssignSetting(param, function (res) {
                if (res.success) {
                    $scope.setSuccNoticeMsg('设置成功');
                    $scope.thinAssignSettingDisabled = false;
                }else{
                    $scope.setClusterErrMsg("瘦分配设置失败");
                    // TODO
                }
            });
        }
        $scope.thinAssignSettingDisabled = false;
        $scope.thinAssignSetting = function(status) {
            $scope.thinAssignSettingDisabled = !$scope.thinAssignSettingDisabled ;
            if (status == 0){
                //点击取消
                $scope.thinAssignSettingDisabled = false;
                $scope.allowThinAssign = $scope.lastAllowThinAssign;
            }else {
                $scope.lastAllowThinAssign = $scope.allowThinAssign;
            }
        }
        $scope.scrub_disabled = false;
        $scope.scrub_setting = function (status) {
            $scope.scrub_disabled = !$scope.scrub_disabled;
            if (status == 0){
                $scope.data = {osdScrubBeginHour: $scope.osdScrubBeginHourOld,
                               osdScrubEndHour: $scope.osdScrubEndHourOld};
            }
        };

        $scope.updateScrub = function(){
            var scrub_begin_hour = $scope.changeTimeType($scope.data.osdScrubBeginHour);
            var scrub_end_hour = $scope.changeTimeType($scope.data.osdScrubEndHour);
            var data = {'scrub_begin_hour':scrub_begin_hour,
                        'scrub_end_hour': scrub_end_hour};
            mainFactory.updateScrub( data, function(res){
                $scope.scrub_disabled = false;
                if (!res.success){
                    $scope.setClusterErrMsg("一致性检查时间配置失败");
                }else{
                    $scope.osdScrubBeginHourOld = $scope.data.osdScrubBeginHour
                    $scope.osdScrubEndHourOld = $scope.data.osdScrubEndHour
                    $scope.setSuccNoticeMsg('设置成功');
                }
            });
        };

        /**
         * 显示IP输入更新框
         */
        $scope.showEdit = function (server) {
            server.$edit = true;
            server.edit = angular.copy(server.bussinessNetwork);
        };

        /**
         * 关闭IP输入框
         */
        $scope.hideEdit = function (server) {
            server.$edit = false;
        };

        /***************************  提示弹出框  ***************************/

        $scope.queryUpgradeNodeInfo = function(){
            //query nodes info
            $scope.all_node_done = true;
            mainFactory.queryNodeInfo(function (res){
                if (res.success){
                    if ($scope.last_upgradeNodes == null){
                        $scope.upgradeNodes = res.data;
                        $scope.last_upgradeNodes= res.data;
                    }else {
                        for(var i = 0;i < $scope.upgradeNodes.length;i ++){
                            //if(($scope.upgradeNodes[i].update_status.progress == res.data[i].update_status.progress) && ($scope.upgradeNodes[i].update_status.progress == 100) ){
                            if(($scope.upgradeNodes[i].update_status == res.data[i].update_status) && ($scope.upgradeNodes[i].update_status.progress == 100) ){
                                continue;
                            }else{
                                $scope.upgradeNodes[i].update_status = res.data[i].update_status;
                            }
                        }//for
                    }

                    for (var i=0; i<$scope.upgradeNodes.length; ++i){
                        if ($scope.upgradeNodes[i].update_status.action != "IDLE"){
                            if (!$scope.queryNodeInfoTimeTicker) {
                                $scope.queryNodeInfoTimeTicker = setInterval($scope.queryUpgradeNodeInfo, 3000);
                                break;
                            }
                        }
                    }
                    $scope.getNowStatus();
                    mainFactory.getVersion(function (res) {
                        if (res.success) {
                            if (res.data.version != ""){
                                $scope.version = "V" + res.data.version;
                                if (res.data.upgrader_version != ""){
                                    $scope.newVersion = "V" + res.data.upgrader_version;
                                }else{
                                    $scope.newVersion = "版本未知"
                                }
                            }else{
                                $scope.version = '版本未知';
                            }
                        }else{
                            $scope.version = '版本未知';
                        }
                    });

                    if ($scope.upgradeNodes.length != 0){
                        switch ($scope.upgradeNodes[0].action) {
                            case "IDLE":
                                $scope.started = false;
                            case "UPDATE":
                                $scope.started = true;
                            case "ROLLBACK":
                                $scope.rollbacking = true;

                        }
                    }
                }
            });
        };


        $scope.cleanNoticeMessage = function(){
            $scope.noticeMessage = "";
        };

        $scope.getNowStatus = function(){
            mainFactory.getNowStatus(function(res){
                if (res.success){
                    $scope.nowStatus = res.data;
                    if ($scope.nowStatus.completed){
                        if ($scope.queryNodeInfoTimeTicker) {
                            clearTimeout($scope.queryNodeInfoTimeTicker);
                        }
                        $scope.cleanNoticeMessage();
                    }

                }
            });
        };

        $scope.startUpgrade = function (){
            $scope.noticeMessage = "升级请求发送中...请稍后...";
            mainFactory.startUpgrade(function (res){
                if (res.success){
                    $scope.started = true;
                    //set time interval
                    $scope.queryNodeInfoTimeTicker = setInterval($scope.queryUpgradeNodeInfo, 3000);
                    $scope.noticeMessage = "升级请求发送成功！";
                    //setInterval($scope.cleanNoticeMessage, 8000);
                }else
                    $scope.noticeMessage = "升级请求发送失败！";
            });
        };

        $scope.rollbackVersion = function (){
            $scope.noticeMessage = "回滚请求发送中...请稍后...";
            mainFactory.rollbackVersion(function (res){
                if (res.success){
                    $scope.rollbacking = true;
                    $scope.queryNodeInfoTimeTicker = setInterval($scope.queryUpgradeNodeInfo, 3000);
                    $scope.noticeMessage = "回滚请求发送成功！";
                    //setInterval($scope.cleanNoticeMessage, 8000);
                }else
                    $scope.noticeMessage = "回滚请求发送失败！"

            });
        };

        $scope.confirmUpgradeSuccess = function(){
            $('#upgradeOnline').modal('hide');
            $('#upgradeConfirmDialog').modal('show');
        };

        $scope.closeConfirmUpgradeDialog = function(){
            $('#upgradeConfirmDialog').modal('hide');
            $('#upgradeOnline').modal('show');
        };

        $scope.completeUpgradeProject = function(){
            $('#upgradeConfirmDialog').modal('hide');
            $('#upgradeOnline').modal('show');
            $scope.noticeMessage = "确认结束请求发送中...";

            mainFactory.resetUpgradeEnviroment(function (res){
                if (res.success){
                    $scope.queryNodeInfoTimeTicker = setInterval($scope.queryUpgradeNodeInfo, 3000);
                    $scope.noticeMessage = "确认结束请求发送成功！";
                }else
                    $scope.noticeMessage = "确认结束请求发送失败！"

                setInterval($scope.cleanNoticeMessage, 9000);
            });
        };

        $scope.upgradeOnlineShow = function(){
            $scope.queryUpgradeNodeInfo();
            $('#upgradeOnline').modal('show');
        };

        $scope.showDialog = function (msg) {
            $('#AlertInfo').modal('show');
            $scope.DialogInfo = msg;
        };

        $("#upgradePackage").bind("change",function(){
            $scope.upgradeStyle = $('#upgradePackage')[0].files[0].name;
        });

        $scope.upload_package = function() {
            var form_data = new FormData();
            form_data.append("upgradePackage", $('#upgradePackage')[0].files[0]);
            $scope.noticeMessage = "升级包上传中...请稍后...";

            $.ajax({
                url: '/api/v1/sds/cluster/update/package/upload',
                type: 'POST',
                cache: false,
                data: form_data,
                processData: false,
                contentType: false
            }).done(function(res) {
                console.log("done");
                $scope.noticeMessage = "升级包上传成功！";
                //setInterval($scope.cleanNoticeMessage, 5000);
            }).fail(function(res) {
                console.log("fail");
                $scope.noticeMessage = "升级包上传失败！";
                //setInterval($scope.cleanNoticeMessage, 5000);
            });
        };

        $scope.setWaitNoticeMsg = function (val) {
            $scope.succNoticeMsg = val;
            $('#failNoticeMsg').hide();
            $('#succNoticeMsg').show();
        };

        $scope.setSuccNoticeMsg = function (val) {
            $scope.succNoticeMsg = val;
            if ($scope.succTime) {
                clearTimeout($scope.succTime);
            }
            $('#failNoticeMsg').hide();
            $('#succNoticeMsg').show();
            $scope.succTime = setTimeout(function () {
                $scope.succNoticeMsg = '';
                $scope.succTime = null;
                $('#succNoticeMsg').hide();
            }, 5000);
        };

        $scope.setFailNoticeMsg = function (val) {
            $scope.failNoticeMsg = val;
            if ($scope.failTime) {
                clearTimeout($scope.failTime);
            }
            $('#succNoticeMsg').hide();
            $('#failNoticeMsg').show();
            $scope.failTime = setTimeout(function () {
                $scope.failNoticeMsg = '';
                $scope.failTime = null;
                $('#failNoticeMsg').hide();
            }, 5000);
        };

        // 初始化页面高度
        $scope.initHeight = function () {
            var height = document.documentElement.clientHeight;
            var real = ((height - 120) <= 575) ? 575 : (height - 120);
            $("#sdsMainContainer").height(real);
        };

        window.onresize = function() {
            $scope.$broadcast('onMainWindowsResize', 'to child');
        };

        $scope.$on('onMainWindowsResize', function () {
            $scope.initHeight();
        });

        //菜单样式自主激活
        $scope.activeMenuStyle();

        $scope.getMainTitleTextStyle = function(uisref, uisref2){
            if (uisref == uisref2) {
                return {'border-bottom': '2px solid #ef595a'};
            } else {
                return {};
            }
        };

        $scope.setClusterErrMsg = function(msg) {
            $scope.clusterSetErrMsg = msg;
            var timeoutId = setTimeout(function () {
                $scope.clusterSetErrMsg = "";
            }, 5000);
        };

        $scope.showTipMsg = function (tipMsg, ngModel) {
            var _this = $('[ng-model="' + ngModel + '"]');
            _this.data('tipMsg', tipMsg);
            _this.popover('show');
            console.log(_this)
            if (_this.data('timeoutId')) {
                clearTimeout(_this.data('timeoutId'));
            }
            var timeoutId = setTimeout(function () {
                _this.popover('hide');
            }, 3000);
            _this.data('timeoutId', timeoutId);
            _this.focus();
        };

        var selectors = ['#dNtpSet input' , '#modifyPwModal input', '#snmpConfigMode input', '#addLunModal input', '#addBlockModal input'];
        for (var i = 0; i < selectors.length; i++) {
            $(selectors[i]).each(function () {
                var _this = $(this);
                _this.popover({
                    trigger: 'manual',
                    placement: 'top',
                    html: true,
                    content: function () {
                        if (_this.data('tipMsg')) {
                            return '<div style="color:#000;">' + _this.data('tipMsg') + '</div>';
                        }
                        return '';
                    }
                });
            });
        }

    }]);
