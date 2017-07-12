/**
 * created by huangminxuan 2016/10/09
 */
(function () {
    'use strict';
    angular.module('sdsomwebApp').controller('blockStorageCtrl', blockStorageCtrl);

    blockStorageCtrl.$inject = ['$rootScope', '$scope', 'storageFactory', 'mainFactory', 'configFactory'];

    function blockStorageCtrl($rootScope, $scope, storageFactory, mainFactory, configFactory) {
        baseModal.call(this, $rootScope, $scope);
        var _this = this;
        $scope.volumePage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 9}
        $scope.volumeSnapPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 4}
        $scope.volumeAclPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 6}
        $scope.targetPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 9}
        $scope.targetVolumePage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 6}       
        $scope.targetAclPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 6}      
        $scope.initiatorPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 9}
        $scope.initiatorTgtPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 6}
        $scope.rbdClientPage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 9}
        $scope.clientVolumePage = {'totalCount': '=', 'pageCount':'=', 'currentPage':1, 'pageno': 1,
                          'pagesize': 6}
        //ip正则
        $scope.IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
        var FULL_IP_REGEXP = /^(255\.){3}255$/;
        var HOST_ID_NAME_REGEXP = /^[a-zA-Z][a-zA-Z]{0,11}$/;

        _this.mapType = ['Lun', 'Block'];
        _this.needToGetPool = ['cloneVolumeModal', 'addLunModal'];
        _this.targetPattern = ['读写','只读'];
        _this.needToGetTarget = ['addInitiatorModal'];
        _this.targetNamePrefix = "iqn.2014-10.com.szsandstone:storage-";
        _this.volumeType = ['blk', 'iscsi'];


        $scope.isSnapRollingback = false;
        _this.sure2deleteLunAgain = false;

        _this.exhibition = exhibition;       //小导航切换显示
        _this.showModal = showModal;         //显示弹出框模板
        _this.getPoolList = getPoolList;

        /*******          物理池          *******/
        setTimeout(function(){
            getPoolList(_this, storageFactory);
            $scope.getAllHostName();
        }, 3000)
        

        /****** 卷 ******/
        _this.lunSelected                = lunSelected;          //选中当前lun
        _this.deleteLun                  = deleteLun;            //删除选中lun
        _this.createSnapshot             = createSnapshot;       //创建快照
        _this.deleteSnapshot             = deleteSnapshot;       //删除快照
        _this.updateDescribe             = updateDescribe;       //修改快照描述
        _this.updateVolume               = updateVolume;         //修改卷的大小
        _this.targetSelected             = targetSelected;       //选中当前target
        _this.aclSelected                = aclSelected;          //选中当前
        _this.createVolume               = createVolume;         //创建卷
        _this.showMapOrUmap              = showMapOrUmap;         //显示映射或解除映射弹窗
        _this.mapOrUnmapVolume           = mapOrUnmapVolume;      //映射或解除映射
        _this.rollbackSnapshot           = rollbackSnapshot;      //快照回滚
        _this.cloneVolume                = cloneVolume;           //克隆卷
        _this.cancelSnap                 = cancelSnap;            //重置克隆数据
        _this.createTarget               = createTarget;          //创建ISCSI目标
        _this.deleteTarget               = deleteTarget;          //删除ISCSI目标
        _this.addTargetInitiator         = addTargetInitiator;    //添加客户端到target
        _this.addTargetChap              = addTargetChap;         //添加chap
        _this.delTargetChap              = delTargetChap;         //删除chap
        _this.delTargetAcl               = delTargetAcl;          //取消授权
        _this.addTargetAcl               = addTargetAcl;          //授权
        _this.delTargetInitiator         = delTargetInitiator;    //删除ISCSI客户端
        // _this.getRbdClient               = getRbdClient;          //获取rbd客户端
        _this.rbdClientSelected          = rbdClientSelected;     //获取当前块设备客户端下的rbd
        _this.showMapSnap                = showMapSnap;           //显示快照映射弹框
        _this.mapSnap                    = mapSnap;               //快照映射
        _this.unmapSnap                  = unmapSnap;             //解除快照映射
        _this.showAddTarget              = showAddTarget;         //显示添加target弹窗
        _this.addInitiator               = addInitiator;          //添加启动器
        _this.showBindTargetModal        = showBindTargetModal;   //显示绑定target弹窗
        _this.deleteInitiator            = deleteInitiator;       //删除启动器
        _this.volumesMapTargetModal      = volumesMapTargetModal;  //卷批量映射为target
        // _this.getPoolValumes             = getPoolValumes;        //获取当前存储池下的卷
        _this.showFeatureSelected        = showFeatureSelected;    //卷与target绑定选中
        _this.volumesMapTarget           = volumesMapTarget;       //多个卷批量映射给一个target
        _this.showDetachOrAttach         = showDetachOrAttach;     //target批量挂载或解除挂载多个节点
        _this.attachOrDetachNodeSelected = attachOrDetachNodeSelected  //target批量挂载或解除挂载多个节点选中
        _this.attachOrDetachNode         = attachOrDetachNode       //挂载或解除挂载



        /** 小导航切换显示 **/
        function exhibition(event, view) {
            var current = $(event.currentTarget);
            
            // 清除 background-color 颜色
            $('#clearBtn').find('button').css('background-color', '#DAE3E8');
            current.css('background-color', '#fff');

            switch (view) {
                case 'configView':
                    break;
                case 'poolView':
                    getPoolInfo();
                    break;
                case 'lunView':
                    $scope.currentVolume = undefined;
                    $scope.getVolumes();
                    break;
                case 'targetView':
                    $scope.currentTarget = undefined;
                    $scope.getTargets();
                    
                    setTimeout(function(){
                        $scope.getVolumes();
                    }, 2000);
                    break;
                case 'initiatorView':
                    $scope.currentAcl = undefined;
                    $scope.getAcls();
                    setTimeout(function(){
                        $scope.getTargets();
                    }, 2000);
                    break;
                case 'blockView':
                    $scope.currentRbd = undefined;
                    $scope.getRbdClient();
                    break;
            }

            this.viewCtrl = view;
        }

        /** 获取节点名及内网ip **/
        $scope.getAllHostName = function(){
            storageFactory.getAllHostName({}, function(response){
                if(response.success){
                    _this.hostInfoList = response.data.allResult;
                    _this.hostList = new Array();
                    for(var i=0; i<_this.hostInfoList.length; i++){
                        _this.hostList.push(_this.hostInfoList[i].hostid)
                    }
                }
            });
        }

        /** IOPS **/
        // function iopsCapacity() {
        //     var pieCapacity = echarts.init(document.getElementById('iopsPhysicalHost'));
        //     pieCapacity.setOption(getCapacityPieOption(30, 70, '98%'));
        // }

        /**创建卷时选择存储池刷选副本数**/
        $scope.selectPoolCreateVolume = function (pool) {
            $scope.block.CreateVolumeCurrentPool = {};
            if (pool){
                for (var i = 0; i < $scope.block.poolList.length; i++){
                    if ($scope.block.poolList[i]['poolName'] == pool.poolName) {
                        $scope.block.CreateVolumeCurrentPool = $scope.block.poolList[i];
                        return;
                    }
                }
            }
        }

        /** 获取卷数据列表 **/
        $scope.getVolumes = function(pageSize, goPage) {
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.volumePage.pagesize;
            }
            
            if(!_this.poolList){
                getPoolList(_this, storageFactory)
            }
            storageFactory.getVolumes(queryParams, function (response) {
                if (response.success) {
                    _this.lunList = response.data.allResult;
                    _this.currentPageLunList = response.data.results;
                    $scope.volumePage.pageSize = response.data.pagesize || $scope.volumePage.pagesize;
                    $scope.volumePage.currentPage = queryParams.pageno;
                    $scope.volumePage.totalCount = response.data.totalCount;

                    if ($scope.currentVolume == undefined) {
                        $scope.currentVolume = _this.currentPageLunList[0];

                        setTimeout(function(){
                            if ($('#lun1').siblings().hasClass('bcf5')) {
                                $('#lun1').siblings().removeClass('bcf5');
                            }
                            $('#lun1').addClass('bcf5');
                        }, 500);

                        $scope.querySnapshot();
                        if ($scope.currentVolume.type != 'blk'){
                            $scope.queryVolumeAcls();
                        }else{
                            queryVolumeClient(_this, $scope.currentVolume, storageFactory);
                        }
                    }
                }
            });
        }

        /** lun选中操作 **/
        function lunSelected(event, currentVolume) {
            var current = $(event.currentTarget);
            if (current.siblings().hasClass('bcf5')) {
                current.siblings().removeClass('bcf5');
            }
            current.addClass('bcf5');
            $scope.currentVolume = currentVolume;
            $scope.currentVolume.capacity_display = byteTosUnitSizeObj(currentVolume.capacity_bytes).size;
            $scope.currentVolume.sizeUnit = byteTosUnitSizeObj(currentVolume.capacity_bytes).unit;
            $scope.querySnapshot();
            if (currentVolume.type != 'blk'){
                $scope.queryVolumeAcls();
            }else{
                queryVolumeClient(_this, currentVolume, storageFactory);
            }
            
        }
        /** 查询当前LUN下所有快照信息 **/
        $scope.querySnapshot = function (pageSize, goPage) {
            if ($scope.currentVolume == undefined) {
                return;
            }
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.volumeSnapPage.pagesize;
            }
            var currentVolume = $scope.currentVolume;
            queryParams.poolId = currentVolume.poolId;
            queryParams.poolName = currentVolume.poolName;
            queryParams.lunName = currentVolume.volumeName;
            try{
                storageFactory.queryLunSnapshot(queryParams, function (response) {
                    if (response.success == 1) {
                        _this.snapshotList = response.data.allResults;
                        _this.currentPageSnapList = response.data.results;
                        $scope.volumeSnapPage.pageSize = response.data.pagesize || $scope.volumeSnapPage.pagesize;
                        $scope.volumeSnapPage.currentPage = queryParams.pageno;
                        $scope.volumeSnapPage.totalCount = response.data.totalCount;
                        if (_this.snapshotList.length > 0) {
                            _this.isExistSnapshot = true;
                        } else {
                            _this.isExistSnapshot = false;
                        }
                    }
                });
            }catch(err){
            }
        }


        /** 查询当前卷下所有启动器信息 **/
        $scope.queryVolumeAcls = function (pageSize, goPage){
            var currentVolume = $scope.currentVolume;
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.volumeAclPage.pagesize;
            }
            _this.volumeAclList = new Array()
            queryParams.volumeName = currentVolume.volumeName;
            try{
                storageFactory.getVolumeAcls(queryParams, function (response){
                    if (response.success == 1){
                        _this.volumeAclList = response.data.allResult;
                        _this.currentPageVolumeAcl = response.data.results;
                        $scope.volumeAclPage.pageSize = response.data.pagesize || $scope.volumeAclPage.pagesize;
                        $scope.volumeAclPage.currentPage = queryParams.pageno;
                        $scope.volumeAclPage.totalCount = response.data.totalCount;
                        _this.isActiveVolumeAcl = false;
                        for (var i = 0; i < _this.volumeAclList.length; i++) {
                            if (_this.volumeAclList[i].state == "active") {
                                _this.isActiveVolumeAcl = true;
                            }
                        }
                    }
                });
            }catch(err){}
        }

        /** 删除选中lun **/
        function deleteLun() {
            if (_this.modalData.status == '正在删除') {
                obj.disabled = true;
            }
            if (_this.isYesConfirm == "YES") {
                if (_this.isActiveVolumeAcl && _this.isYesAgainConfirm != 'YES'){
                    if (_this.sure2deleteLunAgain){
                        setStorageErrMsg($scope, "请输入大写 'YES' 以确定删除操作!");
                    } 
                    _this.sure2deleteLunAgain = true;
                    return;
                }else{
                    $scope.isAdd = true;
                    // if some initiator has connect the pool ,need user to sure delete the lun again
                    var params = {'volumeName': _this.modalData.volumeName,
                                  'poolName': _this.modalData.poolName}
                    NProgress.start();
                    storageFactory.deleteVolume(params, function (response) {
                        if (response.success) {
                            //获取LUN列表
                            $scope.currentVolume = undefined;
                            $scope.getVolumes();
                            $("#deleteLunModal").modal("hide");
                            $scope.setSuccNoticeMsg("删除成功");
                        } else {
                            $scope.setFailNoticeMsg('删除失败');
                        }
                        $scope.isAdd  = false;
                        _this.sure2deleteLunAgain = false
                        NProgress.done();
                    });
                }
            }else {
                setStorageErrMsg($scope, "请输入大写 'YES' 以确定删除操作!");
                }
            _this.sure2deleteLunAgain = false
        }


        /** 创建卷 **/
        function createVolume() {
            if (!_this.pool) {
                $scope.showTipMsg("请选择存储池！", "_this.poolName");
                return;
            }
            if (!_this.volumeName) {
                $scope.showTipMsg("请输入卷名！", "_this.volumeName");
                return;
            }
            if (!_this.replicated) {
                $scope.showTipMsg("请选择副本数", "_this.replicated");
            }
            if (!_this.capacity_display) {
                $scope.showTipMsg("LUN容量不能为空", "_this.capacity_display");
                return;
            }
            if (!(parseFloat(_this.capacity_display)%1 === 0)){
                $scope.showTipMsg("容量输入必须为整数", "_this.capacity_display");
                return;
            }
            var capacity_bytes = unitSizeToBytes(_this.capacity_display + _this.sizeUnit)
            if (capacity_bytes < Math.pow(1024, 2)) {
                $scope.showTipMsg("容量最小支持 1MB", "_this.capacity_display");
                return;
            }
            if (capacity_bytes > (256*Math.pow(1024, 4))) {
                $scope.showTipMsg("容量最大支持 256TB", "_this.capacity_display");
                return;
            }
            for(var i=0;i<_this.poolList.length;i++){
                if(_this.poolList[i].poolName == _this.pool.poolName){
                    var poolId = _this.poolList[i].logicPoolId[_this.replicated];
                }
            }
            var volume = {
                volumeName: _this.volumeName,
                poolName: _this.pool.poolName,
                capacity_bytes: capacity_bytes,
                replicated: _this.replicated,
                poolId: poolId
            }
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.createVolume(volume, function(response){
                if (response.success){       
                    $('#addLunModal').modal('hide');
                    $scope.setSuccNoticeMsg("卷创建成功");
                }else {
                    $scope.setFailNoticeMsg('卷创建失败');
                    }
                _this.volumeName = '';
                _this.poolName = '';
                _this.capacity_display = '';
                $scope.isAdd = false;
                NProgress.done();
                $scope.getVolumes()
            })
        }

        /** 显示映射或解除映射弹窗 **/
        function showMapOrUmap(event, currentVolume){
            _this.isYesConfirm = '';
            $scope.getTargets()
            getPoolList(_this, storageFactory)
            _this.modalData = {};
            _this.currentVolume = currentVolume
            $( "#" + 'mapOrUmapVolumeModal' ).modal("show");
            
        }

        /** 显示映射快照或解除映射弹窗 **/
        function showMapSnap(event, currentSnap){
            _this.isYesConfirm = '';
            $scope.getTargets()
            getPoolList(_this, storageFactory)
            _this.modalData = {};
            _this.currentSnap = currentSnap
            _this.currentSnap.hadMap = false
            var name = currentSnap.lunName + '@' + currentSnap.snapName
            for (var i=0; i< $scope.block.lunList.length; i++){
                if(name == $scope.block.lunList[i].volumeName){
                    _this.currentSnap.hadMap = true 
                }
            }
            $( "#" + 'mapOrUmapSnapModal' ).modal("show");
        }

        /**快照映射为lun**/
        function mapSnap(){
            var modalData = _this.modalData;
            var data = {'volumeName': _this.currentSnap.lunName + '@' + _this.currentSnap.snapName,
                        'targetName': modalData.target.name}
            storageFactory.mapVolumeAsLun(data, function(response){
                if (response.success){
                    $('#mapOrUmapSnapModal').modal('hide');
                    $scope.setSuccNoticeMsg("快照映射成功");
                    $scope.getVolumes()
                }else{
                    $scope.setFailNoticeMsg('快照映射失败');
                };
            });
        }

        /**解除快照映射**/
        function unmapSnap(){
            var data = {'volumeName': _this.currentSnap.lunName + '@' + _this.currentSnap.snapName,}
            if (_this.isYesConfirm != "YES") {
                    setSnapErrMsg($scope, "请输入大写 'YES' 确认删除操作");
                    return;
                }
            storageFactory.unmapVolumeFromLun(data, function(response){
                if (response.success){
                    $('#mapOrUmapSnapModal').modal('hide');
                    $scope.setSuccNoticeMsg("解除映射成功");
                    $scope.getVolumes()
                }else{
                    $scope.setFailNoticeMsg('解除映射失败');
                };
            });
        }

        /** 映射或解除映射 **/
        function mapOrUnmapVolume(){
            NProgress.start();
            $scope.isAdd = true;
            var modalData = _this.modalData
            if (_this.currentVolume.type != 'iscsi'){
                if(modalData.volumeMapType == 'Lun'){
                    var data = {'volumeName': _this.currentVolume.volumeName,
                                'targetName': modalData.target.name}
                    storageFactory.mapVolumeAsLun(data, function(response){
                        if (response.success){
                            $('#mapOrUmapVolumeModal').modal('hide');
                            $scope.setSuccNoticeMsg("卷映射成功");
                            $scope.getVolumes()
                        }else{
                            $scope.setFailNoticeMsg('卷映射失败');
                        };
                    });
                }else{
                    var data = {'volumeName': _this.currentVolume.volumeName,
                                'poolName': _this.currentVolume.poolName,
                                'mapNode': modalData.mapNode}
                    storageFactory.mapVolumeAsRbd(data, function(response){
                        if (response.success){
                            $('#mapOrUmapVolumeModal').modal('hide');
                            $scope.setSuccNoticeMsg("卷映射成功");
                            $scope.getVolumes();
                            $scope.getRbdClient();

                        }else{
                            $scope.setFailNoticeMsg('卷映射失败');
                        };
                    });
                }
            }else{
                if (_this.isYesConfirm != "YES") {
                    setSnapErrMsg($scope, "请输入大写 'YES' 确认删除操作");
                    return;
                }
                var data = {'volumeName': _this.currentVolume.volumeName}
                storageFactory.unmapVolumeFromLun(data, function(response){
                    if (response.success){
                        $('#mapOrUmapVolumeModal').modal('hide');
                        $scope.setSuccNoticeMsg("解除映射成功");
                        $scope.getVolumes()
                    }else{
                        $scope.setFailNoticeMsg('解除映射失败');
                    };
                });
            }
            _this.modalData = {};
            _this.isYesConfirm = '';
            $scope.isAdd = false;
            NProgress.done();
        }

        /** 创建快照 **/
        function createSnapshot() {
            if ($scope.currentVolume == undefined) {
                return;
            }

            var currentVolume = $scope.currentVolume,
                saveSnapshot  =  _this.saveSnapshot;

            var nameTest = /^[a-zA-Z0-9]{1,8}$/;
            var remarkTest = /^[\x00-\x7F]{1,500}$/;

            if (currentVolume.status != "正常") {
                setSnapErrMsg($scope, "Lun状态为 " + currentVolume.status + " ，不能执行快照操作");
                return;
            }
            if (saveSnapshot.name === undefined){
                setSnapErrMsg($scope, "快照名称不能为空");
                return;
            }

            if ( !nameTest.test(saveSnapshot.name) ) {
                setSnapErrMsg($scope, "快照名称应由数字或字母组成，长度为1至8");
                return;
            }

            if (saveSnapshot.remark === undefined) {
                setSnapErrMsg($scope, "快照描述不能为空");
                return;
            }

            if (saveSnapshot.remark.length > 500) {
                setSnapErrMsg($scope, "描述的字数为:" + saveSnapshot.remark.length + "，超过了500");
                return;
            }

            if ( !remarkTest.test(saveSnapshot.remark) ) {
                setSnapErrMsg($scope, "仅支持500个以内的ASCII字符，包括英文字符和数字。");
                return;
            }

            var isSnapNameExisted = false;
            angular.forEach(_this.snapshotList, function(obj, index) {
                if (saveSnapshot.name == obj.snapName){
                    isSnapNameExisted = true;
                }
            });

            if (isSnapNameExisted == true) {
                setSnapErrMsg($scope, "快照名称已存在，请使用其它名称");
                return;
            }

            NProgress.start();
            $scope.isAdd = true;

            // 发送添加快照请求信息
            storageFactory.addSnapshot(
                {   poolId: currentVolume.poolId, 
                    poolName: currentVolume.poolName, 
                    lunName: currentVolume.volumeName, 
                    snapName: saveSnapshot.name, 
                    remark: saveSnapshot.remark
                },
                function (response) {
                    if (response.success) {
                        $('#createSnapshotModal').modal('hide');
                        $scope.setSuccNoticeMsg("快照创建成功");
                        $scope.isAdd = false;
                        $scope.querySnapshot();
                    } else {
                        $scope.setFailNoticeMsg('快照创建失败');
                    }
                    saveSnapshot.name = '';
                    saveSnapshot.remark = '';
                    $scope.isAdd = false;
                    NProgress.done();
                }
            );
        }

        /** 删除快照 **/
        function deleteSnapshot() {
            if ($scope.currentVolume == undefined) {
                return;
            }
            var currentVolume = $scope.currentVolume;

            if ($scope.isSnapRollingback == true){
                setSnapErrMsg($scope, "快照回滚操作正在进行中，请稍后再操作");
                return;
            };
            if (_this.isYesConfirm != "YES") {
                setSnapErrMsg($scope, "请输入大写 'YES' 确认删除操作");
                return;
            };
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.deleteSnapshot(
                {   poolId: currentVolume.poolId, 
                    poolName: currentVolume.poolName, 
                    lunName: currentVolume.volumeName, 
                    snapName: _this.modalData.snapName
                },
                function(response){
                    $scope.isAdd = false;
                    if(response.success){
                        $("#deleteSnapshotModal").modal("hide");
                        _this.isYesConfirm = '';
                        _this.modalData    = null;
                        $scope.setSuccNoticeMsg("快照删除成功");
                        $scope.querySnapshot();
                    }else{
                        $scope.setFailNoticeMsg('快照删除失败');
                    };
                    NProgress.done();
                }
            );
        }

        /** 修改快照描述 **/
        function updateDescribe() {
            if ($scope.currentVolume == undefined) {
                return;
            }
            var currentVolume = $scope.currentVolume;

            if (_this.modalData.snapName === undefined) {
                setSnapErrMsg($scope, "快照名称不能为空");
                return;
            }
            if (_this.modalData.remark === undefined) {
                setSnapErrMsg($scope, "快照描述不能为空");
                return;
            };
            if(_this.modalData.remark.length > 500){
                setSnapErrMsg($scope, "描述的字数为:" + _this.modalData.remark.length + "，超过了500");
                return;
            };
            var remarkTest = /^[\x00-\x7F]{1,500}$/;
            if(!remarkTest.test(_this.modalData.remark)){
                setSnapErrMsg($scope, "仅支持500个以内的ASCII字符，包括英文字符和数字。");
                return;
            };
            NProgress.start();
            storageFactory.updateSnapshot(
                {   poolId: currentVolume.poolId, 
                    poolName: currentVolume.poolName, 
                    lunName: currentVolume.volumeName, 
                    snapName: _this.modalData.snapName, 
                    remark: _this.modalData.remark
                },
                function(resData){
                    if(resData.success){
                        $("#updateDescribeModal").modal("hide");
                        $scope.setSuccNoticeMsg("快照描述修改成功");
                        $scope.snapModel.remark = $scope.snapModel.remarkInput;
                    }else{
                        $scope.setFailNoticeMsg('快照描述修改失败');
                    }
                    NProgress.done();
                }
            );
        }
        /** 快照回滚 **/
        function rollbackSnapshot(){
            if (_this.modalData.isRollingBack == true){
                setSnapErrMsg($scope, "快照回滚操作正在进行中，请稍后再操作");
                return;
            };
            if (_this.isYesConfirm != "YES") {
                setSnapErrMsg($scope, "请输入大写 'YES' 确认回滚操作");
                return;
            };

            var currentVolume = $scope.currentVolume
            var data = {
                'poolId': currentVolume.poolId,
                'poolName': _this.modalData.poolName,
                'lunName': _this.modalData.lunName,
                'snapName': _this.modalData.snapName

            }
            NProgress.start();
            $scope.snapshotDisable = true;
            storageFactory.rollbackSnapshot(data, function(response){
                if(1===response.success){
                    $("#rollbackSnapshotModal").modal("hide");
                    $scope.setSuccNoticeMsg("正在进行快照回滚");
                    //need query all this lun's snapshot and fresh snapshot status
                    $scope.querySnapshot()
                }else{
                    $scope.snapshotDisable = false;
                    $scope.setSnapErrMsg(resData.message);
                };
                NProgress.done();
               
            })

        }

        /** 克隆快照 **/
        function cloneVolume() {
            if(!_this.clonelun || !_this.clonelun.poolName){
                $scope.showTipMsg("请选择新卷所属的存储池",'_this.clonelun.poolName');
                return;
            }
            if(!_this.clonelun.volumeName){
                $scope.showTipMsg("请输入克隆出的卷名",'_this.clonelun.volumeName');
                return;
            }
            for(var i=0;i<_this.poolList.length;i++){
                if(_this.poolList[i].poolName === _this.clonelun.poolName){
                    var poolId = _this.poolList[i].poolId;
                }
            }
            var params = {snapshot:{poolName: _this.modalData.poolName,
                                    lunName: _this.modalData.lunName,
                                    snapName: _this.modalData.snapName},
                          cloneLun:{lunName: String(poolId) + '.' + String(_this.clonelun.volumeName),
                                    poolName: _this.clonelun.poolName}
                        }

            NProgress.start();
            storageFactory.cloneVolume(params,function(response){
                if(response.success==1){
                    //克隆成功 , 隐藏弹出框 刷新lun列表
                    $("#cloneVolumeModal").modal("hide");
                    $scope.setSuccNoticeMsg("克隆成功");
                    $scope.getVolumes();
                    _this.clonelun= null;
                    _this.clonelun = null;
                    params = null;
                }else{
                    //克隆失败
                    $scope.setFailNoticeMsg('克隆失败');
                }
            });
            NProgress.done();
            
        }
        /** 清除克隆数据 **/
        function cancelSnap(){
            _this.clonelun = null;
            _this.clonelun = null;
        }

        /** 查询所有target **/
        $scope.getTargets = function(pageSize, goPage){
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.volumePage.pagesize;
            }
            storageFactory.getTargets(queryParams, function (response) {
                if (response.success) {
                    _this.targetList = response.data.allResults;
                    _this.currentPageTargetList = response.data.results;
                    $scope.targetPage.pageSize = response.data.pagesize || $scope.targetPage.pagesize;
                    $scope.targetPage.currentPage = queryParams.pageno;
                    $scope.targetPage.totalCount = response.data.totalCount;

                    if ($scope.currentTarget == undefined) {
                        $scope.currentTarget = _this.currentPageTargetList[0];
                        queryTargetAssociated($scope.currentTarget);
                        
                        setTimeout(function(){
                            if ($('#target1').siblings().hasClass('bcf5')) {
                                $('#target1').siblings().removeClass('bcf5');
                            }
                            $('#target1').addClass('bcf5');
                        }, 500);
                    }
                }else{
                    _this.targetList = {};
                }
            });
        }

        /** target选中操作 **/
        function targetSelected(enent, currentTarget){
            var current = $(event.currentTarget);
            if (current.siblings().hasClass('bcf5')) {
                current.siblings().removeClass('bcf5');
            }
            current.addClass('bcf5');
            $scope.currentTarget = currentTarget;
            queryTargetAssociated(currentTarget);
        }

        /**
         * 查询当前 ISCSI目标下相关的关联信息
         */
        function queryTargetAssociated(currentTarget) {
            $scope.queryTargetVolumes();
            $scope.queryTargetAcl();
            queryTargetChap(_this, currentTarget, storageFactory);
        }

        /** 创建target **/
        function createTarget(){
            if(!_this.modalData || !_this.modalData.targetName){
                setBottomErrMsg($scope,'请输入ISCSI名');
                return;
            }
            if(_this.modalData && _this.modalData.targetName == _this.targetNamePrefix){
                setBottomErrMsg($scope,'请补齐ISCSI名');
                return;
            }
            if(_this.modalData && _this.modalData.targetName.length > 223){
                setBottomErrMsg($scope, '名称不能超过223个字符');
                return;
            }
            if(!_this.modalData.hostId){
                setBottomErrMsg($scope,'请选择ISCSI目标绑定节点');
                return;
            }
            if(!_this.modalData.pattern){
                setBottomErrMsg($scope,'请选择ISCSI目标模式');
                return;
            }
            for(var i=0; i< _this.targetList.length; i++){
                if (_this.modalData.targetName == _this.targetList[i].name){
                    setBottomErrMsg($scope, 'ISCSI名称已存在');
                    return;
                }
            }
            if (_this.modalData.pattern == '只读'){
                var readOnly = 1;
            }else{
                var readOnly = 0;
            }
            var params = {'targetName': _this.modalData.targetName,
                          'hostId': _this.modalData.hostId,
                          'readOnly': readOnly}
            NProgress.start();
            $("#addTargetModal").modal("hide");
            storageFactory.createTarget(params, function(response){
                if (response.success){
                    $scope.setSuccNoticeMsg("创建成功");
                    $scope.getTargets();
                    _this.modalData = {}
                }else{
                    $scope.setFailNoticeMsg('ISCSI目标创建失败');
                }
            });
            NProgress.done();
            _this.modalData = {}
        }

        /**显示创建target弹出框**/
        function showAddTarget(modalId){
            _this.modalData = {};
            _this.targetNamePrefix = "iqn.2014-10.com.szsandstone:storage-";
            _this.modalData.targetName = _this.targetNamePrefix;
            $( "#" + modalId ).modal("show");
        }

        /** 删除target **/
        function deleteTarget(){
            if($scope.block.isYesConfirm == 'YES'){
                var currentTarget = _this.modalData;
                var params = {'targetName': currentTarget.name,
                              'targetAclList': _this.targetAclList,
                              'targetVolumeList': _this.targetVolumeList};
                $scope.isAdd = true;           
                NProgress.start();
                storageFactory.deleteTarget(params, function (response) {
                    if (response.success) {
                        //获取target列表
                        $scope.currentTarget = undefined;
                        $scope.getTargets();
                        $("#deleteTargetModal").modal("hide");
                        $scope.setSuccNoticeMsg("删除成功");
                    } else {
                        $scope.setFailNoticeMsg('删除失败');
                    }
                    $scope.isAdd  = false;
                    NProgress.done();
                });
            }else{
                setBottomErrMsg($scope, "请输入大写 'YES' 以确定删除操作!")
            }
            $scope.isAdd  = false;
        }
        /** 添加客户端 **/
        function addInitiator(){
            if (!_this.modalData.initiatorISCSI){
                setBottomErrMsg($scope, '请输入客户端名')
                return
            }
            var params = {'iqn': _this.modalData.initiatorISCSI,
                          'remark': _this.initiatorRemark}
            if (params.remark == undefined){
                params.remark = 'null';
            }
            $scope.isAdd = true;           
            NProgress.start();
            storageFactory.addInitiator(params, function(response){
                if(response.success){
                    $("#addInitiatorModal").modal("hide");
                    $scope.setSuccNoticeMsg("添加成功");
                    $scope.getAcls();
                }else{
                    $scope.setFailNoticeMsg('添加失败');
                }
                $scope.isAdd  = false;
                    NProgress.done();
            });
            $scope.isAdd  = false;

        }

        /** 查询所有启动器acl **/
        $scope.getAcls = function(pageSize, goPage) { 
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.initiatorPage.pagesize;
            }
            storageFactory.getInitiators(queryParams, function (response) {
                if (response.success) {
                    _this.aclList = angular.copy(response.data.allResults);
                    _this.currentPageAclList = angular.copy(response.data.results);
                    $scope.initiatorPage.pageSize = response.data.pagesize || $scope.initiatorPage.pagesize;
                    $scope.initiatorPage.currentPage = queryParams.pageno;
                    $scope.initiatorPage.totalCount = response.data.totalCount;

                    if ($scope.currentAcl == undefined) {
                        $scope.currentAcl = _this.currentPageAclList[0];
                        $scope.getInitiatorTarget();
                        setTimeout(function(){
                            if ($('#acl1').siblings().hasClass('bcf5')) {
                                $('#acl1').siblings().removeClass('bcf5');
                            }
                            $('#acl1').addClass('bcf5');
                        }, 500);
                    }
                }
            });
        }

        /** 添加客户端到target **/
        function addTargetInitiator(){
            var newBindTarget = _this.modalData.newBindTarget
            if (!newBindTarget){
                setBottomErrMsg($scope, '请选择绑定的ISCSI目标')
                return;
            }
            var aclList = _this.aclList;
            var rw_flag = 0;
            /**如果target是读写模式，重复绑定时提示**/
            for(var i=0; i<_this.targetList.length; i++){
                if (_this.targetList[i].name == newBindTarget && _this.targetList[i].rw_flag == 1){
                    rw_flag = 1;
                }
            }

            if(_this.modalData.targetHasBind == false && rw_flag == 0){
                for (var i=0; i<aclList.length; i++){
                    if (aclList[i].iqn != _this.modalData.iqn){
                        for(var j=0; j<aclList[i].target.length; j++){
                            if (aclList[i].target[j] == newBindTarget){
                                _this.modalData.targetHasBind = true;
                                return;
                            }
                        }
                    }
                }
            }
            if (_this.modalData.targetHasBind == true && _this.isYesConfirm != 'YES'){
                setBottomErrMsg($scope, "请输入大写 'YES' 以确定添加操作!");
                return;
            }
            var params = {'iqn': _this.modalData.iqn,
                          'targetName': _this.modalData.newBindTarget}
            $scope.isAdd = true;           
            NProgress.start();
            storageFactory.addTargetInitiator(params, function(response){
                if(response.success){
                    $("#bindTargetModal").modal("hide");
                    $scope.setSuccNoticeMsg("绑定成功");
                    $scope.getAcls()
                }else{
                    $scope.setFailNoticeMsg('绑定失败');
                }
                $scope.isAdd  = false;
                    NProgress.done();
            });
            $scope.isAdd  = false;

        }

        /** 查询当前target下所有卷 **/
        $scope.queryTargetVolumes = function (pageSize, goPage){
            var currentTarget = $scope.currentTarget;
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.targetVolumePage.pagesize;
            }
            if (currentTarget){
                queryParams.targetName = currentTarget.name;
                try{
                    storageFactory.getTargetVolumes(queryParams,
                        function (response){
                            if (response.success == 1){
                                _this.targetVolumeList = response.data.allResults;
                                _this.currentPageTgtVolume = response.data.results;
                                $scope.targetVolumePage.pageSize = response.data.pagesize || $scope.targetVolumePage.pagesize;
                                $scope.targetVolumePage.currentPage = queryParams.pageno;
                                $scope.targetVolumePage.totalCount = response.data.totalCount;
                            }else{
                                _this.targetVolumeList = new Array();
                            }
                        }
                    );
                }catch(err){}
            }
        }

        /** 查询当前target下acl **/
        $scope.queryTargetAcl = function (pageSize, goPage){
            if ($scope.currentTarget == undefined) {
                return;
            }
            var currentTarget = $scope.currentTarget;
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.targetAclPage.pagesize;
            }
            queryParams.targetName = currentTarget.name;
            try{
                storageFactory.getTargetAcl(queryParams,
                    function (response){
                        if (response.success == 1){  
                            _this.targetAclList = response.data.allResults;
                            _this.currentPageTgtAclList = response.data.results;
                            $scope.targetAclPage.pageSize = response.data.pagesize || $scope.targetAclPage.pagesize;
                            $scope.targetAclPage.currentPage = queryParams.pageno;
                            $scope.targetAclPage.totalCount = response.data.totalCount;
                        }else{
                            _this.targetAclList = new Array();
                        }
                    }
                );
            }catch(err){}
        }

        /** 解绑客户端 **/
        function delTargetInitiator(){
            var params = {'targetName': _this.modalData.newUnbindTarget,
                          'iqn': _this.modalData.iqn}
            for (var i=0; i<_this.targetList.length; i++){
                if(_this.targetList[i].name == params.targetName && _this.targetList[i].status == 'active'){
                    $("#unbindTargetModal").modal("hide");
                    $scope.showDialog("ISCSI目标正在连接，请先断开连接");
                    return;
                }
            }
            $scope.isAdd = true;
            NProgress.start();
            storageFactory.delTargetInitiator(params, function(response){
                if(response.success){
                    $("#unbindTargetModal").modal("hide");
                    $scope.setSuccNoticeMsg("解除成功");
                    $scope.getAcls()

                }else{
                    $scope.setFailNoticeMsg('解除失败');
                }
                $scope.isAdd  = false;
                NProgress.done();
            });
            $scope.isAdd  = false;
        }

        /**删除启动器**/
        function deleteInitiator(acl){
            var params = {'iqn': acl.iqn,
                          'targetName': acl.target}
            if (acl.state == 'active'){
                $scope.showDialog("有客户端正在连接，请先断开连接");
                return;
            }
            NProgress.start();
            storageFactory.deleteInitiator(params, function(response){
                if(response.success){
                    $scope.currentAcl = undefined;
                    $scope.getAcls();
                }else{
                    $scope.setFailNoticeMsg('删除失败');
                }
            });
            NProgress.done();
            
        }
        
        /** 显示 target 挂载节点或解除挂载 **/
        function showDetachOrAttach(modalId, obj, action){
            _this.modalData = null;
            _this.modalData = obj;
            _this.optionalNode = new Array();
            _this.hasSelectNode = new Array();
            if (action == 'attach'){
                _this.modalData.action = 'attach';
                _this.optionalNode = angular.copy(_this.hostList);
                for (var i=0; i<obj.node.length; i++){
                    var index = _this.optionalNode.indexOf(obj.node[i]);
                    if (index >= 0) {
                        _this.optionalNode.splice(index, 1);
                    }
                }
            }
            if (action == 'detach'){
                _this.modalData.action = 'detach';
                if(obj.node.length>1){
                    _this.optionalNode = obj.node;
                };
            }
            $( "#" + modalId ).modal("show");
        };

        /** target批量挂载节点或解除节点左右选择框处理 **/
        function attachOrDetachNodeSelected (action, node) {
            if(action == 'optional'){
                if(_this.modalData.action == 'detach' && _this.optionalNode.length <2){
                    return;
                }
                var index = _this.optionalNode.indexOf(node)
                if (index != -1){
                    _this.optionalNode.splice(index, 1);
                    _this.hasSelectNode.push(node);
                }
            }
            if (action == 'selected'){
                var index = _this.hasSelectNode.indexOf(node)
                if (index != -1){
                    _this.hasSelectNode.splice(index, 1);
                    _this.optionalNode.push(node);
                }
            }
        };

        /** target批量挂载或解除挂载节点 **/
        function attachOrDetachNode(){

            var params = {'targetName': _this.modalData.name,
                          'hostId': _this.hasSelectNode,
                          'readOnly': _this.modalData.rw_flag};
            $scope.isAdd = true;           
            NProgress.start();
            if(_this.modalData.action == 'attach'){
                storageFactory.targetAttach(params, function(response){
                    if(response.success){
                        $("#attachOrDetachModal").modal("hide");
                        $scope.setSuccNoticeMsg("添加成功");
                        $scope.getTargets();
                    }else{
                        $scope.setFailNoticeMsg('添加失败');
                    }
                    $scope.isAdd  = false;
                    NProgress.done();
                });
            }else{
                storageFactory.targetDetach(params, function(response){
                    if(response.success){
                        $("#attachOrDetachModal").modal("hide");
                        $scope.setSuccNoticeMsg("解除成功");
                        $scope.getTargets();
                    }else{
                        $scope.setFailNoticeMsg('解除失败');
                    }
                    $scope.isAdd  = false;
                    NProgress.done();
                });
            }
            $scope.isAdd  = false;
            NProgress.done();
        };


        /**显示绑定Target**/
        function showBindTargetModal(modalId, currentAcl){
            _this.modalData = null;
            _this.isYesConfirm = ''
            _this.modalData = angular.copy(currentAcl)
            _this.modalData.targetsCanBind = new Array()
            _this.modalData.targetHasBind = false;
           
            var targetList = angular.copy(_this.targetList)
            for (var i=0; i< targetList.length; i++){
                _this.modalData.targetsCanBind.push(targetList[i].name)
            }
            for (var i=0; i<_this.modalData.targetsCanBind.length; i++){
                for(var j=0; j<currentAcl.target.length; j++){
                    if (currentAcl.target[j] == _this.modalData.targetsCanBind[i]){             
                        var index = _this.modalData.targetsCanBind.indexOf(_this.modalData.targetsCanBind[i])
                        if (index >= 0) {
                            _this.modalData.targetsCanBind.splice(index, 1);
                        }
                    } 
                }
            }     
            $( "#" + modalId ).modal("show");
        }

        /**显示批量映射卷到Target**/
        function volumesMapTargetModal(modalId, currentTarget){
            if(!_this.lunList){
                $scope.getVolumes();
            } 
            _this.modalData = {};
            _this.currentTarget = currentTarget;
            _this.optionalVolume = new Array();
            _this.hasSelectVolume = new Array();
            $( "#" + modalId ).modal("show");
        }

        /**获取pool下的卷**/
        $scope.getPoolVolumes = function(){
            var currentPool = _this.modalData.selectedPool;
            var lunList = _this.lunList;
            for(var i=0; i<lunList.length; i++){
                if (lunList[i].poolName.split('@')[0]== currentPool.poolName){
                    var index = _this.volumeType.indexOf(lunList[i].type)
                    if (index < 0){
                        _this.optionalVolume.push(lunList[i].volumeName)
                    }
                }
            }
        }

        /** 批量映射卷 左右选择框处理 **/
        function showFeatureSelected (action, volumeName) {
            if(action == 'optional'){
                var index = _this.optionalVolume.indexOf(volumeName)
                if (index != -1){
                    _this.optionalVolume.splice(index, 1);
                    _this.hasSelectVolume.push(volumeName);
                }
            }
            if (action == 'selected'){
                var index = _this.hasSelectVolume.indexOf(volumeName)
                if (index != -1){
                    _this.hasSelectVolume.splice(index, 1);
                    _this.optionalVolume.push(volumeName);
                }
            }
        };

        /** 卷批量映射给target **/
        function volumesMapTarget (){
            var data = {'volumeName': _this.hasSelectVolume,
                        'targetName': _this.currentTarget.name}
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.mapVolumeAsLun(data, function(response){
                if (response.success){
                    $('#volumesMapTargetModal').modal('hide');
                    $scope.setSuccNoticeMsg("卷映射成功");
                    $scope.getVolumes();
                    $scope.getTargets();
                }else{
                    $scope.setFailNoticeMsg('卷映射失败');
                };
            });
            $scope.isAdd = false;
            NProgress.done();
        }

        /**添加chap**/
        function addTargetChap(){

            var chapData = _this.modalData.targetChap
            if (!chapData.username || chapData.username.length < 12) {
                $scope.showTipMsg("不小于12字符！", "$scope.block.targetChap.username");
                setBottomErrMsg($scope, '认证名称不小于12字符')
                return;
            }
            if (!chapData.password || chapData.password.length < 12) {
                $scope.showTipMsg("不小于12字符！", "$scope.block.targetChap.password");
                setBottomErrMsg($scope, '认证密码不小于12字符')
                return;
            }
            if (chapData.mutul) {
                if (!chapData.mutulUsername || chapData.mutulUsername.length < 12) {
                    $scope.showTipMsg("不小于12字符！", "$scope.block.targetChap.mutulUsername");
                    setBottomErrMsg($scope, '反向认证名称不小于12字符')
                    return;
                }
                if (!chapData.mutulPassword || chapData.mutulPassword.length < 12) {
                    $scope.showTipMsg("不小于12字符！", "$scope.block.targetChap.mutulPassword");
                    setBottomErrMsg($scope, '反向认证密码不小于12字符')
                    return;
                }
            }
            var currentTarget = _this.modalData
            var params = {'username': chapData.username,
                          'password': chapData.password,
                          'mutul': chapData.mutul,
                          'mutulUsername': chapData.mutulUsername,
                          'mutulPassword': chapData. mutulPassword,
                          'targetName': currentTarget.name}
            NProgress.start();
            storageFactory.addTargetChap(params, function (response) {
                if (response.success) {
                    $scope.setSuccNoticeMsg("CHAP验证添加成功");
                    $("#setChapModal").modal('hide');
                } else {
                    $scope.setFailNoticeMsg('CHAP验证添加失败');
                }
                NProgress.done();
            });
        }

        /**删除chap**/
        function delTargetChap(chap){
            var params = {'targetName': $scope.currentTarget.name,
                          'userName': chap.user,
                          'level': chap.level
                      }
            NProgress.start();
            storageFactory.delTargetChap(params, function (res) {
                if (res.success) {
                    queryTargetChap(_this, $scope.currentTarget, storageFactory);
                    $scope.setSuccNoticeMsg("删除成功");
                } else {
                    $scope.setFailNoticeMsg('删除失败');
                }
                NProgress.done();
            });
        }

        /**取消授权**/
        function delTargetAcl(target){
            if (target.state == 'active'){
                $scope.showDialog('有客户端正在连接，请先断开连接');
                return
            }
            var params = {'targetName': target.name,
                          'iqn': $scope.currentAcl.name}
            NProgress.start();
            storageFactory.delTargetAcl(params, function(response){
                if (response.success){
                    $scope.getAcls();
                    _this.getAclTimeOut = setTimeout(function(){
                        for (var i in _this.aclList){
                            if (_this.aclList[i].name == $scope.currentAcl.name){
                                _this.aclTargetList = _this.aclList[i].target
                            }
                        }
                    },500)
                }else{
                    $scope.setFailNoticeMsg("取消授权失败");
                }
            });
            NProgress.done();
            
        }

        /**授权**/
        function addTargetAcl(target){
            var params = {'targetName': target.name,
                          'iqn': $scope.currentAcl.name}
            NProgress.start();
            storageFactory.addTargetAcl(params, function(response){
                if (response.success){
                    $scope.getAcls();
                    _this.getAclTimeOut = setTimeout(function(){
                        for (var i in _this.aclList){
                            if (_this.aclList[i].name == $scope.currentAcl.name){
                                _this.aclTargetList = _this.aclList[i].target
                            }
                        }
                    },500)
                }else{
                    $scope.setFailNoticeMsg("授权失败");
                }
            });
            NProgress.done();
            
        }


        /** 更新卷的大小 **/
        function updateVolume() {
            if ($scope.currentVolume == undefined) {
                return;
            }
            var currentVolume = $scope.currentVolume
            var capacity_bytes = unitSizeToBytes(currentVolume.capacity_display + currentVolume.sizeUnit)
            if (capacity_bytes < Math.pow(1024, 2)) {
                $scope.showTipMsg("容量最小支持 1MB", "currentVolume.capacity_display");
                return;
            }
            if (capacity_bytes > (256*Math.pow(1024, 4))) {
                $scope.showTipMsg("容量最大支持 256TB", "currentVolume.capacity_display");
                return;
            }
            var volume
            if (capacity_bytes <= currentVolume.capacity_bytes){
                $scope.showTipMsg("容量不可小于或等于原容量的大小：" + byteTosUnitSize(currentVolume.capacity_bytes), "currentVolume.capacity_display");
                return;
            };
            var volume = {
                volumeName: currentVolume.volumeName,
                poolName: currentVolume.poolName,
                capacity_bytes: capacity_bytes
            }
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.updateVolume(volume, function (response) {
                if (response.success) {
                    
                    //获取卷列表
                    $scope.getVolumes();
                    //alert("修改成功！");
                    $("#updateVolumeModal").modal("hide");
                    $scope.setSuccNoticeMsg("容量调整成功");
                } else {
                    $scope.setFailNoticeMsg(response.message);
                }
                NProgress.done();
                $scope.isAdd = false;
            });

        }
        /** acl选中操作 **/
        function aclSelected(event, currentAcl){
            var current = $(event.currentTarget);
            if (current.siblings().hasClass('bcf5')) {
                current.siblings().removeClass('bcf5');
            }
            current.addClass('bcf5');
            $scope.currentAcl = currentAcl;
            $scope.getInitiatorTarget();
        }

        /**获取acl下的target**/
        $scope.getInitiatorTarget = function(pageSize, goPage){
            if ($scope.currentAcl == undefined) {
                return;
            }
            var currentAcl = $scope.currentAcl;
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.initiatorTgtPage.pagesize;
            }
            queryParams.InitiatorName = currentAcl.iqn;
            storageFactory.getInitiatorTarget(queryParams, function(response){
                if (response.success){
                    _this.aclTargetList = response.data.allResults;
                    _this.currentPageAclTgt = response.data.results;
                    $scope.initiatorTgtPage.pageSize = response.data.pagesize || $scope.initiatorTgtPage.pagesize;
                    $scope.initiatorTgtPage.currentPage = queryParams.pageno;
                    $scope.initiatorTgtPage.totalCount = response.data.totalCount;
                }
            });
        }
        

        /**获取客户端列表**/
        $scope.getRbdClient = function (pageSize, goPage){
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.rbdClientPage.pagesize;
            }
            storageFactory.getAllHostName(queryParams, function(response){
                if(response.success){
                    _this.hostInfoList = response.data.allResult;
                    _this.currentPageHostList = response.data.results;
                    $scope.rbdClientPage.pageSize = response.data.pagesize || $scope.rbdClientPage.pagesize;
                    $scope.rbdClientPage.currentPage = queryParams.pageno;
                    $scope.rbdClientPage.totalCount = response.data.totalCount;

                    if ($scope.currentRbd == undefined) {
                        $scope.currentRbd = _this.currentPageHostList[0];
                        $scope.getClientVolume();

                        setTimeout(function(){
                            if ($('#rbd1').siblings().hasClass('bcf5')) {
                                $('#rbd1').siblings().removeClass('bcf5');
                            }
                            $('#rbd1').addClass('bcf5');
                        }, 500);
                    }
                }
            });
        }

        /** 选中客户端操作 **/
        function rbdClientSelected(event, currentRbd){
            var current = $(event.currentTarget);
            if (current.siblings().hasClass('bcf5')) {
                current.siblings().removeClass('bcf5');
            }
            current.addClass('bcf5');
            $scope.currentRbd = currentRbd;
            $scope.getClientVolume();
        }

        /** 获取当前客户端下的rbd卷 **/
        $scope.getClientVolume = function(pageSize, goPage){
            var currentRbd = $scope.currentRbd;
            var queryParams = {};
            if (pageSize && goPage) {
                queryParams.pageno = goPage;
                queryParams.pagesize = pageSize;
            } else {
                queryParams.pageno = 1;
                queryParams.pagesize = $scope.clientVolumePage.pagesize;
            }
            queryParams.ip = currentRbd.bussinessNetwork.ipaddr;
            storageFactory.getClientVolume(queryParams, function (response) {
                if (response.success) {
                    _this. rbdClientVolume= angular.copy(response.data.allResults);
                    _this.currentPageClientVolume = angular.copy(response.data.results);
                    $scope.clientVolumePage.pageSize = response.data.pagesize || $scope.clientVolumePage.pagesize;
                    $scope.clientVolumePage.currentPage = queryParams.pageno;
                    $scope.clientVolumePage.totalCount = response.data.totalCount;
                    for(var i=0; i<_this.currentPageClientVolume.length; i++){
                        for(var j=0; j<_this.poolList.length; j++){
                            if(_this.poolList[j].poolName == _this.currentPageClientVolume[i].poolName){
                                _this.currentPageClientVolume[i].replication = _this.poolList[j].logicPoolId[_this.poolList[j].replacted];
                            }
                        }  
                    }  
                }
            });
        }

        // IOPS
        function showIopsPhysicalHost(pool) {
            var read = '', write = '', index = 0, poolSize = getObjectSize(pool.logicPoolId);
            for (var k in pool.logicPoolId) {
                index++;
                read  += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_read';
                write += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_write';
                if (poolSize > 1 && poolSize !== index) {
                    read += ',';
                    write += ',';
                }
            }
            var targets = ['sumSeries('+ read +')', 'sumSeries('+ write +')'];
            mainFactory.getSeriesData({'from': '-1h', 'targets': targets}, function (datas) {
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
                        values.push(value1);
                        values2.push(value2);
                    }
                    drawCpuMemChart(pool.poolName, times, values, values2);
                }
            });
        };

        function drawCpuMemChart(poolName, times, values, values2) {
            var iopsPhysicalHost = echarts.init(document.getElementById(poolName + '_iops'));
            var cpuMemOptions = getEchartsLineOption('IOPS', times, 'read', values, 'write', values2, 1024);
            var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
            var readColorTransparency  = 'rgba(149,203,213, 0.01)';
            var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
            var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
            cpuMemOptions = setEchartsOptionColor(cpuMemOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            iopsPhysicalHost.setOption(cpuMemOptions);
        };

        // MBPS
        function showMbpsPhysicalHost(pool) {
            var read = '', write = '', index = 0, poolSize = getObjectSize(pool.logicPoolId);
            for (var k in pool.logicPoolId) {
                index++;
                read  += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_read_b';
                write += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_write_b';
                if (poolSize > 1 && poolSize !== index) {
                    read += ',';
                    write += ',';
                }
            }
            var targets = ['sumSeries('+ read +')', 'sumSeries('+ write +')'];
            mainFactory.getSeriesData({'from': '-1h', 'targets': targets}, function (datas) {
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
                        values.push(value1);
                        values2.push(value2);
                    }
                    mbpsChart(pool.poolName, times, values, values2);
                }
            });
        };

        function mbpsChart(poolName, times, values, values2) {
            var mbpsPhysicalHost = echarts.init(document.getElementById(poolName + '_mbps'));
            var cpuMemOptions = getEchartsLineOption('MBPS', times, 'read', values, 'write', values2, 1024);
            var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
            var readColorTransparency  = 'rgba(149,203,213, 0.01)';
            var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
            var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
            cpuMemOptions = setEchartsOptionColor(cpuMemOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            mbpsPhysicalHost.setOption(cpuMemOptions);
        };

        // delay
        function showDelayPhysicalHost(pool) {
            var read = '', write = '', index = 0, poolSize = getObjectSize(pool.logicPoolId);
            for (var k in pool.logicPoolId) {
                index++;
                read  += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_read_latency';
                write += 'sds.cluster.*.pool.' + pool.logicPoolId[k] + '.sds_write_latency';
                if (poolSize > 1 && poolSize !== index) {
                    read += ',';
                    write += ',';
                }
            }
            var targets = ['sumSeries('+ read +')', 'sumSeries('+ write +')'];

            mainFactory.getSeriesData({'from': '-1h', 'targets': targets}, function (datas) {
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
                        values.push(value1);
                        values2.push(value2);
                    }
                    delayChart(pool.poolName, times, values, values2);
                }
            });
        };

        function delayChart(poolName, times, values, values2) {
            var delayPhysicalHost = echarts.init(document.getElementById(poolName + '_delay'));
            var cpuMemOptions = getEchartsLineOption('时延', times, 'read', values, 'write', values2, 1024);
            var readColor              = 'rgba(149,203,213, 0.6)'; //'#95cbd5';
            var readColorTransparency  = 'rgba(149,203,213, 0.01)';
            var writeColor             = 'rgba(165, 197, 158, 0.6)'; //'#a5c59e';
            var writeColorTransparency = 'rgba(165, 197, 158, 0.01)';
            cpuMemOptions = setEchartsOptionColor(cpuMemOptions, readColor, writeColor, readColorTransparency, writeColorTransparency, 'read');
            delayPhysicalHost.setOption(cpuMemOptions);
        };

        /** 显示弹出框模板 **/
        function showModal(modalId, obj) {
            _this.modalData = null
            if (obj) {
                _this.modalData = angular.copy(obj);
            }
            initModalValue($scope, this, modalId, _this.modalData, storageFactory);
            $( "#" + modalId ).modal("show");
        } 


        /** 物理池信息开关 **/
        $scope.switchPools = function (pool, switchBoole, index) {
            $scope.isSwitchPools[index] = switchBoole;
            if (switchBoole) {
                $scope.poolHeight[index][0] = 50;
                $scope.poolHeight[index][1] = 40;
                $scope.poolHeight[index][2] = 60;
                $scope.poolHeight[index][3] = 'block';

                getPoolCharts(pool);
            } else {
                $scope.poolHeight[index][0] = 20;
                $scope.poolHeight[index][1] = 100;
                $scope.poolHeight[index][2] = 60;
                $scope.poolHeight[index][3] = 'none';
            }
        }

        /** 页面初始化 **/
        function init() {
            $scope.gMainStateRouteView.current = 'main.block_view';
            _this.viewCtrl                = 'lunView';
            _this.showPhysicalPool        = false;
            $scope.saveScanningIp         = [];
            $scope.appSelectValue         = "0";
            $scope.seniorModeValue        = 0;
            $scope.isScanning             = true;
            $scope.isReadWriteCacheMix    = false;
            $scope.showInstallProccessing = false;
            $scope.showAdvancedOption     = false;
            $scope.tabIsShow              = true;
            $scope.disablecreate          = false;
            $scope.isShowNodeNum          = false;
            $scope.isScanIp               = true;
            $scope.ipArray                = [];
            $scope.rackData               = [];
            $scope.poolHeight             = [];
            $scope.physicalPool           = {};
            $scope.isSwitchPools          = [];

            $('#clearBtn').find('button:first').css('background-color', '#fff');

            //初始化分页查询参数
            $scope.queryParams = {
                pageno: '1',
                pagesize: '9'
            };

            $scope.getVolumes();

        }


        function getSinglePool() {
            storageFactory.getPoolInfo(function (response) {
                $scope.sysPool = response.data.sys_pool;
                $scope.physicalPools = response.data.physical_pools;
                if ($scope.physicalPools){
                    setTimeout(function () {
                        angular.forEach($scope.physicalPools, function(pool, i){
                            if (i == 0) {
                                $scope.isSwitchPools.push(true);
                                $scope.poolHeight.push([50, 40, 60, 'block']);
                            } else {
                                $scope.isSwitchPools.push(false);
                                $scope.poolHeight.push([20, 100, 60, 'none']);
                            }
                            getPoolCharts(pool);
                        });
                    }, 1000);
                }
            });
        }


        /**
         * 获取物理池信息列表
         */
        function getPoolInfo() {
            storageFactory.getPoolInfo(function (response) {
                $scope.sysPool = response.data.sys_pool;
                $scope.physicalPools = response.data.physical_pools;
                setTimeout(function () {
                    for (var i = 0; i < $scope.physicalPools.length; i++) {
                        getPoolCharts($scope.physicalPools[i]);
                    }
                }, 1000);
            });
        }

        function getPoolCharts(pool) {
            poolCapacity(pool.poolName, pool.capacity.used, pool.capacity.total);
            showIopsPhysicalHost(pool);
            showMbpsPhysicalHost(pool);
            showDelayPhysicalHost(pool);
        }

         /** 物理池容量 **/
        function poolCapacity(poolName, used, total) {
            var capacity = echarts.init(document.getElementById(poolName + 'Capacity'));
            var usedPer  = (used / total).toFixed(2) * 100;
            var surplus  = ((total-used) / total).toFixed(2) * 100;
            capacity.setOption(getCapacityPieOption(usedPer, surplus, '98%'));
        }

        /***************** configure.js *****************/
        $scope.now_show_log = ""
        //var ipTest = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

        /**
        * 请求创建进度展示
        */
        $scope.node_log_cache = {};
        $scope.show_log_init_flag = false;

        $scope.has_show_log_init = function (){
            if($scope.show_log_init_flag == false){
                angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node){
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
            if(0 == $scope.ipArray.length){
                return;
            }else{
                angular.forEach($scope.ipArray, function(obj,index){
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
                            if(progressObjTemp.progress >= 100){
                                $scope.showInstallProccessing = false;
                                $scope.ipArray.splice(index, 1);
                            };
                        };
                    });
                });
            };
        };

        $scope.getProgress = function() {
            if(0 == $scope.ipArray.length){
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

        $scope.closeProgress = function(){
            $('#complete').modal('hide');
            $scope.toLogin();
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
        * 扫描网段
        */
        $scope.scanningIp = function () {
            var ipList = $scope.saveScanningIp;
            $scope.scanIPRangeDict = {
                "ipRangeList": [],
                "ipList": [],
                "storagePolicy": {
                    "policy": "replicated",
                    "replicated": {"size":2}
                }
            };
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
            if ($scope.physicalPool.name == undefined || $scope.physicalPool.name == null || $scope.physicalPool.name == '') {
                $scope.scanIPRangeDict.pool_name = 'system';
            } else {
                $scope.scanIPRangeDict.pool_name = $scope.physicalPool.name;
            }
            //显示加载图标
            $scope.showLoading = true;
            $scope.isScanIp = true;
            $scope.configResourse();
            // $scope.initWindow();
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
                    $scope.disablecreate = false;
                    $scope.isShowNodeNum = true;
                    $scope.nodeObj = response.data;
                    $scope.num = 0;
                    $scope.securityLevel = $scope.nodeObj.physical_pool.install_info.installer.security_level;
                    $scope.securityLevelOptions = $scope.nodeObj.physical_pool.install_info.installer.security_level_options;
                    var existRack = $scope.nodeObj.physical_pool.install_info.installer.exist_rack;

                    angular.forEach($scope.nodeObj.physical_pool.install_info.servers, function(node, index){
                        if(node.progress != -1){
                            $scope.progressRecord = $scope.progressRecord + 1;
                            $scope.disablecreate = true;
                            $scope.showTimeTips = false;
                        }
                        if(node.selected) {
                            node.$checked = true;
                            $scope.num++;
                            $scope.ipArray.push(node.originalIp.ipaddr);
                        }
                        for (var i = 0; i < node.disks.length; i++) {
                            if (node.disks[i].selected == 1) {
                                node.disks[i].useType = 'disk';
                            }
                        }
                        if (existRack[index] !== undefined) {
                            node.rack = existRack[index];
                            $scope.rackData.push({'name': existRack[index], 'ip': [node.originalIp.ipaddr], 'selected': 1});
                        }
                    });
                    // console.log($scope.nodeObj)
                    if($scope.progressRecord > 0){
                        $scope.isComplete = true;
                        $scope.ipArray = arrayRidRepeat($scope.ipArray);
                        $scope.getProgress();
                    };

                    if (!$scope.disablecreate) {
                        $scope.nodeObj.physical_pool.pool_name = $scope.physicalPool.name;
                    }

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
            $('#storageTimeManagement').modal('show');
            $('#alertTimeDrift').modal('hide');
        }

        $scope.closeTimeManagementBox = function () {
            $('#storageTimeManagement').modal('hide');
        }

        $scope.showSetNodeTime = function (server) {
            $scope.nodeToChangeTime = server;
            $scope.newSystemTime = server.humanCheckTime;
            $('#storageTimeManagement').modal('hide');
            $('#nodeTimeSet').modal('show');
        }

        $scope.closeNodeTimeSet = function () {
            $('#nodeTimeSet').modal('hide');
            $('#storageTimeManagement').modal('show');
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
            $('#storageTimeManagement').modal('hide');
        }

        $scope.closeConfirmSyncTimeDialog = function ()
        {
            $('#syncConfirmDialog').modal('hide');
            $('#storageTimeManagement').modal('show');
        }

        $scope.showTimeAlertDialog = function (msg)
        {
            $('#alertTimeDrift').modal('show');
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
                $scope.netwokModeSelectValue = "2";
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

            var serverLength = $scope.nodeObj.physical_pool.install_info.servers.length;
            var rackTempArray = [];
            for (var i = 0; i < serverLength; i++) {
                var server = $scope.nodeObj.physical_pool.install_info.servers;
                if (server[i].rack == undefined || server[i].rack == null || server[i].rack == '') {
                    $scope.showDialog("机柜不能为空！");
                    return;
                }
                rackTempArray.push(server[i].rack)
                
            }

            if ($scope.securityLevel == 'rack' && arrayIsRepeat(rackTempArray)) {
                $scope.showDialog("安全级别为 rack，机柜名称不能相同！");
                return;
            }

            /**
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
            **/

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
                            if (disk.selected == 1){
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
            // console.log($scope.nodeObj)
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
                    if (resp.data && $.inArray('equal_wwid',resp.data)==-1){
                        $scope.wwidEqualServer = resp.data.server_list
                        $('#alertDiskWwidEqual').modal('show')
                    }
                    $scope.isComplete = false;
                    $scope.disablecreate = false;
                    $scope.showDialog("配置提交失败！Message: " + resp.message);
                };
            });
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
            if (node.osSupport.min_version_support == 0 && type != "osddisk" && type != "writecache") {
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

        /** 动态固定 **/
        $scope.regDropdown = function () {
            //将下拉框固定
            $(".dropdown-menu").click(function (event) {
                event.stopPropagation();
            });
        };

        $scope.showCreateRack = function () {
            $('#storageCreateRackModal').modal('show');
        }

        $scope.showManageRack = function () {
            $scope.manageRackStore = { };
            $scope.$watch("manageRackStore.name", function (obj) {
                if (obj == undefined) {
                    $scope.manageRackStore.name = [];
                }
            });
            $('#manageRackModal').modal('show');
        }

        $scope.createSingleRack = function(hostid) {
            var hostidRack = $('#' + hostid + 'Rack');

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
                if (node.hostid === hostid) {
                    node.rack = hostidRack.val();
                    $scope.rackData.push({'name': hostidRack.val(), 'ip': [node.originalIp.ipaddr], 'selected': 1});
                    hostidRack.val('');
                }
            });
        };

        /** 创建 Rack **/
        $scope.createRack = function () {
            var ipStore = [];
            var $li = $('#storageRackSelect').children('.ms-selection').find('li');
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
            $('#storageCreateRackModal').modal('hide');
            clearSelection();
        }

        function multSelect() {
            var el = angular.element(document.getElementById('storageRackSelect'));

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
            var el = angular.element(document.getElementById('storageRackSelect'));
            el.children('.ms-selectable').find('li').removeClass('ms-selected');
            el.children('.ms-selection').find('li').remove();
        }

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
            if (arr.rack !== undefined) {
                angular.forEach($scope.rackData, function(r){
                    if (r.name === arr.rack) {
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
            $scope.selectArr.rack = obj.name;
        }

        $scope.showAdvancedModal = function () {
            $('#advancedOptionModal').modal('show');
        };

        // 设置定时任务
        $scope.storageTimeTicker = null;
        if ($scope.storageTimeTicker) {
            clearInterval($scope.storageTimeTicker);
        }
        $scope.storageTimeTicker = setInterval(function () {
            //存储容量显示
            getPoolInfo();
        }, 30000);// refresh least interval is 30s, for bakend server update data once every 30s);

        // 设置定时任务取消的触发事件
        $rootScope.$on('$stateChangeStart', cancelTimer);
        function cancelTimer(event, toState, toParams, fromState, fromParams) {
            clearInterval($scope.storageTimeTicker);
        }

        init();
    }


    /** 模板中的值 初始化 **/
    function initModalValue(scope, _this, modalId, obj, storageFactory) {
        _this.isYesConfirm      = '';
        _this.isYesAgainConfirm = '';
        _this.sure2deleteAgain  = false;
        _this.sizeUnit = "GB";
        _this.initiatorRemark = 'null';

        if (_this.needToGetPool.includes(modalId)){
            getPoolList(_this, storageFactory)
        }
        if (_this.needToGetTarget.includes(modalId)){
            scope.getTargets()
        }

    }


    /** 获取存储池 **/
    function getPoolList(_this, storageFactory){ 
        storageFactory.resourcePoolList(function(response){
            if (response.success) {
                _this.poolList = response.data['physical_pools'];
            }
        });
    }

    function setStorageErrMsg($scope, msg) {
        $scope.errMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.errMsg = "";
        }, 5000);
    };

    /** 设置快照错误信息 **/
    function setSnapErrMsg($scope, msg) {
        $scope.snapErrMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.snapErrMsg = "";
        }, 5000);
    };

    /** 设置弹出框底层错误信息提示 **/
    function setBottomErrMsg($scope, msg) {
        $scope.bottomErrMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.bottomErrMsg = "";
        }, 3000);
    };


    /** 查询当前块设备下的客户端 **/
    function queryVolumeClient(_this, currentVolume, storageFactory){
        var params = {'volumeName': currentVolume.volumeName}
        storageFactory.getVolumeClient(params, function(response){
            if (response.success){
                var ipList = angular.copy(response.data);
                _this.voluemClientList = new Array();
                var hostList = _this.hostInfoList;
                for(var i=0; i<ipList.length; i++){
                    for(var j=0; j<hostList.length; j++){
                        if(ipList[i] == hostList[j].bussinessNetwork.ipaddr){
                            _this.voluemClientList.push({'name': hostList[j].hostid, 'ip': ipList[i]})
                        }
                    }
                }             
            }
        })
    }


    /**查询target下的chap**/
    function queryTargetChap(_this, currentTarget, storageFactory){
        try{
            storageFactory.getTargetChap({targetName: currentTarget.name},
                function (response){
                    if (response.success == 1){  
                        _this.targetChapList = response.data;
                    }
                }
            );
        }catch(err){}
    }


    /** 带单位的大小转为字节数 **/
    function unitSizeToBytes(unitValue) {
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

    /** 字节数转为带单位的大小 **/
    function byteTosUnitSize(byteValue) {
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

    function byteTosUnitSizeObj(byteValue) {
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

    /**
     * 获取容量圆饼的选项
     */
    function getCapacityPieOption(usedVal, freeVal, radiusVal) {
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function(params) {
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline: 'top'
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            }
        };
        var usedSpace = {
            normal: {
                color: '#1D95D4',
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}',
                    textStyle: {
                        baseline: 'bottom'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var freeSpace = {
            normal: {
                color: '#DAE3E8',
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        color: '#353535'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: '#ccc',
                borderWidth: 0
            }
        };

        var option = {
            calculable: false,
            toolbox: {
                show: false,
                feature: {
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: 'pie',
                        option: {
                            funnel: {
                                width: '100%',
                                height: '100%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            formatter: function(params) {
                                                return 'other\n' + params.value + '%\n';
                                            },
                                            textStyle: {
                                                baseline: 'middle'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radiusVal,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [{
                    name: 'used',
                    value: usedVal,
                    itemStyle: usedSpace
                }, {
                    name: 'free',
                    value: freeVal,
                    itemStyle: freeSpace
                }]
            }]
        };

        return option;
    }
})();
