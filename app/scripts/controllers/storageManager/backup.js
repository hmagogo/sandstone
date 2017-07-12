/*  *
 * created by wuchanggui 2014/12/19
 */
sdsomwebApp.controller("storageResourceCtrl", ["$rootScope", "$scope", "storageFactory", "mainFactory", "$filter",
    function ($rootScope, $scope, storageFactory, mainFactory, $filter) {
        "use strict";

        $scope.snapModel = {};

        /**
         * 初始化函数
         */
        $scope.initPage = function () {
            $scope.gMainStateRouteView.current = 'main.container.storage_view';
            $scope.snapLun                     = 'none';
            $scope.snapModel.sure2deleteSnap   = "NO";
            $scope.isSnapRollingback           = false;
            $scope.initiatorShow               = false;
            $scope.snapshotDisable             = false;
            //初始化pool/lun/block/acl/chap/snap页码
            $scope.lunPageNo                   = 1;
            $scope.blockPageNo                 = 1;
            $scope.poolPageNo                  = 1;
            $scope.chapPageNo                  = 1;
            $scope.aclPageNo                   = 1;
            $scope.snapshotpageno              = 1;

            $scope.showPoolTab();
            //获取存储池列表
            $scope.resourcePoolList();
            //初始化查询参数
            $scope.poolQueryParams = {
                pageno: 1,
                pagesize: 10
            };
            //删除快照如果已经有客户端连接该pool，需要再次确认
            $scope.sure2deleteLunAgain = false;
            $scope.sure2deleteBlockAgain = false;
            //初始化存储策略
            $scope.storagePolicy = {
                default: "replicated",
                replicated: {
                    enable: 1,
                    default: 2,
                    options: [2, 3],
                },
                erasure: {
                    enable: 0,
                    datablock: {
                        default: 2,
                        options: [2],
                    },
                    parityblock: {
                        default: 1,
                        options: [1],
                    }
                }
            };
            //延迟更新
            var timeoutId = setTimeout(function () {
                $scope.queryStoragePolicy();
            }, 2000);

            //延迟更新所有快照信息
            $scope.setTimeoutUpdateSnapshot = function(){
                var snapTimeoutId = setTimeout(function() {
                    //在这里获取所有快照信息，然后缓存起来。
                    //如果有创建快照的话。。。创建成功时候再执行缓存一次。。。
                    $scope.queryAllSnapList();
                },1500);
            };

            $scope.setTimeoutUpdateSnapshot();

            $scope.snapshotAllList = []; //用于缓存所有lun所有快照信息，用于在删除lun/block时候判断该lun/block下面是否有快照，避免异步网络查询
            $scope.snapOverLun = false;
            $scope.getLunList(); //虽然并不需要立即获取lun列表，但是为了在删除pool时候能通过区分lunList undefined状态下时候避免异步网络查询。故在此先查询一次
            $scope.getBlockList();
            //获取存储池列表
            $scope.getPoolList();
            //样式修改
            $(".alarm-tab-header span").click(function (e) {
                if (this.className == "alarm-tab-active") {
                    return;
                } else {
                    $(this).removeClass("alarm-tab").addClass("alarm-tab-active");
                    $(this).siblings().removeClass("alarm-tab-active").addClass("alarm-tab");
                }
            });
            //弹出框控制器
            $scope.modal = {
                message: "",    //弹出框标题信息
                to: "",         //当前要去做的业务
                sureTo: "",     //确定时调用的方法
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
            //初始化信息提示
            var selectors = ["#modalDialogView input,select", "#poolAclSet input,select" , "#snapModal input,select"]
            for (var i = 0; i < selectors.length ; i++) {
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
            }
            //主机初始化
            $scope.host = {}, $scope.hostGroup = {};
            //阻止enter提交
            $("input[type='text']").keydown(function (event) {
                if(event.keyCode === 13) {
                    event.preventDefault();
                    event.returnValue = false;
                    return;
                }
            });
        };
        //查询当前LUN下所有快照信息
        $scope.querySnapshot = function(lun){
            try{ //query snapshot maybe error
                storageFactory.queryLunSnapshot({poolId:lun.poolId, poolName:lun.poolName, lunName:lun.lunName},function(response){
                   if(1===response.success){
                       $scope.snapshotList = response.data;
                       var flag = false;
                       for (var i = 0; i < $scope.snapshotList.length; i++) {
                           if ($scope.snapshotList[i].status == '正在回滚') {
                                flag = true;
                           }
                       }
                       $scope.snapshotDisable = flag;
                       $scope.setPage('snapshot','current'); //set current page
                   }else{
                        // failed to query snapshot
                       $scope.snapshotList = [];
                   }
                });
            }catch(err){
               $scope.snapshotList = [];
            };
            $scope.setTimeoutUpdateSnapshot();
        }

        $scope.setSnapErrMsg = function(msg) {
            $scope.snapErrMsg = msg;
            var timeoutId = setTimeout(function () {
                $scope.snapErrMsg = "";
            }, 5000);
        };
        $scope.setAclErrMsg = function(msg) {
            $scope.aclErrMsg = msg;
            var timeoutId = setTimeout(function () {
                $scope.snapErrMsg = "";
            }, 5000);
        };
        //取消快照操作时，重新加载快照信息以覆盖修改掉的信息，清掉用户输入的YES
        $scope.cancelSnap = function(){
            $scope.snapLun.sure2Snap = '';
            $scope.sure2Snap = false;
            $("#snapModal").modal("hide");
        }

        $scope.sure2addSnapshotOrRollback = function (addSnapshotOrRollback){
            //lun类型需要判断是否有客户端正在连接，block只提示需要先断开映射
            if ( $scope.snapModel.sure2deleteSnap == 'YES') {
                if ($scope.snapLun.type == 'iscsi'){
                    storageFactory.queryPoolAcl($scope.snapLun.poolName, function (response) {
                        if (response.success) {
                            var i = 0;
                            var length = response.data.length;
                            for ( i=0; i<length; i++) {
                                //表示有客户端正在连接了该pool
                                if (response.data[i].state == "active") {
                                    if ( $scope.snapLun.sure2Snap != 'YES') {
                                        $scope.sure2Snap = true;
                                        // hint user that there are some initiators has connect.user can select want to continue.
                                        $scope.setSnapErrMsg("请输入大写 'YES' 以确定操作！");
                                        return;
                                    };
                                }
                            }
                            addSnapshotOrRollback();
                            return;
                        }
                    });
                }else{
                    addSnapshotOrRollback();
                    return;
                }
            } else {
                $scope.setSnapErrMsg("请输入大写 'YES' 以确定操作！");
            }
        }
        $scope.queryAllSnapList = function (){
            storageFactory.queryAllSnapList(function(response){
                if (response.success == 1){
                    $scope.snapshotAllList = response.data;
                }else{
                    console.log('failed');
                }
            });
        }
        //检查lun/block下面是否有快照
        $scope.checkSnapOverLun = function (lunObj){
            $scope.snapOverLun = false;
            for (var i=0;i<$scope.snapshotAllList.length;++i){
                if ($scope.snapshotAllList[i]['pool'] == lunObj['poolName']){
                    if ($scope.snapshotAllList[i]['image'] == lunObj['lunName']){
                        $scope.snapOverLun = true;
                        return
                    }
                }
            }
        }
        //检查pool下面是否有lun、block
        $scope.checkLunOverPool = function (poolObj){
            if (typeof($scope.lunList)=='undefined'){
                //here need query all lunList & blockList, because never query before
                //do nothing , query lunList/blockList when init
            }
            if ($scope.lunList.length != 0){
                for (var i=0;i<$scope.lunList.length;++i){
                    if ($scope.lunList[i]['poolName'] == poolObj['poolName']){
                        $scope.lunOverPool = true;
                        return;
                    }
                }
            }
            if ($scope.blockList.length != 0){
                for (var i=0;i<$scope.blockList.length;++i){
                    if ($scope.blockList[i]['poolName'] == poolObj['poolName']){
                        $scope.lunOverPool = true;
                        return;
                    }
                }
            }
            $scope.lunOverPool = false;
            return;
        }
        //检查快照该lun、block快照是否在回滚
        $scope.checkLunRollbacking = function (){
            if ($scope.currentSnapshotType == 'lun'){
                var length = $scope.lunList.length;
                for(var i=0;i<length;++i){
                    if($scope.lunList[i].poolId == $scope.snapLun.poolId && $scope.lunList[i].lunName == $scope.snapLun.lunName){
                        if($scope.lunList[i].status == "正在回滚"){
                            $scope.snapRollbacking = true;
                        }else{
                            $scope.snapRollbacking = false;
                        }
                    }

                }
            }else if($scope.currentSnapshotType == 'blk'){
                var length = $scope.blockList.length;
                for(var i=0;i<length;++i){
                    if($scope.blockList[i].poolId == $scope.snapLun.poolId && $scope.blockList[i].lunName == $scope.snapLun.lunName){
                        if($scope.blockList[i].status == "正在回滚"){
                            $scope.snapRollbacking = true;
                        }else{
                            $scope.snapRollbacking = false;
                        }
                    }
                }
            }
        }
        //提交请求：添加/修改/删除快照
        $scope.commitSnap = function(){
            var type = $scope.snapCommitType;
            if('add'===type){
                if ($scope.snapLun.status != "正常") {
                    $scope.setSnapErrMsg("Lun状态为 " + $scope.snapLun.status + " ，不能执行快照操作");
                    return;
                };

                if($scope.snapModel.snapName===undefined){
                    //$scope.showTipMsg("快照名称不能为空", "snapModel.snapName");
                    $scope.setSnapErrMsg("快照名称不能为空");
                    return;
                };
                var nameTest = /^[a-zA-Z0-9]{1,8}$/;
                if(!nameTest.test($scope.snapModel.snapName)){
                    //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                    $scope.setSnapErrMsg("快照名称应由数字或字母组成，长度为1至8");
                    return;
                };
                if($scope.snapModel.remark===undefined){
                    $scope.setSnapErrMsg("快照描述不能为空");
                    return;
                };
                if($scope.snapModel.remark.length > 500){
                    //$scope.showTipMsg("描述的字数应在500以内", "snapModel.snapName");
                    $scope.setSnapErrMsg("描述的字数为:" + $scope.snapModel.remark.length + "，超过了500");
                    return;
                };
                var remarkTest = /^[\x00-\x7F]{1,500}$/;
                if(!remarkTest.test($scope.snapModel.remark)){
                    //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                    $scope.setSnapErrMsg("仅支持500个以内的ASCII字符，包括英文字符和数字。");
                    return;
                };
                var isSnapNameExisted = false;
                angular.forEach($scope.snapshotList, function(obj,index) {
                    if ($scope.snapModel.snapName == obj.snapName){
                        isSnapNameExisted = true;
                    };
                });
                if (isSnapNameExisted == true) {
                    //$scope.showTipMsg("快照名称已存在，请使用其它名称", "snapModel.snapName");
                    $scope.setSnapErrMsg("快照名称已存在，请使用其它名称");
                    return;
                }
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.addSnapshot(
                    {poolId:$scope.snapLun.poolId, 
                        poolName: $scope.snapLun.poolName, 
                        lunName: $scope.snapLun.lunName, 
                        snapName: $scope.snapModel.snapName, 
                        remark: $scope.snapModel.remark
                    },function(resData){
                    $scope.isAdd = false;
                    if(1===resData.success){
                        $("#snapModal").modal("hide");
                        $scope.setSuccNoticeMsg("快照创建成功");
                        $scope.querySnapshot($scope.snapLun);
                    }else{
                        $scope.setSnapErrMsg(resData.message);
                    }
                    NProgress.done();
                    $scope.setTimeoutUpdateSnapshot();//稍后更新所有快照信息
                });
            }else if('update'===type){
                if($scope.snapModel.snapName===undefined){
                    //$scope.showTipMsg("快照名称不能为空", "snapModel.snapName");
                    $scope.setSnapErrMsg("快照名称不能为空");
                    return;
                };
                if($scope.snapModel.remarkInput===undefined){
                    $scope.setSnapErrMsg("快照描述不能为空");
                    return;
                };
                if($scope.snapModel.remarkInput.length > 500){
                    //$scope.showTipMsg("描述的字数应在500以内", "snapModel.snapName");
                    $scope.setSnapErrMsg("描述的字数为:" + $scope.snapModel.remarkInput.length + "，超过了500");
                    return;
                };
                var remarkTest = /^[\x00-\x7F]{1,500}$/;
                if(!remarkTest.test($scope.snapModel.remarkInput)){
                    //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                    $scope.setSnapErrMsg("仅支持500个以内的ASCII字符，包括英文字符和数字。");
                    return;
                };
                NProgress.start();
                storageFactory.updateSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunName, snapName: $scope.snapModel.snapName, remark:$scope.snapModel.remarkInput},function(resData){
                    if(1===resData.success){
                        $("#snapModal").modal("hide");
                        $scope.setSuccNoticeMsg("快照描述修改成功");
                        $scope.snapModel.remark = $scope.snapModel.remarkInput;
                    }else{
                        $scope.setSnapErrMsg(resData.message);
                    }
                    NProgress.done();
                });
            }else if('delete'===type){
                if ($scope.isSnapRollingback == true){
                    $scope.setSnapErrMsg("快照回滚操作正在进行中，请稍后再操作");
                    return;
                };
                if ($scope.snapModel.sure2deleteSnap != "YES") {
                    $scope.setSnapErrMsg("请输入大写 'YES' 确认删除操作");
                    return;
                };
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.deleteSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunName, snapName:$scope.snapModel.snapName},function(resData){
                    $scope.isAdd = false;
                    if(1===resData.success){
                        $("#snapModal").modal("hide");
                        $scope.setSuccNoticeMsg("快照删除成功");
                        $scope.snapModel.sure2deleteSnap = "NO";
                    }else{
                        $scope.setSnapErrMsg(resData.message);
                    };
                    NProgress.done();
                });
                $scope.setTimeoutUpdateSnapshot();
            }else if('rollback'===type){
                var checkRollbackInfo = function(){
                    //make sure that user know there are some initiators also connect to this pool.
                    if ($scope.isSnapRollingback == true){
                        $scope.setSnapErrMsg("快照回滚操作正在进行中，请稍后再操作");
                        return;
                    };
                    if ($scope.snapModel.sure2deleteSnap != "YES") {
                        $scope.setSnapErrMsg("请输入大写 'YES' 确认回滚操作");
                        return;
                    };
                };
                var RollbackOperate = function() {
                    NProgress.start();
                    $scope.snapshotDisable = true;
                    storageFactory.rollbackSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunName, snapName:$scope.snapModel.snapName},function(resData){
                        if(1===resData.success){
                            $("#snapModal").modal("hide");
                            $scope.setSuccNoticeMsg("正在进行快照回滚");
                            $scope.snapModel.sure2deleteSnap = "NO";
                            //need query all this lun's snapshot and fresh snapshot status
                            $scope.querySnapshot($scope.snapLun);
                            if($scope.currentSnapshotType == 'lun'){
                                $scope.getLunList();
                            }else if($scope.currentSnapshotType == 'blk'){
                                $scope.getBlockList();
                            }
                        }else{
                            $scope.snapshotDisable = false;
                            $scope.setSnapErrMsg(resData.message);
                        };
                        NProgress.done();
                    });
                }
                $scope.sure2addSnapshotOrRollback( function(){
                    checkRollbackInfo();
                    RollbackOperate();
                    $scope.snapLun.sure2Snap = '';
                    $scope.sure2Snap = false;
                });
            }else if('cloneVolume'===type){
                //判断选择的pool和输入的lun id是否合法
                if($scope.clonelun.poolName == null){
                    $scope.showTipMsg("请选择新卷所属的存储池",'clonelun.poolName');
                    return;
                }

                if($scope.currentSnapshotType == 'lun'){
                    if($scope.clonelun.lunId == null){
                        $scope.showTipMsg("请输入克隆出的LUN LUN ID",'clonelun.lunId');
                        return;
                    }
                    if(isNaN($scope.clonelun.lunId)){
                        $scope.showTipMsg("LUN ID必须为数字",'clonelun.lunId');
                        return;
                    }
                    if ($scope.clonelun.lunId > 254 || $scope.clonelun.lunId < 1) {
                        $scope.showTipMsg("LUN ID 应为1至254之间的数字！", 'clonelun.lunId');
                        return;
                    }
                    var params = {snapshot:{poolName: $scope.snapModel.poolName,
                                            lunName: $scope.snapModel.lunName,
                                            snapName: $scope.snapModel.snapName},
                                  cloneLun:{poolName:$scope.clonelun.poolName ,
                                            lunName: $scope.clonelun.lunId}
                                 };
                }else if($scope.currentSnapshotType == 'blk'){
                    // 不能含有@字符
                    if ($scope.clonelun.blockName.indexOf("@") >= 0) {
                        $scope.showTipMsg("不可包含'@'符号", "clonelun.blockName");
                        return;
                    }
                    // 不能含有#字符
                    if ($scope.clonelun.blockName.indexOf("#") >= 0) {
                        $scope.showTipMsg("不可包含'#'符号", "clonelun.blockName");
                        return;
                    }
                    // 不能以'-'字符开头
                    if ($scope.clonelun.blockName.substring(0, 1) == "-") {
                        $scope.showTipMsg("不可以'-'开始", "clonelun.blockName");
                        return;
                    }
                    var params = {snapshot:{poolName: $scope.snapModel.poolName,
                                            lunName: $scope.snapModel.lunName,
                                            snapName: $scope.snapModel.snapName},
                                  cloneLun:{poolName:$scope.clonelun.poolName ,
                                            lunName: $scope.clonelun.blockName}
                                 };
                }

                NProgress.start();
                storageFactory.cloneVolume(params,function(respone){
                    if(respone.success==1){
                        //克隆成功 , 隐藏弹出框 刷新lun列表
                        $("#snapModal").modal("hide");
                        $scope.setSuccNoticeMsg("克隆成功");
                        if($scope.currentSnapshotType=='lun'){
                            $scope.showLunTab();
                        }else if($scope.currentSnapshotType=='blk'){
                            $scope.showBlockTab();
                        }
                        $scope.clonelun.poolName = null;
                        $scope.clonelun.lunId = null;
                        params = null;
                    }else{
                        //克隆失败
                        $scope.setSnapErrMsg(respone.message);
                    }
                });
                NProgress.done();
                //clean param
            }

        };
        //显示操作框
        $scope.showSnapModal = function(type, data){
            $scope.NoSnapErrMsg = "";
            $scope.snapErrMsg = "";
            $scope.snapModel = {};
            $scope.snapCommitType = type;
            $scope.checkLunRollbacking(); //if this lun is rollbacking, it will set a flag

            if('add'===type){
                if (data.status == '正在删除') {
                    return ;
                }
                $scope.snapModelAdd = true;
                $scope.snapModelUpdate = false;
                $scope.snapModelDelete = false;
                $scope.snapModelRollback = false;
                $scope.cloneVolume = false;
                $scope.snapMessage = '创建快照';
                $("#snapModal").modal("show");
            }else if('update'===type){
                $scope.snapModelAdd = false;
                $scope.snapModelUpdate = true;
                $scope.snapModelDelete = false;
                $scope.snapModelRollback = false;
                $scope.cloneVolume = false;
                $scope.snapMessage = '修改快照描述';
                $scope.snapModel = data;
                $scope.snapModel.remarkInput = $scope.snapModel.remark;
                $("#snapModal").modal("show");
            }else if('rollback'===type){
                $scope.snapModelAdd = false;
                $scope.cloneVolume = false;
                $scope.snapModelUpdate = false;
                $scope.snapModelDelete = false;
                $scope.snapModelRollback = true;
                $scope.snapMessage = '回滚快照';
                if ($scope.snapshotDisable) { return; }
                $("#snapModal").modal("show");
                $scope.snapModel = data;
            }else if('delete'===type){
                $scope.snapMessage = '删除快照';
                $scope.snapModel.sure2deleteSnap = "NO";
                $scope.snapModelAdd = false;
                $scope.snapModelUpdate = false;
                $scope.snapModelDelete = true;
                $scope.snapModelRollback = false;
                $scope.cloneVolume = false;
                $scope.snapModel = data;
                $("#snapModal").modal("show");
            }else if('cloneVolume'===type){
                $scope.snapMessage = '克隆卷';
                $scope.cloneVolume = true;
                $scope.snapModelAdd = false;
                $scope.snapModelUpdate = false;
                $scope.snapModelDelete = false;
                $scope.snapModelRollback = false;
                $scope.snapModel = data;
                $("#snapModal").modal("show");
            }
        };

        /******************************公共函数********************************************/
        /**
         * 查询系统存储策略
         */
        $scope.queryStoragePolicy = function() {
            //查询系统副本数
            storageFactory.resourcePoolStoragePolicy(function (response) {
                if (response.success) {
                    $scope.storagePolicy = response.data;
                }
                // TODO: 如果获取失败了...
            });
        };

        $scope.updateErasurePolicy = function(datablock) {
            var range = [];
            for(var i = 1; i < datablock; i++) {
                range.push(i);
            };
            $scope.storagePolicy.erasure.parityblock.options = range;
        };
        /**
         * 显示提示信息
        * main.js 中已经定义了这个function,这里属于重复定义
        $scope.showTipMsg = function (tipMsg, ngModel) {
            var _this = $("[ng-model='"+ngModel+"']");
            _this.data("tipMsg", tipMsg);
            _this.popover("show");
            if (_this.data("timeoutId")) {
                clearTimeout(_this.data("timeoutId"));
            }
            var timeoutId = setTimeout(function () {
                _this.popover("hide");
            }, 3000);
            _this.data("timeoutId", timeoutId);
            _this.focus();
        };
        */
        $scope.poolSelectFun = function(currentPool) {
            $scope.currentPool = currentPool;
            // get this pool's acl & chap set
            $scope.queryPoolAcl(currentPool.poolName);
            $scope.getPoolChapList(currentPool.poolName);

        };

        $scope.lunSelectFun = function(index, currentLun) {
            $scope.lunSelect    = index;
            $scope.currentLun   = currentLun;
            $scope.snapshotPage = null;
            $scope.querySnapshot($scope.currentLun);
            //因为原来的做法是,选择了快照管理按钮后,把该lun/block 赋给$scope.snapLun,通过snapLun就可以知道是哪个lun/block需要快照. 现在取消了快照管理按钮,故,当用户选择了某个lun/block就立即把该lun/block赋给snapLun
            $scope.snapLun = $scope.currentLun;
            $scope.currentSnapshotType = 'lun';

        };
        $scope.blockSelectFun = function(index, currentBlock) {
            $scope.blockSelect  = index;
            $scope.currentBlock = currentBlock;
            $scope.snapshotPage = null;
            $scope.querySnapshot($scope.currentBlock);
            //get this block's snapshot info
            $scope.snapLun = $scope.currentBlock;
            $scope.currentSnapshotType = 'blk';
        };
        $scope.setStorageErrMsg = function(msg) {
            $scope.errMsg = msg;
            var timeoutId = setTimeout(function () {
                $scope.errMsg = "";
            }, 5000);
        };

        /**
         * 显示POOL弹出框
         */
        $scope.showPoolModal = function (to, obj) {
            $scope.setStorageErrMsg("");
            switch (to) {
                case "addPool":
                    $scope.modal.message = "创建存储池";
                    $scope.modal.to = to;
                    $scope.modal.sureTo = $scope.saveOrUpdatePool;
                    $scope.apool = {};
                    $scope.apool.storagePolicy = $scope.storagePolicy;
                    $scope.apool.storagePolicy.selected = $scope.apool.storagePolicy.default;
                    $scope.apool.storagePolicy.replicated.selected = $scope.apool.storagePolicy.replicated.default;
                    $scope.apool.storagePolicy.erasure.datablock.selected = $scope.apool.storagePolicy.erasure.datablock.default;
                    $scope.apool.storagePolicy.erasure.parityblock.selected = $scope.apool.storagePolicy.erasure.parityblock.default;

                    var obj=document.getElementById('policySelect');
                    obj.options.length=0;

                    if($scope.apool.storagePolicy.replicated.enable){
                        obj.options.add(new Option("副本策略","replicated"));
                    }
                    if($scope.apool.storagePolicy.erasure.enable){
                        obj.options.add(new Option("纠删码(EC)策略","erasure"));
                    }
                    $scope.apoolRadios = false;
                    $scope.apoolCheck = false;
                    $("#modalDialogView").modal("show");
                    return;
                case "updatePool":
                    $scope.apool = angular.copy(obj);
                    $scope.apool.capacity_tb = ($scope.apool.capacity_bytes/1073741824).toFixed(2);
                    $scope.modal.set("重命名存储池", to, $scope.saveOrUpdatePool);
                    $("#modalDialogView").modal("show");
                    return;
                case "setPoolAccess":
                    $scope.spool = angular.copy(obj);
                    $scope.spool.capacity_tb = ($scope.apool.capacity_bytes/1073741824).toFixed(2);
                    $scope.modal.set("设置存储池访问列表", to, $scope.setPoolAccessList);
                    return;
                case "deletePool":
                    $scope.pool4Delete = obj;
                    $scope.checkLunOverPool(obj);
                    $scope.modal.set("删除？", to, $scope.goDeletePool);
                    $scope.apool = $scope.apool || {};
                    $scope.apool.sure2deletePool = ""
                    $("#modalDialogView").modal("show");
                    return;
                case "setChap":
                    $scope.poolChap = {
                        poolName: obj.poolName,
                        username: "",
                        password: "",
                    };
                    $scope.pool4Chap = obj;
                    //查询列表
                    $scope.getPoolChapList();
                    $scope.modal.set("CHAP设置：存储池pool", to, $scope.addPoolChap);
                    //$scope.modal.sureTo = $scope.addPoolChap;
                    $("#modalDialogView").modal("show");
                    return;
                case "addInitiator":
                    $scope.modal.set("添加iSCSI客户端", to, $scope.addPoolInitiator)
                    $("#modalDialogView").modal("show");
                    return;

            }
        };

        $scope.createDefaultLunId = function(){

            //get a default lun id
            var allLunIdList = new Array();
            var i = 0;
            for (i=0;i<$scope.lunList.length;++i){
                if ($scope.lunList[i].poolName == $scope.alun.poolName){
                    allLunIdList.push(parseInt($scope.lunList[i].lunName));
                }
            }
            i = 0;
            var inOperation = function(element, array){
                for (var i=0;i<array.length;i++){
                    if (array[i] == element){
                        return true;
                    }
                }
                return false;
            }
            for (i=1;i<255;i++){
                if (!(inOperation(i, allLunIdList))){
                    $scope.alun.lunName = i.toString();
                    break
                }
            }
            if (i == 255){
                $scope.showTipMsg("该POOL所有LUN ID已使用完", "alun.poolName")
                return;
            }
        }
        /**
         * 显示LUN弹出框
         */
        $scope.showLunModal = function (to, obj, index) {
            $scope.setStorageErrMsg("");
            switch (to) {
                case "addLun":
                    //查询下拉列表
                    $scope.alun = {};
                    $scope.alun.sizeUnit = "GB";
                    $scope.resourcePoolList();
                    $scope.modal.set("创建LUN", to, $scope.saveOrUpdateLun)
                    $scope.sure2deleteLunAgain = false;
                    $("#modalDialogView").modal("show");
                    return;
                case "updateLun":
                    if (obj.status == '正在删除') {
                        obj.disabled = true;
                    }
                    if(!obj.disabled){
                        $scope.alun = angular.copy(obj);
                        if($scope.alun.status == '正在回滚'){
                            $scope.lunRollbacking = true;
                        }else{
                            $scope.lunRollbacking = false;
                        }
                        $scope.alun.capacity_display = $scope.byteTosUnitSizeObj($scope.alun.capacity_bytes).size;
                        $scope.alun.sizeUnit = $scope.byteTosUnitSizeObj($scope.alun.capacity_bytes).unit;
                        $scope.modal.set("调整LUN容量", to, $scope.saveOrUpdateLun);
                        //$scope.getPoolCapacity($scope.alun.poolId);
                        $scope.sure2deleteLunAgain = false;
                        $("#modalDialogView").modal("show");
                    }
                    return;
                case "deleteLun":
                    if (obj.status == '正在删除') {
                        obj.disabled = true;
                    }
                    if(!obj.disabled){
                        $scope.lunSelect  = index;
                        $scope.currentLun = obj;
                        $scope.lun4Delete = obj;
                        if($scope.lun4Delete.status == '正在回滚'){
                            $scope.lunRollbacking = true;
                        }else{
                            $scope.lunRollbacking = false;
                        }
                        $scope.checkSnapOverLun(obj);
                        $scope.modal.set("删除？", to, $scope.goDeleteLun);
                        $scope.alun = $scope.alun || {};
                        $scope.alun.sure2deleteLun = "";
                        $scope.alun.sure2deleteLunAgain = "";
                        $scope.sure2deleteLunAgain = false;
                        $("#modalDialogView").modal("show");
                    }
                    return;
                case "snapshot":
                    if(!obj.disabled){
                        $scope.sure2deleteLunAgain = false;
                        $scope.alun = angular.copy(obj);
                        if($scope.alun.status == '正在回滚'){
                            $scope.lunRollbacking = true;
                        }else{
                            $scope.lunRollbacking = false;
                        }
                    }
            }
        };

        /**
         * 显示Block弹出框
         */
        $scope.showBlockModal = function (to, obj, index) {
            $scope.setStorageErrMsg("");
            switch (to) {
                case "addBlock":
                    //查询下拉列表
                    $scope.selectedBlock = {};
                    $scope.selectedBlock.sizeUnit = "GB";
                    $scope.resourcePoolList();
                    $scope.sure2deleteBlockAgain = false;
                    $scope.modal.set("创建块设备", to, $scope.operateBlock)
                    $("#modalDialogView").modal("show");
                    return;
                case "updateBlock":
                    if (obj.status == '正在删除') {
                        return ;
                    }
                    if(!obj.disabled){
                        $scope.selectedBlock = angular.copy(obj);
                        if($scope.selectedBlock.status == '正在回滚'){
                            $scope.blockRollbacking = true;
                        }else{
                            $scope.blockRollbacking = false;
                        }
                        if ($scope.blockRollbacking){
                            $("#modalDialogView").modal("hide");
                            return;
                        }
                        $scope.selectedBlock.capacity_display = $scope.byteTosUnitSizeObj($scope.selectedBlock.capacity_bytes).size;
                        $scope.selectedBlock.sizeUnit = $scope.byteTosUnitSizeObj($scope.selectedBlock.capacity_bytes).unit;
                        $scope.modal.set("调整块设备容量", to, $scope.operateBlock);
                        $scope.sure2deleteBlockAgain = false;
                        $("#modalDialogView").modal("show");
                    }
                    return;
                case "deleteBlock":
                    if (obj.status == '正在删除') {
                        return;
                    }
                    if(!obj.disabled){
                        $scope.block4Delete = obj;
                        if($scope.block4Delete.status == '正在回滚'){
                            $scope.blockRollbacking = true;
                        }else{
                            $scope.blockRollbacking = false;
                        }
                        $scope.checkSnapOverLun(obj);
                        $scope.modal.set("删除？", to, $scope.goDeleteBlock);
                        $scope.selectedBlock = $scope.selectedBlock || {};
                        $scope.selectedBlock.sure2deleteBlock = "";
                        $scope.selectedBlock.sure2deleteBlockAgain = "";
                        $scope.sure2deleteBlockAgain = false;
                        $("#modalDialogView").modal("show");
                    }
                    return;
            }
        };

        // 设置定时任务
        $scope.storageTimeTicker = null;
        // 设置定时任务取消的触发事件
        $rootScope.$on('$stateChangeStart', cancelTimer);
        function cancelTimer(event, toState, toParams, fromState, fromParams) {
            clearInterval($scope.storageTimeTicker);
        }

        /**
         * 轮换显示标签
         */
        $scope.showPoolTab = function () {
            $scope.showTab = "pool";
            $scope.getPoolList();
            // 设置时间
            if ($scope.storageTimeTicker) {
                clearInterval($scope.storageTimeTicker);
            }
            $scope.storageTimeTicker = setInterval(function() {
                $scope.getPoolList();
            }, 30000);
        };
        $scope.showLunTab = function () {
            $scope.showTab = "lun";
            $scope.getLunList();
            // 设置时间
            if ($scope.storageTimeTicker) {
                clearInterval($scope.storageTimeTicker);
            }
            $scope.storageTimeTicker = setInterval(function() {
                $scope.getLunList();
            }, 30000);
        };
        $scope.showBlockTab = function () {
            $scope.showTab = "block";
            $scope.getBlockList();
            // 设置时间
            if ($scope.storageTimeTicker) {
                clearInterval($scope.storageTimeTicker);
            }
            $scope.storageTimeTicker = setInterval(function() {
                $scope.getBlockList();
            }, 30000);
        };
        $scope.hideAclSet = function () {
            $("initiatorTabDiv").hide();
            if ($("#ShowInitiatorTr")){
                $("#ShowInitiatorTr").remove();
            };
            $scope.initiatorShow = false;
        };
        $scope.showViewTab = function () {
            $scope.showTab = "view";
            $scope.tabChange();
        };

        /**
        *         * tab切换时清除函数
        *                 */
        $scope.tabChange = function () {
            $scope.hideChartDiv();
            $scope.hideSnapTable();
            $scope.hideAclSet();
        };
        $scope.hideChartDiv = function() {
            $("#chartDiv").hide();
            if ($(".rrr")){
                $(".rrr").remove();
            };
            if ($(".lrrr")){
                $(".lrrr").remove();
            };
        };
        $scope.hideSnapTable = function() {
            $("#snapTableDiv").hide();
            if ($('#ShowSnapshotTr')){
                $('#ShowSnapshotTr').remove();
            };
        };

        /**
         * 增加选中样式
         */
        $scope.checkedOrNot = function (isOrNot) {
            if (isOrNot) {
                return "url('/sdsomweb/images/storage/btn_fuxuan_select.png') no-repeat left 55%";
            } else {
                return "url('/sdsomweb/images/storage/btn_fuxuan_default.png') no-repeat left 55%";
            }
        };
        /******************************公共函数完********************************************/

        /******************************存储池增删改查****************************************/
        //将系统容量全部给当前存储池
        $scope.givePoolAllCapacity = function () {
            $scope.apoolRadios = !$scope.apoolRadios;
        };

        //显示高级选项
        $scope.showRepSelect = function () {
            $scope.apoolCheck = !$scope.apoolCheck;
        };

        /**
         * 查询存储池列表
         */
        $scope.getPoolList = function () {
            //清除详情
            // $scope.tabChange();

            $scope.queryStoragePolicy();

            //查询列表
            NProgress.start();
            storageFactory.queryResourcePool($scope.poolQueryParams, function (response) {
                if (response.success) {
                    $scope.poolList = response.data;
                    $scope.setPage('pool','current'); //set current page
                    //set default selected first in pool list
                    // $scope.poolSelect = ($scope.poolSelect === undefined) ? 1 : $scope.poolSelect;
                }
                NProgress.done();
            });
        };

        //添加或修改存储池
        $scope.saveOrUpdatePool = function () {
            var lower_re = /^[a-z0-9]{1,16}$/ ;
            if (!lower_re.test($scope.apool.poolName)) {
                $scope.showTipMsg("存储池名称必须由1到16个小写字母或数字组成", "apool.poolName");
                return;
            }
            if (!$scope.apool.poolId && !$scope.apool.poolName) {
                $scope.showTipMsg("存储池名称不能为空", "apool.poolName");
                return;
            }
            if (!lower_re.test($scope.apool.newName)) {
                $scope.showTipMsg("存储池名称必须由1到16个小写字母或数字组成", "apool.newName");
                return;
            }

            if ($scope.apool.poolId && !$scope.apool.newName) {
                $scope.showTipMsg("新存储池名称不能为空", "apool.newName");
                return;
            }

            var pool;
            if ($scope.apool.existed) {
                var poolNameExists = false;
                angular.forEach($scope.poolList, function(poolTemp,index){
                    if (poolTemp.poolName == $scope.apool.newName) {
                        poolNameExists = true;
                        return;
                    };
                });
                if (poolNameExists == true){
                    $scope.showTipMsg("名称已存在", "apool.newName");
                    return;
                };

                pool = {
                    poolId: $scope.apool.poolId,
                    poolName: $scope.apool.poolName,
                    newPoolName: $scope.apool.newName,
                }
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.queryPoolAcl(pool.poolName, function (response) {
                    if (response.success) {
                        //判断是否有客户端正在连接，如果有需要先断开客户端连接再修改pool名称
                        var i = 0;
                        var length = response.data.length ;
                        for (i = 0 ; i < length; i++){
                            if (response.data[i].state == "active") {
                                $scope.setStorageErrMsg("有客户端正在连接，请先断开连接");
                                NProgress.done();
                                $scope.isAdd = false;
                                return;
                            }
                        }// end for
                        storageFactory.updateResourcePool(pool, function (response) {
                            if (response.success) {
                                //获取存储池列表
                                $scope.getPoolList();
                                $("#modalDialogView").modal("hide");
                                $scope.setSuccNoticeMsg("POOL重命名成功");
                            } else {
                                $scope.setStorageErrMsg(response.message);
                            }
                            $scope.isAdd = false;
                        });
                        NProgress.done();
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                });
            } else {
                var poolNameExists = false;
                angular.forEach($scope.poolList, function(poolTemp,index){
                    if (poolTemp.poolName == $scope.apool.poolName) {
                        poolNameExists = true;
                        return;
                    };
                });
                if (poolNameExists == true){
                    $scope.showTipMsg("名称已存在", "apool.poolName");
                    return;
                };
                $scope.isAdd = true;
                spinner.show();
                pool = {
                    poolName: $scope.apool.poolName,
                    storagePolicy: {
                        policy: $scope.apool.storagePolicy.selected,
                        replicated: {
                            size: $scope.apool.storagePolicy.replicated.selected,
                        },
                        erasure: {
                            datablock: $scope.apool.storagePolicy.erasure.datablock.selected,
                            parityblock: $scope.apool.storagePolicy.erasure.parityblock.selected
                        },
                    },
                }

                NProgress.start();
                storageFactory.addResourcePool(pool, function (response) {
                    spinner.hide();
                    $scope.isAdd = false;
                    if (response.success) {
                        $scope.getPoolList();
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("创建成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                });
            }
        };

        /**
         * 删除存储池
         */
        $scope.goDeletePool = function () {
            if ($scope.lunOverPool){
                $("#modalDialogView").modal("hide");
                return;
            }
            if ($scope.apool.sure2deletePool == "YES") {
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.deleteResourcePool($scope.pool4Delete.poolId, $scope.pool4Delete.poolName, function (response) {
                    if (response.success) {
                        //获取存储池列表
                        $scope.getPoolList();
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("删除成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                    $scope.isAdd = false;
                });
            } else {
                $scope.setStorageErrMsg("请输入大写 'YES' 以确定删除操作！");
            }
        };
        $scope.gotoPage = function(category){
            switch(category){
                case 'pool':
                    var poolListHeight = $("#poolList").height();
                    var pageRecorderNum = Math.floor((poolListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.poolList, $scope.poolGotoPageIndex);
                    $scope.poolPage = result.pageRecords;
                    $scope.poolPageNo = result.pageNo;
                    $scope.poolPageEndNo = result.pageEndNo;
                    break;
                case 'lun':
                    var lunListHeight = $("#lunList").height();
                    var pageRecorderNum = Math.floor((lunListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.lunList, $scope.lunGotoPageIndex);
                    $scope.lunPage = result.pageRecords;
                    $scope.lunPageNo = result.pageNo;
                    $scope.lunPageEndNo = result.pageEndNo;
                    break;
                case 'block':
                    var blockListHeight = $("#blockList").height();
                    var pageRecorderNum = Math.floor((blockListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.blockList, $scope.blockGotoPageIndex);
                    $scope.blockPage = result.pageRecords;
                    $scope.blockPageNo = result.pageNo;
                    $scope.blockPageEndNo = result.pageEndNo;
                    break;
                case 'acl':
                    var aclListHeight = $("#initiatorList").height();
                    var pageRecorderNum = Math.floor((aclListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.initiators, $scope.aclGotoPageIndex);
                    $scope.pageInitiators = result.pageRecords;
                    $scope.aclPageNo = result.pageNo;
                    $scope.aclPageEndNo = result.pageEndNo;
                    break;
                case 'chap':
                    var chapListHeight = $("#chapList").height();
                    var pageRecorderNum = Math.floor((chapListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.poolChapList, $scope.chapGotoPageIndex);
                    $scope.poolChapPage = result.pageRecords;
                    $scope.chapPageNo = result.pageNo;
                    $scope.chapPageEndNo = result.pageEndNo;
                    break;
                case 'snapshot':
                    var snapshotListHeight = $scope.snapshotListHeight;
                    var pageRecorderNum = Math.floor((snapshotListHeight-37)/38) ;
                    var result = recordersPaging("goto", pageRecorderNum, $scope.snapshotList, $scope.snapshotGotoPageIndex);
                    $scope.snapshotPage = result.pageRecords;
                    $scope.snapshotPageNo = result.pageNo;
                    $scope.snapshotPageEndNo = result.pageEndNo;
                    break;
            }
        };
        var recordersPaging = function(option, pageNum, allRecords, pageNo){
            var i = 0;
            var length = allRecords.length;
            var pageEndIndex = length;
            var pageRecords = new Array();
            //注意会引起除零错误导致结果为NaN
            if (pageNum ==0){
                return {'pageRecords':pageRecords, 'pageNo':1, 'pageEndNo':0 }
            }
            var pageEndNo = Math.ceil(length/pageNum);
            switch(option){
                case "current":
                    for(var i=pageNo;i>1;i--){
                        if (i > pageEndNo){
                            continue;
                        }
                        break;
                    }
                    pageNo = i;
                    break;
                case "front":
                    pageNo = 1;
                    break;
                case "end":
                    pageNo = Math.ceil(length/pageNum);
                    break;
                case "next":
                    if (Math.ceil(length/pageNum) > (pageNo)){
                        pageNo += 1;
                    }else{
                        pageNo = Math.ceil(length/pageNum);
                    }
                    break;
                case "pre":
                    if (pageNo - 1 < 1) {
                        pageNo = 1;
                    }else{
                        pageNo -= 1;
                    }
                    break;
                case "goto":
                    if (isNaN(pageNo)){
                        return;
                    }
                    if (pageNo > pageEndNo || pageNo < 1){
                        return;
                    }
                    break;
            }
            pageEndIndex = pageNo * pageNum;
            if (pageEndIndex > length){
                pageEndIndex = length;
            }
            for(i=(pageNo-1)*pageNum;i<pageEndIndex;++i){
                pageRecords.push(allRecords[i]);
            }
            return {'pageRecords':pageRecords, 'pageNo':pageNo, 'pageEndNo':pageEndNo };
        }
        $scope.setPage = function(category, option ){
            // this function support paging list of pool, lun, acl, chap, snapshot and other. but need add option
            switch(category) {
                case 'initiator':
                    var pageRecorderNum = 3;
                    var initiatorListHeight = $("#initiatorList").height();
                    pageRecorderNum = Math.floor((initiatorListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.initiators, $scope.aclPageNo);
                    $scope.pageInitiators = result.pageRecords;
                    $scope.aclPageNo = result.pageNo;
                    $scope.aclPageEndNo = result.pageEndNo;
                    break;
                case 'chap':
                    var pageRecorderNum = 4;
                    var chapListHeight = $("#chapList").height();
                    pageRecorderNum = Math.floor((chapListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.poolChapList, $scope.chapPageNo);
                    $scope.poolChapPage = result.pageRecords;
                    $scope.chapPageNo = result.pageNo;
                    $scope.chapPageEndNo = result.pageEndNo;
                    break;
                case 'pool':
                    var pageRecorderNum = 4;
                    var poolListHeight = $("#poolList").height();
                    pageRecorderNum = Math.floor((poolListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.poolList, $scope.poolPageNo);
                    $scope.poolPage = result.pageRecords;
                    $scope.poolPageNo = result.pageNo;
                    $scope.poolPageEndNo = result.pageEndNo;

                    //query acls&chaps of the pool selected
                    if ($scope.currentPool !== undefined) {
                        $scope.queryPoolAcl($scope.currentPool.poolName);
                        $scope.getPoolChapList($scope.currentPool.poolName);
                    } else {
                        // $scope.currentPool == undefined
                        $scope.currentPool = $scope.poolPage[0];
                    }
                    break;
                case 'lun':
                    var pageRecorderNum = 4;
                    var lunListHeight = $("#lunList").height();
                    pageRecorderNum = Math.floor((lunListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.lunList, $scope.lunPageNo);
                    $scope.lunPage = result.pageRecords;
                    $scope.lunPageNo = result.pageNo;
                    $scope.lunPageEndNo = result.pageEndNo;

                    $scope.lunSelect = ($scope.lunSelect == undefined) ? 1 : $scope.lunSelect;
                    if ($scope.currentLun == undefined) {
                        $scope.currentLun = $scope.lunPage[$scope.lunSelect-1];
                    }

                    if ($scope.lunPageEndNo != 0){
                        $scope.querySnapshot($scope.currentLun);
                        $scope.snapLun = $scope.currentLun;
                    }
                    //因为原来的做法是,选择了快照管理按钮后,把该lun/block 赋给$scope.snapLun,
                    //通过snapLun就可以知道是哪个lun/block需要快照. 现在取消了快照管理按钮,故,
                    //当用户选择了某个lun/block就立即把该lun/block赋给snapLun
                    $scope.currentSnapshotType = 'lun';

                    break;
                case 'block':
                    var pageRecorderNum = 4;
                    var blockListHeight = $("#blockList").height();
                    pageRecorderNum = Math.floor((blockListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.blockList, $scope.blockPageNo);
                    $scope.blockPage = result.pageRecords;
                    $scope.blockPageNo = result.pageNo;
                    $scope.blockPageEndNo = result.pageEndNo;

                    $scope.blockSelect = ($scope.blockSelect == undefined) ? 1 : $scope.blockSelect;
                    if ($scope.currentBlock == undefined) {
                        $scope.currentBlock = $scope.blockPage[$scope.blockSelect-1];
                    }

                    if ($scope.blockPageNo !=0){
                        $scope.querySnapshot($scope.currentBlock);
                        //get this block's snapshot info
                        $scope.snapLun = $scope.currentBlock;
                    }
                    $scope.currentSnapshotType = 'blk';
                    break;
                case 'snapshot':
                    var pageRecorderNum = 4;
                    var snapshotListHeight = $("#snapshotList").height();
                    pageRecorderNum = Math.floor((snapshotListHeight-37)/38) ;
                    var result = recordersPaging(option, pageRecorderNum, $scope.snapshotList, $scope.snapshotPageNo);
                    $scope.snapshotPage = result.pageRecords;
                    $scope.snapshotPageNo = result.pageNo;
                    $scope.snapshotPageEndNo = result.pageEndNo;
                    break;
            }
        }
        //获取acl列表显示高度
        $scope.getAclDivStyle = function(){
            var height = $("#poolAcl").height() - 30;
            return {
                'border': '1px solid #CCCCCC',
                'border-radius': '6px',
                'height': height + 'px',
                'background': '#fafbfd'
            }
        }
        $scope.getNoneAclDivStyle = function(){
            var height = $("#poolAcl").height() - 30;
            return {
                'background-image': 'url(images/storage/no_record.png)',
                'height': height + 'px',
                'background-repeat':'no-repeat',
                'border': '1px solid #CCCCCC',
                'border-radius': '6px',
                'background-position':'center',
                'padding': '20px',
                'background-color': '#fafbfd'
            }
        }
        //获取chap列表显示高度
        $scope.getChapDivStyle = function(){
            var height = $("#poolAcl").height() - 30;
            return {
                'border': '1px solid #CCCCCC',
                'border-radius': '6px',
                'height': height + 'px',
                'background': '#fafbfd'
            }
        }
        $scope.getNoneChapDivStyle = function(){
            var height = $("#poolAcl").height() - 30;
            return {
                'background-image': 'url(images/storage/no_record.png)',
                'height': height + 'px',
                'background-repeat':'no-repeat',
                'border': '1px solid #CCCCCC',
                'border-radius': '6px',
                'background-position':'center',
                'padding': '20px',
                'background-color': '#fafbfd'
            }
        }
        //获取pool/lun/block列表显示高度和其他样式
        $scope.getPoolDivStyle = function(){
            var height = $("#manageFrame").height() - 50 ;
            return {
                'border': '1px solid #CCCCCC',
                'border-radius': '6px',
                'height': height + 'px',
                'background': '#fafbfd',
            }
        }
        //获取快照列表显示高度和其他信息
        $scope.getSnapshotStyle = function(){
            $scope.snapshotListHeight = $("#snapshotDetail").height() - 30;
            return {'border': '1px solid #CCCCCC',
                    'border-radius': '6px',
                    'height': $scope.snapshotListHeight+'px',
                    'background': '#fafbfd'
            }
        }
        //获取快照为空时候显示高度和其他信息
        $scope.getNoneSnapshotStyle = function(){
            var height = $("#snapshotDetail").height() - 30;
            return {"background-image":"url(images/storage/no_record.png)",
                    "background-repeat":"no-repeat",
                    "border": "1px solid #CCCCCC",
                    "border-radius": "6px",
                    "height": height + 'px',
                    "padding":"20px",
                    "background-position":"center",
                    "background-color":"#fafbfc"
            }
        }
        //获取chap列表
        $scope.getPoolChapList = function (poolName) {
            $scope.poolChapList = null;
            NProgress.start();
            storageFactory.queryPoolChap(poolName, function (res) {
                if (res.success ){
                    $scope.poolChapList = res.data.chapList;
                    $scope.setPage('chap','current'); //set current page
                } else {
                    $scope.poolChapList = null;
                    //$scope.showDialog("CHAP认证查询失败");
                }
            });
            NProgress.done();
        };
        //增加chap
        $scope.addPoolChap = function () {
            if (!$scope.poolChap.username || $scope.poolChap.username.length < 12) {
                $scope.showTipMsg("不小于12字符！", "poolChap.username");
                return;
            }
            if (!$scope.poolChap.password || $scope.poolChap.password.length < 12) {
                $scope.showTipMsg("不小于12字符！", "poolChap.password");
                return;
            }
            if ($scope.poolChap.mutul) {
                if (!$scope.poolChap.mutulUsername || $scope.poolChap.mutulUsername.length < 12) {
                    $scope.showTipMsg("不小于12字符！", "poolChap.mutulUsername");
                    return;
                }
                if (!$scope.poolChap.mutulPassword || $scope.poolChap.mutulPassword.length < 12) {
                    $scope.showTipMsg("不小于12字符！", "poolChap.mutulPassword");
                    return;
                }
            }
            NProgress.start();
            storageFactory.addPoolChap($scope.poolChap, function (res) {
                if (res.success) {
                    $scope.getPoolChapList($scope.pool4Chap.poolName);
                    $scope.poolChap.username = null;
                    $scope.poolChap.password = null;
                    $scope.poolChap.mutulUsername = null;
                    $scope.poolChap.mutulPassword = null;
                    $scope.poolChap.mutul = false;
                    $scope.setSuccNoticeMsg("CHAP验证添加成功");
                    $("#modalDialogView").modal('hide');
                } else {
                    $scope.setStorageErrMsg('CHAP验证添加失败');
                }
                NProgress.done();
            });
        };
        //删除chap
        $scope.deletePoolChap = function (chap) {
            chap.poolName = $scope.currentPool.poolName;
            NProgress.start();
            storageFactory.deletePoolChap(chap, function (res) {
                if (res.success) {
                    $scope.getPoolChapList($scope.currentPool.poolName);
                    $scope.setSuccNoticeMsg("删除成功");
                } else {
                    $scope.setStorageErrMsg(response.message);
                }
                NProgress.done();
            });
        };
        /******************************存储池增删改查完****************************************/

        /******************************存储池授权控制****************************************/
        /*show dialog to operate pool's acl*/
        $scope.showPoolAclSet = function(pool){
            $scope.pool = pool;
            $scope.initiator = "";
            $scope.initiatorList = [];
            $scope.unauthInitiatorShow = false;
            $scope.unauthInitiatorList = [];
            $scope.queryPoolAcl(pool.poolName);
            $('#poolAclSet').modal('show');
        };

        /*add approval */
        $scope.addPoolAcl = function(initiator, poolName){
            var aclParams = {initiator:initiator, poolName:poolName};
            $scope._initiator = initiator;
            $scope._poolName = poolName;
            storageFactory.queryPoolAcl(poolName, function (response) {
                if (response.success) {
                    var length = response.data.length;
                    for (var i=0; i<length; i++) {
                        if (response.data[i].approved == 'yes') {
                            $('#sure2AddAcl').modal('show');
                            $scope.type = "approved"; // mark it will add approved or initiator
                            return;
                        }
                    }
                    NProgress.start();
                    storageFactory.addPoolAcl(aclParams, function (response) {
                        if (response.success) {
                            $scope.queryPoolAcl(poolName);
                            $scope.initiator = "";
                            $("#modalDialogView").modal("hide");
                            $scope.setSuccNoticeMsg("添加授权成功");
                        } else {
                            $scope.showDialog(response.message);
                        }
                        NProgress.done();
                    });
                }
            });
        };

        /*query acl */
        $scope.queryPoolAcl = function(poolName){
            storageFactory.queryPoolAcl(poolName, function (response) {
                if (response.success) {
                    $scope.initiators = response.data.sort(byParam('approved', 'str')).reverse();
                    $scope.setPage('initiator','current'); //set current page
                } else {
                    //$scope.showDialog("查询客户端访问控制列表失败");
                    console.log('failed to query pool acl');
                }
            });
        };

        /*remove approval */
        $scope.deletePoolAcl = function(initiator, poolName){
            var aclParams = {initiator:initiator, poolName:poolName};
            NProgress.start();
            //query acl and if the initiator is active , reject operation
            storageFactory.queryPoolAcl(poolName, function (response) {
                if (response.success) {
                    var i = 0;
                    var length = response.data.length ;
                    for (i = 0 ; i < length; i++){
                        if (response.data[i].name == initiator) {
                            if (response.data[i].state == "active") {
                                $scope.showDialog("有客户端正在连接，请先断开连接");
                            }
                            else {
                                storageFactory.deletePoolAcl(aclParams, function (response) {
                                    if (response.success) {
                                        $scope.queryPoolAcl(poolName);
                                    } else {
                                        $scope.setFailNoticeMsg("取消授权失败");
                                    }
                                });
                            }
                            break;
                        }
                    }// end for
                } else {
                    $scope.setFailNoticeMsg("取消授权失败");
                }
            });
            NProgress.done();
        };

        /*show delete initiaotr confirm box*/
        $scope.showDelPoolInitiatorBox = function(poolName, initiator){
            $scope.poolInitiator = {}
            $scope.initPoolName = poolName
            $scope.initiatorName = initiator
            $scope.poolInitiator.sure2delInitiator = ""
            $('#delPoolInitiatorBox').modal('show')
        }

        /*delete initiator */
        $scope.delPoolInitiator = function() {
            if ($scope.poolInitiator.sure2delInitiator == 'YES'){
                $('#delPoolInitiatorBox').modal('hide')
                var params = {initiator:$scope.initiatorName, poolName:$scope.initPoolName};
                NProgress.start();
                storageFactory.delPoolInitiator(params, function (response) {
                    if (response.success) {
                        $scope.queryPoolAcl($scope.initPoolName);
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("删除成功");
                    } else {
                        $scope.showDialog("删除客户端失败，可能是网络不通或者该客户端状态为已连接");
                    }
                    NProgress.done();
                });
            }

        }

        $scope.sure2AddApprovedHide = function() {
            $scope.sure2AddApproved = null;
        }

        $scope.sure2AddApprovedOperate = function() {
            var params = {initiator:$scope._initiator, poolName:$scope._poolName};
            if ($scope.sure2AddApproved == 'YES') {
                NProgress.start();
                if ($scope.type == 'initiator') {
                    storageFactory.addPoolInitiator(params, function (response) {
                        if (response.success) {
                            $scope.queryPoolAcl($scope._poolName);
                            $("#modalDialogView").modal("hide");
                            $scope.setSuccNoticeMsg("添加客户端成功");
                            $scope.initiator = '';
                            $scope.sure2AddApproved = '';
                        } else {
                            $scope.setFailNoticeMsg("添加客户端授权失败");
                        }
                    });
                } else {
                    storageFactory.addPoolAcl(params, function (response) {
                        if (response.success) {
                            $scope.queryPoolAcl($scope._poolName);
                            $("#modalDialogView").modal("hide");
                            $scope.setSuccNoticeMsg("添加授权成功");
                        } else {
                            $scope.setFailNoticeMsg("添加授权失败");
                        }
                    });
                }
                $('#poolAclSet').modal('hide');
                $('#sure2AddAcl').modal('hide');
                $scope.sure2AddApproved = null;
                NProgress.done();
            } else {
                $scope.setAclErrMsg("请输入大写 'YES' 确认");
            }
        }
        /* add initiator */
        $scope.addPoolInitiator = function() {
            var initiator = $scope.initiator;
            var poolName = $scope.currentPool.poolName;
            if (initiator == ""){
                $scope.showTipMsg("名称不能为空。","initiator");
                return ;
            }
            var params = {initiator:initiator, poolName:poolName};
            storageFactory.queryPoolAcl(poolName, function (response) {
                if (response.success) {
                    var length = response.data.length;
                    for (var i=0; i<length; i++) {
                        if (response.data[i].approved == "yes") {
                            $scope._initiator = initiator;
                            $scope._poolName = poolName;
                            $scope.type = "initiator";
                            // there are some initiator has approved , need user make
                            $scope.sure2AddInitiator = true;
                            if ($scope.sure2AddApproved != 'YES') {
                                return;
                            } else {
                                break;
                            }
                        }
                    }
                    NProgress.start();
                    storageFactory.addPoolInitiator(params, function (response) {
                        if (response.success) {
                            $scope.queryPoolAcl(poolName);
                            $("#modalDialogView").modal("hide");
                            $scope.setSuccNoticeMsg("添加客户端成功");
                            $scope.initiator = '';
                            $scope.sure2AddApproved = '';
                        } else {
                            $scope.showDialog("添加授权失败");
                        }
                        NProgress.done();
                    });
                    $('#poolAclSet').modal('hide');
                }
            });
        }

        /******************************存储池授权控制结束****************************************/

        /******************************LUN增删改查****************************************/
        /**
         * 动态查询存储池容量
         */
        /*
         $scope.$watch("alun.poolId", function (poolId) {
         if (poolId) {
         storageFactory.resourcePoolCapacity(poolId, function (response) {
         if (response.success) {
         $scope.alun.capacity_tb_have = (response.data.capacity_bytes / 1073741824).toFixed(2);
         } else {
         $scope.showDialog(response.message);
         $scope.alun.capacity_tb_have = 0;
         }
         });
         } else {
         if ($scope.alun) $scope.alun.capacity_tb_have = 0;
         }
         });
         $scope.getPoolCapacity = function (poolId) {
         if (poolId) {
         storageFactory.resourcePoolCapacity(poolId, function (response) {
         if (response.success) {
         $scope.alun.capacity_tb_have = (response.data.capacity_bytes / 1073741824).toFixed(2);
         } else {
         $scope.showDialog(response.message);
         $scope.alun.capacity_tb_have = 0;
         }
         });
         } else {
         if ($scope.alun) $scope.alun.capacity_tb_have = 0;
         }
         };
         */

        /**
         * 查询存储池列表
         */
        $scope.resourcePoolList = function () {
            //查询列表
            storageFactory.resourcePoolList(function (response) {
                if (response.success) {
                    $scope.apoolList = response.data;
                }
            });
        };
        /**
         * 查询LUN列表
         */
        $scope.getLunList = function () {
            //清除详情
            // $scope.tabChange();
            //查询列表
            storageFactory.queryResourceLun($scope.poolQueryParams, function (response) {
                if (response.success) {
                    $scope.lunList = response.data;

                    if ($scope.alun != undefined && $scope.alun.length != 0) {
                        for (var i = 0; i < $scope.lunList.length; i++) {
                            if ($scope.lunList[i].lunName == $scope.alun.lunName && $scope.lunList[i].poolName == $scope.alun.poolName) {
                                $scope.lunSelect = i + 1;
                                $scope.currentLun = $scope.lunList[i];
                            }
                        }

                        var lunListHeight = $("#lunList").height();
                        var pageRecorderNum = Math.floor((lunListHeight-37)/38) ;
                        $scope.lunGotoPageIndex = Math.ceil( $scope.lunSelect / pageRecorderNum );
                        $scope.alun.length = 0;
                        $scope.gotoPage('lun');
                    } else {
                        $scope.setPage('lun','current');
                    }
                    //$scope.hideSnapTable();
                }
            });
        };
        /**
         * 查询Block列表
         */
        $scope.getBlockList = function () {
            //清除详情
            //$scope.tabChange();
            //查询列表
            storageFactory.queryResourceBlock($scope.poolQueryParams, function (response) {
                if (response.success) {
                    $scope.blockList = response.data;

                    if ($scope.selectedBlock != undefined && $scope.selectedBlock.length != 0) {
                        for (var i = 0; i < $scope.blockList.length; i++) {
                            if ($scope.blockList[i].lunName == $scope.selectedBlock.lunName &&
                                $scope.blockList[i].poolName == $scope.selectedBlock.poolName) {
                                $scope.blockSelect = i + 1;
                                $scope.currentBlock = $scope.blockList[i];
                            }
                        }

                        var blockListHeight = $("#blockList").height();
                        var pageRecorderNum = Math.floor((blockListHeight-37)/38);
                        $scope.blockGotoPageIndex = Math.ceil( $scope.lunSelect / pageRecorderNum );
                        $scope.selectedBlock.length = 0;
                        $scope.gotoPage('block');
                    } else {
                        $scope.setPage('block','current');
                    }

                    $scope.hideSnapTable();
                }
            });
        };

        /**
         * 带单位的大小转为字节数
         */
        $scope.unitSizeToBytes = function (unitValue) {
            //清除详情
            var array=new Array('Byte','KB','MB','GB','TB');
            var index = -1;
            for(var i = 0; i < array.length; i++){ //记录所在的位置
                if(unitValue.indexOf(array[i])!=-1){
                    index=i;
                    break;
                }
            };
            if (index == -1 || index < 2){
                // 单位不合法，至少需要MB
                return -1
            };
            var size = parseFloat(unitValue.substring(0,(unitValue.length-2))); //得到纯数字
            if (isNaN(size)){
                // 单位前面应为数据格式
                return -1
            };
            size *= Math.pow(1024, index)
            size = size.toFixed(0)
            return size;
        };

        /**
         * 字节数转为带单位的大小
         */
        $scope.byteTosUnitSize = function (byteValue) {
            if (!byteValue || isNaN(byteValue)) {
                return "";
            };
            var array = new Array('B','KB','MB','GB','TB');
            var index = -1;
            var value = byteValue;
            for (var i = 0; i < array.length; i++) {
                if (value < 1024) {
                    index = i;
                    break;
                }
                value /= 1024;
            }
            return (value).toFixed(2) + array[index]
        };
        $scope.byteTosUnitSizeObj = function(byteValue) {
            if (!byteValue || isNaN(byteValue)) {
                return {};
            };
            var array = new Array('B','KB','MB','GB','TB');
            var index = -1;
            var value = byteValue;
            for (var i = 0; i < array.length; i++) {
                if (value < 1024) {
                    index = i;
                    break;
                }
                value /= 1024;
            }
            return { "size":(value).toFixed(0), "unit":array[index]}
        }

        //添加或修改LUN
        $scope.saveOrUpdateLun = function () {
            if ($scope.lunRollbacking){
                $("#modalDialogView").modal("hide");
                return;
            }
            if (!$scope.alun.lunName) {
                $scope.showTipMsg("LUN ID不能为空", "alun.lunName");
                return;
            }
            if (isNaN($scope.alun.lunName)) {
                $scope.showTipMsg("LUN ID 必须为数字！", "alun.lunName");
                return;
            }
            if ($scope.alun.lunName > 254 || $scope.alun.lunName < 1) {
                $scope.showTipMsg("LUN ID 应为1至254之间的数字！", "alun.lunName");
                return;
            }
            if (!$scope.alun.poolName) {
                $scope.showTipMsg("请选择存储池！", "alun.poolName");
                return;
            }
            if (!$scope.alun.capacity_display) {
                $scope.showTipMsg("LUN容量不能为空", "alun.capacity_display");
                return;
            }
            if (!(parseFloat($scope.alun.capacity_display)%1 === 0)){
                $scope.showTipMsg("容量输入必须为整数", "alun.capacity_display");
                return;
            }
            var capacity_bytes = $scope.unitSizeToBytes($scope.alun.capacity_display + $scope.alun.sizeUnit)
            if (capacity_bytes < Math.pow(1024, 2)) {
                $scope.showTipMsg("容量最小支持 1MB", "alun.capacity_display");
                return;
            }
            if (capacity_bytes > (256*Math.pow(1024, 4))) {
                $scope.showTipMsg("容量最大支持 256TB", "alun.capacity_display");
                return;
            }

            var lun;
            //$("#modalDialogView").modal("hide");
            if ($scope.alun.existed) {
                if (capacity_bytes <= $scope.alun.capacity_bytes){
                    $scope.showTipMsg("容量不可小于或等于原容量的大小：" + $scope.byteTosUnitSize($scope.alun.capacity_bytes), "alun.capacity_display");
                    return;
                };

                lun = {
                    lunName: $scope.alun.lunName,
                    poolName: $scope.alun.poolName,
                    capacity_bytes: capacity_bytes
                }
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.updateResourceLun(lun, function (response) {
                    if (response.success) {
                        //获取LUN列表
                        $scope.getLunList();
                        //alert("修改成功！");
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("容量调整成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                    $scope.isAdd = false;
                });
            } else {
                lun = {
                    lunName: $scope.alun.lunName,
                    poolName: $scope.alun.poolName,
                    capacity_bytes: capacity_bytes
                }
                spinner.show();
                $scope.isAdd = true;
                NProgress.start();
                storageFactory.addResourceLun(lun, function (response) {
                    spinner.hide();
                    $scope.isAdd = false;
                    if (response.success) {
                        //获取LUN列表
                        $scope.getLunList();
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("创建成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                });
            }
        };

        // 块设备操作
        $scope.operateBlock = function () {
            if (!$scope.selectedBlock.lunName) {
                $scope.showTipMsg("名称不可为空", "selectedBlock.lunName");
                return;
            }
            // 不能含有@字符
            if ($scope.selectedBlock.lunName.indexOf("@") >= 0) {
                $scope.showTipMsg("不可包含'@'符号", "selectedBlock.lunName");
                return;
            }
            // 不能含有#字符
            if ($scope.selectedBlock.lunName.indexOf("#") >= 0) {
                $scope.showTipMsg("不可包含'#'符号", "selectedBlock.lunName");
                return;
            }
            // 不能以'-'字符开头
            if ($scope.selectedBlock.lunName.substring(0, 1) == "-") {
                $scope.showTipMsg("不可以'-'开始", "selectedBlock.lunName");
                return;
            }
            if (!$scope.selectedBlock.poolName) {
                $scope.showTipMsg("请选择存储池", "selectedBlock.poolName");
                return;
            }
            if (!$scope.selectedBlock.capacity_display) {
                $scope.showTipMsg("LUN容量不能为空", "selectedBlock.capacity_display");
                return;
            }
            if (!(parseFloat($scope.selectedBlock.capacity_display)%1 === 0)){
                $scope.showTipMsg("容量输入必须为整数", "selectedBlock.capacity_display");
                return;
            }
            var capacity_bytes = $scope.unitSizeToBytes($scope.selectedBlock.capacity_display + $scope.selectedBlock.sizeUnit);
            if (capacity_bytes < Math.pow(1024, 2)) {
                $scope.showTipMsg("容量最小支持 1MB", "selectedBlock.capacity_display");
                return;
            }
            if (capacity_bytes > (256*Math.pow(1024, 4))) {
                $scope.showTipMsg("容量最大支持 256TB", "selectedBlock.capacity_display");
                return;
            }

            var lun;
            //$("#modalDialogView").modal("hide");
            if ($scope.selectedBlock.existed) {
                if (capacity_bytes <= $scope.selectedBlock.capacity_bytes){
                    $scope.showTipMsg("容量不可小于或等于原容量的大小：" + $scope.byteTosUnitSize($scope.selectedBlock.capacity_bytes), "selectedBlock.capacity_display");
                    return;
                };
                lun = {
                    lunName: $scope.selectedBlock.lunName,
                    poolName: $scope.selectedBlock.poolName,
                    capacity_bytes: capacity_bytes
                }
                NProgress.start();
                $scope.isAdd = true;
                storageFactory.updateResourceBlock(lun, function (response) {
                    if (response.success) {
                        //获取LUN列表
                        $scope.getBlockList();
                        //alert("修改成功！");
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("容量调整成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                    $scope.isAdd = false;
                });
            } else {
                lun = {
                    lunName: $scope.selectedBlock.lunName,
                    poolName: $scope.selectedBlock.poolName,
                    capacity_bytes: capacity_bytes
                }
                spinner.show();
                $scope.isAdd = true;
                NProgress.start();
                storageFactory.addResourceBlock(lun, function (response) {
                    spinner.hide();
                    $scope.isAdd = false;
                    if (response.success) {
                        //获取LUN列表
                        $scope.getBlockList();
                        $("#modalDialogView").modal("hide");
                        $scope.setSuccNoticeMsg("创建块设备成功");
                    } else {
                        $scope.setStorageErrMsg(response.message);
                    }
                    NProgress.done();
                });
            }
        };


        /**
         * 删除LUN
         */
        $scope.goDeleteLun = function () {
            if ($scope.snapOverLun){
                $("#modalDialogView").modal("hide");
                return;
            }

            //$("#modalDialogView").modal("hide");
            if ($scope.alun.sure2deleteLun == "YES") {
                $scope.isAdd = true;
                // if some initiator has connect the pool ,need user to sure delete the lun again
                if (!$scope.sure2deleteLunAgain) {
                    NProgress.start();
                    storageFactory.queryPoolAcl($scope.lun4Delete.poolName, function (response) {
                        if (response.success) {
                            var length = response.data.length;
                            for (var i=0; i< length; i++) {
                                if (response.data[i].state == "active"){
                                    $scope.sure2deleteLunAgain = true;
                                    $scope.isAdd = false;
                                    return;
                                }
                            }
                            $scope.isAdd = true;
                            storageFactory.deleteResourceLun($scope.lun4Delete, function (response) {
                                if (response.success) {
                                    $scope.lun4Delete.disabled = true;
                                    $scope.alun.length = 0;
                                    //获取LUN列表
                                    $scope.getLunList();
                                    $("#modalDialogView").modal("hide");
                                    $scope.setSuccNoticeMsg("删除成功");
                                } else {
                                    $scope.setStorageErrMsg(response.message);
                                }
                                $scope.isAdd = false;
                                $scope.sure2deleteLunAgain = false;
                            });
                        }
                    });
                    NProgress.done();
                } else {
                    if ($scope.alun.sure2deleteLunAgain == 'YES') {
                        NProgress.start();
                        storageFactory.deleteResourceLun($scope.lun4Delete, function (response) {
                            if (response.success) {
                                //获取LUN列表
                                $scope.getLunList();
                                $("#modalDialogView").modal("hide");
                            } else {
                                $scope.setStorageErrMsg(response.message);
                            }
                            $scope.isAdd = false;
                            NProgress.done();
                        });
                    }
                }
            } else {
                $scope.setStorageErrMsg("请输入大写 'YES' 以确定删除操作!");
            }
            $scope.sure2deleteLunAgain = false;
        };


        /**
         * 删除Block
         */
        $scope.goDeleteBlock = function () {
            if ($scope.snapOverLun){
                $("#modalDialogView").modal("hide");
                return;
            }
            //$("#modalDialogView").modal("hide");
            if ($scope.selectedBlock.sure2deleteBlock == "YES") {
                $scope.isAdd = true;
                // if some initiator has connect the pool ,need user to sure delete the lun again
                if (!$scope.sure2deleteBlockAgain) {
                    storageFactory.queryPoolAcl($scope.block4Delete.poolName, function (response) {
                        if (response.success) {
                            var length = response.data.length;
                            for (var i=0; i< length; i++) {
                                if (response.data[i].state == "active"){
                                    $scope.sure2deleteBlockAgain = true;
                                    $scope.isAdd = false;
                                    return;
                                }
                            }
                            NProgress.start();
                            $scope.isAdd = true;
                            storageFactory.deleteResourceBlock($scope.block4Delete, function (response) {
                                if (response.success) {
                                    $scope.block4Delete.disabled = true;
                                    $scope.selectedBlock.length = 0;
                                    //获取LUN列表
                                    $scope.getBlockList();
                                    $("#modalDialogView").modal("hide");
                                    $scope.setSuccNoticeMsg("删除成功");
                                } else {
                                    $scope.setStorageErrMsg(response.message);
                                }
                                $scope.isAdd = false;
                                NProgress.done();
                            });
                        }

                    });
                } else {
                    if ($scope.selectedBlock.sure2deleteBlockAgain == 'YES') {
                        NProgress.start();
                        storageFactory.deleteResourceBlock($scope.block4Delete, function (response) {
                            if (response.success) {
                                //获取BLOCK列表
                                $scope.getBlockList();
                                $("#modalDialogView").modal("hide");
                                $scope.setSuccNoticeMsg("删除成功");
                            } else {
                                $scope.setStorageErrMsg(response.message);
                            }
                            $scope.isAdd = false;
                            NProgress.done();
                        });
                    }
                }
            } else {
                $scope.setStorageErrMsg("请输入大写 'YES' 以确定删除操作!");
            }
            $scope.sure2deleteBlockAgain = false;
        };

        /******************************LUN增删改查完****************************************/

        /*********************************详情图形展示*******************************************/
        $(window).resize(function () {
            if ($scope.poolOrLun && $scope.poolTrIdTemp && $("#chartDiv").is(":visible")) {
                $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
                $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
            }
        });
        /**
         * 双击显示详情
         */
        $scope.dblClick = function (id, pool) {
            $scope.hideAclSet();
            var _this = $("#poolTr"+id);
            if ($scope.poolTrIdTemp) {
                var _that = $(".rrr");
                if ($scope.poolTrIdTemp == id && _that.length > 0) {
                    $("#chartDiv").hide();
                    _that.remove();
                    return;
                }
                _that.remove();
            }
            var content = "<tr class=rrr><td colspan=9 style='height:430px;background-color:#253143;'></td></tr>";
            _this.after(content);
            $("#chartDiv").show().css({left: _this.offset().left, top: _this.offset().top + 37, width: _this.width()});
            $scope.poolOrLun = pool;
            $scope.poolTrIdTemp = id;
            $("#chartDiv").height(430);
            setTimeout($scope.canvas, 10);
        };
        /**
         * lun双击显示详情
         */
        /*
         $scope.lunDblClick = function (id, lun) {
         var _this = $("#lunTr"+id);
         if ($scope.lunTrIdTemp) {
         var _that = $(".lrrr");
         if ($scope.lunTrIdTemp == id && _that.length > 0) {
         $("#chartDiv").hide();
         _that.remove();
         return;
         }
         _that.remove();
         }
         var content = "<tr class=lrrr><td colspan=9 style='height:180px;background-color:#253143;'></td></tr>";
         _this.after(content);
         $("#chartDiv").show().css({left: _this.offset().left, top: _this.offset().top + 37, width: _this.width()});
         $scope.poolOrLun = lun;
         $scope.lunTrIdTemp = id;
         $("#chartDiv").height(180);
         setTimeout($scope.canvas, 10);
         };
         */

        /**
         * 绘制详情图
         */
        $scope.canvas = function () {
            //集群IOPS
            $scope.iopsChart = echarts.init(document.getElementById("iops"));
            //集群宽度
            $scope.mbpsChart = echarts.init(document.getElementById("mbps"));
            //时延
            //if (!$scope.capacityChart) $scope.capacityChart = echarts.init(document.getElementById("capacity"));
            //图形请求参数
            var queryParmas;
            if ($scope.poolOrLun.lunName) {
                queryParmas = {
                    "lunName": $scope.poolOrLun.lunName,
                    "from": "-1w",
                    "target": "iops.rw mbps.rw capacity.rw"
                }
                storageFactory.lunPref(queryParmas, function (response) {
                    if (response.success) {
                        var time = [];
                        var iops = [];
                        var mbps = [];
                        var capacity = [];
                        var datas = response.data.datapoints;
                        var maxIops = 0, maxMbps = 0;
                        for (var i = 0; i < datas.length; i++) {
                            time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                            iops.push(datas[i][1]);
                            mbps.push(parseFloat((datas[i][2] / 1024).toFixed(2)));
                            capacity.push((datas[i][3]/ (1024 * 1024 * 1024)).toFixed(2));
                            if (datas[i][1] > maxIops) maxIops = datas[i][1];
                            if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                        }
                        var interval = Math.round(datas.length / 16);
                        maxMbps = parseInt((maxMbps/1024)) + 1;
                        $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                        $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                        //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                    }
                });
            } else {
                queryParmas = {
                    "poolId": $scope.poolOrLun.poolId,
                    "from": "-1w",
                    "target": "iops.rw mbps.rw capacity.rw"
                }
                storageFactory.poolPref(queryParmas, function (response) {
                    if (response.success) {
                        var time = [];
                        var iops = [];
                        var mbps = [];
                        var capacity = [];
                        var datas = response.data.datapoints;
                        var maxIops = 0, maxMbps = 0;
                        for (var i = 0; i < datas.length; i++) {
                            time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                            iops.push(datas[i][1]);
                            mbps.push(parseFloat((datas[i][2]/1024).toFixed(2)));
                            capacity.push((datas[i][3]/1073741824).toFixed(2));
                            if (datas[i][1] > maxIops) maxIops = datas[i][1];
                            if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                        }
                        var interval = Math.round(datas.length / 8);
                        maxMbps = parseInt((maxMbps/1024)) + 1;
                        $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                        $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                        //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                    }
                });
            }
        };

        //绘制使用空间图
        var fSummaryOption = function(usedSpace,freeSpace){
            return {
                calculable : false,
                series : [
                    {
                        name:'存储资源',
                        type:'pie',
                        center:['50%','50%'],
                        radius : ['60%', '80%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false,
                                    formatter : function (a,b,c){
                                        return 100 - c + '%'
                                    },
                                    textStyle: {
                                        baseline : 'top'
                                    }
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {
                                name: "使用空间",
                                value:usedSpace,
                                itemStyle:{
                                    normal:{
                                        color:'#488FD2',
                                    }
                                }
                            },{
                                name: "剩余空间",
                                value:freeSpace,
                                itemStyle:{
                                    normal:{
                                        color:'#F1F0F0'
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
        }

        //集群iops
        var iopsOption = function(times,values,interval,max){
            return {
                tooltip : {
                    show:false,
                    trigger: 'axis'
                },
                grid:{
                    x:40,
                    y:20,
                    x2:20,
                    y2:30,
                    borderWidth:0
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap: true,
                        axisLine: {
                            show: true,
                            lineStyle: { //x轴线样式
                                color: '#728092',
                                width: 0
                            }
                        },
                        axisTick: { //x坐标轴小标记
                            show: true,
                            onGap: false,
                            lineStyle: {
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: { //坐标轴文本标签选项
                            show: true,
                            interval: interval || 3, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        data : times
                    }
                ],
                yAxis : [
                    {
                        name:'IOPS',
                        type : 'value',
                        precision : 2,
                        max:max || 200,
                        min:0,
                        splitNumber:4,
                        axisLine: {
                            show: true,
                            lineStyle: { //y轴线样式
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 3, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#728092'
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'line',
                        data:values,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                color:'#04CA4F',
                                areaStyle: {
                                    color:'#537172',
                                    type: 'default'
                                }
                            }
                        }
                    }
                ]
            };
        }

        //集群io宽带
        var mbpsOption = function(times,values,interval,max){
            return {
                tooltip : {
                    show:false,
                    trigger: 'axis'
                },
                grid:{
                    x:40,
                    y:20,
                    x2:20,
                    y2:30,
                    borderWidth:0
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        axisLine: {
                            show: true,
                            lineStyle: { //x轴线样式
                                color: '#728092',
                                width: 0
                            }
                        },
                        axisTick: { //x坐标轴小标记
                            show: true,
                            onGap: false,
                            lineStyle: {
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: { //坐标轴文本标签选项
                            show: true,
                            interval: interval || 0, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        data :times
                    }
                ],
                yAxis : [
                    {
                        name:'MBps',
                        type : 'value',
                        precision : 2,
                        boundaryGap : [0, 0],
                        max:max || 100,
                        min:0,
                        splitNumber:4,
                        axisLine: {
                            show: true,
                            lineStyle: { //y轴线样式
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 3, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#728092'
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'line',
                        data:values,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                color:'#00ACFF',
                                areaStyle: {
                                    color:'#305977',
                                    type: 'default'
                                }
                            }
                        }
                    }
                ]
            };
        }

        //容量
        var capacityOption = function(times,values,max,interval){
            return {
                tooltip : {
                    show:false,
                    trigger: 'axis'
                },
                grid:{
                    x:40,
                    y:20,
                    x2:20,
                    y2:30,
                    borderWidth:0
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        axisLine: {
                            show: true,
                            lineStyle: { //x轴线样式
                                color: '#728092',
                                width: 0
                            }
                        },
                        axisTick: { //x坐标轴小标记
                            show: true,
                            onGap: false,
                            lineStyle: {
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: { //坐标轴文本标签选项
                            show: true,
                            interval: interval || 3, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        data :times
                    }
                ],
                yAxis : [
                    {
                        name:'TB',
                        type : 'value',
                        precision : 2,
                        max:max || 100,
                        min:0,
                        splitNumber:4,
                        axisLine: {
                            show: true,
                            lineStyle: { //y轴线样式
                                color: '#728092',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 3, //坐标轴显示全部
                            rotate: 0, //坐标轴顺时针45°显示
                            textStyle: {
                                color: '#728092',
                                fontSize:10
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#728092'
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'line',
                        data:values,
                        symbol:'none',
                        itemStyle: {
                            normal: {
                                color:'#00ACFF',
                                areaStyle: {
                                    color:'#305977',
                                    type: 'default'
                                }
                            }
                        }
                    }
                ]
            };
        }
        /*********************************详情图形展示完*******************************************/
    }]);
