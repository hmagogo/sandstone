/**
    * created by wuchanggui
    * 2015-01-15
    */
sdsomwebApp.factory("storageFactory", ["Restangular", function (Restangular) {
    "use strict";

    return {
        //新增存储池副本数下拉列表
        resourcePoolStoragePolicy: function (callback) {
            Restangular.all(urlConfig.get("resourcePoolStoragePolicy")).post().then(callback);
        },
        //新增存储池
        addResourcePool: function (pool, callback) {
            Restangular.all(urlConfig.get("addResourcePool")).post(pool).then(callback);
        },
        //删除存储池
        deleteResourcePool: function (poolId, poolName, callback) {
            Restangular.all(urlConfig.get("deleteResourcePool")).post({poolId: poolId, poolName: poolName}).then(callback);
        },
        //修改存储池
        updateResourcePool: function (pool, callback) {
            Restangular.all(urlConfig.get("updateResourcePool")).post(pool).then(callback);
        },
        //查询存储池
        queryResourcePool: function (queryParams, callback) {
            Restangular.all(urlConfig.get("queryResourcePool")).post(queryParams).then(callback);
        },
        //查询存储池下拉列表
        resourcePoolList: function (callback) {
            Restangular.all(urlConfig.get("resourcePoolList")).post().then(callback);
        },
        //查询某个存储池的容量
        resourcePoolCapacity: function (poolId, callback) {
            Restangular.all(urlConfig.get("resourcePoolCapacity")).post({poolId: poolId}).then(callback);
        },
        //增加chap
        addPoolChap: function (chap, callback) {
            Restangular.all(urlConfig.get("addPoolChap")).post(chap).then(callback);
        },
        //获取chap列表
        queryPoolChap: function (poolName, callback) {
            Restangular.all(urlConfig.get("queryPoolChap")).post({poolName: poolName}).then(callback);
        },
        //删除chap
        deletePoolChap: function (chap, callback) {
            Restangular.all(urlConfig.get("deletePoolChap")).post(chap).then(callback);
        },

    /*add by masi for pool acl apis, 20150417*/
    addPoolAcl: function (aclParams, callback) {
        Restangular.all(urlConfig.get("addPoolAcl")).post(aclParams).then(callback);
    },
    deletePoolAcl: function (aclParams, callback) {
        Restangular.all(urlConfig.get("deletePoolAcl")).post(aclParams).then(callback);
    },
    queryPoolAcl: function (poolName, callback) {
        Restangular.all(urlConfig.get("queryPoolAcl")).post({poolName:poolName}).then(callback);
    },
    addPoolInitiator: function(params, callback) {
        Restangular.all(urlConfig.get("addInitiator")).post(params).then(callback);
    },
    delPoolInitiator: function(params, callback) {
        Restangular.all(urlConfig.get("deleteInitiator")).post(params).then(callback);
    },

    /*end add by masi for pool acl apis*/

    //新增LUN
    addResourceLun: function (lun, callback) {
        Restangular.all(urlConfig.get("addResourceLun")).post(lun).then(callback);
    },
    //删除LUN
    deleteResourceLun: function (lun, callback) {
        Restangular.all(urlConfig.get("deleteResourceLun")).post({lunName: lun.lunName, poolName: lun.poolName}).then(callback);
    },
    //修改LUN
    updateResourceLun: function (lun, callback) {
        Restangular.all(urlConfig.get("updateResourceLun")).post(lun).then(callback);
    },
    //查询LUN
    queryResourceLun: function (queryParams, callback) {
        Restangular.all(urlConfig.get("queryResourceLun")).post(queryParams).then(callback);
    },
    //新增BLOCK
    addResourceBlock: function (lun, callback) {
        Restangular.all(urlConfig.get("addResourceBlock")).post(lun).then(callback);
    },
    //删除BLOCK
    deleteResourceBlock: function (lun, callback) {
        Restangular.all(urlConfig.get("deleteResourceBlock")).post({lunName: lun.lunName, poolName: lun.poolName}).then(callback);
    },
    //修改BLOCK
    updateResourceBlock: function (lun, callback) {
        Restangular.all(urlConfig.get("updateResourceBlock")).post(lun).then(callback);
    },
    //查询BLOCK
    queryResourceBlock: function (queryParams, callback) {
        Restangular.all(urlConfig.get("queryResourceBlock")).post(queryParams).then(callback);
    },
    //获取存储池详情
    poolPref: function (queryParams, callback) {
        Restangular.all(urlConfig.get("poolPref")).post(queryParams).then(callback);
    },
    //获取LUN详情
    lunPref: function (queryParams, callback) {
        Restangular.all(urlConfig.get("lunPref")).post(queryParams).then(callback);
    },
    //创建主机
    createHost: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //修改主机
    updateHost: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //删除主机
    deleteHost: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //查询主机
    queryHost: function(parmas, callback){
        Restangular.all(urlConfig.get("queryResourceHost")).post(parmas).then(callback);
    },
    //创建主机组
    createHostGroup: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //修改主机组
    updateHostGroup: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //删除主机组
    deleteHostGroup: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //查询主机组
    queryHostGroup: function(parmas, callback){
        Restangular.all(urlConfig.get("")).post(parmas).then(callback);
    },
    //查询LUN下所有快照信息
    queryLunSnapshot:function(params,callback){
        Restangular.all(urlConfig.get("queryLunSnapshot")).post(params).then(callback);
    },
    //查询所有快照信息
    queryAllSnapList:function(callback){
        Restangular.all(urlConfig.get("queryAllSnapshot")).post().then(callback);
    },

    //创建快照
    addSnapshot:function(params,callback){
        Restangular.all(urlConfig.get("addSnapshot")).post(params).then(callback);
    },
    //修改快照
    updateSnapshot:function(params,callback){
        Restangular.all(urlConfig.get("updateSnapshot")).post(params).then(callback);
    },
    //修改快照
    rollbackSnapshot:function(params,callback){
        Restangular.all(urlConfig.get("rollbackSnapshot")).post(params).then(callback);
    },
    //删除快照
    deleteSnapshot:function(params,callback){
        Restangular.all(urlConfig.get("deleteSnapshot")).post(params).then(callback);
    },
    //快照克隆
    cloneVolume:function(params,callback){
        Restangular.all(urlConfig.get("cloneVolume")).post(params).then(callback);
	},
	// 获取卷数据列表
	getVolumes: function(params, callback) {
	    Restangular.all(urlConfig.get("getVolumes")).post(params).then(callback);
	},
	//获取当前卷下的acl
	getVolumeAcls: function(params, callback) {
	    Restangular.all(urlConfig.get("getVolumeAcls")).post(params).then(callback);
	},
	//更新卷的大小
	updateVolume: function(params, callback) {
	    Restangular.all(urlConfig.get("updateVolume")).post(params).then(callback);
	},
	//获取target列表
	getTargets: function(params, callback) {
	    Restangular.all(urlConfig.get("getTargets")).post(params).then(callback);
	},
	//获取target下的卷
	getTargetVolumes: function(params, callback) {
	    Restangular.all(urlConfig.get("getTargetVolumes")).post(params).then(callback);
	},
	//获取target下的acl列表
	getTargetAcl: function(params, callback) {
	    Restangular.all(urlConfig.get("getTargetAcl")).post(params).then(callback);
	},
	//获取启动器列表
	getInitiators: function(params, callback) {
	    Restangular.all(urlConfig.get("getInitiators")).post(params).then(callback);
	},
	//删除卷
	deleteVolume: function(params, callback) {
	    Restangular.all(urlConfig.get("deleteVolume")).post(params).then(callback);
	},
	//创建卷
	createVolume: function(params, callback) {
	    Restangular.all(urlConfig.get("createVolume")).post(params).then(callback);
	},
	//将卷映射为lun
	mapVolumeAsLun: function(params, callback) {
	    Restangular.all(urlConfig.get("mapVolumeAsLun")).post(params).then(callback);
	},
	//将卷映射为rbd
	mapVolumeAsRbd: function(params, callback) {
	    Restangular.all(urlConfig.get("mapVolumeAsRbd")).post(params).then(callback);
	},
	unmapVolumeFromLun: function(params, callback) {
	    Restangular.all(urlConfig.get("unmapVolumeFromLun")).post(params).then(callback);
	},
	getAllHostName: function(params, callback) {
	    Restangular.all(urlConfig.get("getAllHostName")).post(params).then(callback);
	},
	createTarget: function(params, callback) {
	    Restangular.all(urlConfig.get("createTarget")).post(params).then(callback);
	},
	deleteTarget: function(params, callback) {
	    Restangular.all(urlConfig.get("deleteTarget")).post(params).then(callback);
	},
	addTargetInitiator: function(params, callback) {
	    Restangular.all(urlConfig.get("addTargetInitiator")).post(params).then(callback);
	},
	addTargetChap: function(params, callback) {
	    Restangular.all(urlConfig.get("addTargetChap")).post(params).then(callback);
	},
	getTargetChap: function(params, callback) {
	    Restangular.all(urlConfig.get("getTargetChap")).post(params).then(callback);
	},
	targetAttach: function(params, callback) {
	    Restangular.all(urlConfig.get("targetAttach")).post(params).then(callback);
	},
	targetDetach: function(params, callback) {
	    Restangular.all(urlConfig.get("targetDetach")).post(params).then(callback);
	},
	delTargetChap: function(params, callback) {
	    Restangular.all(urlConfig.get("delTargetChap")).post(params).then(callback);
	},
	delTargetAcl: function(params, callback) {
	    Restangular.all(urlConfig.get("delTargetAcl")).post(params).then(callback);
	},
	addTargetAcl: function(params, callback) {
	    Restangular.all(urlConfig.get("addTargetAcl")).post(params).then(callback);
	},
	delTargetInitiator: function(params, callback) {
	    Restangular.all(urlConfig.get("delTargetInitiator")).post(params).then(callback);
	},
	getRbdClient: function(params, callback) {
	    Restangular.all(urlConfig.get("getRbdClient")).post(params).then(callback);
	},
	addInitiator: function(params, callback) {
	    Restangular.all(urlConfig.get("addInitiator")).post(params).then(callback);
	},
	getInitiatorTarget: function(params, callback) {
	    Restangular.all(urlConfig.get("getInitiatorTarget")).post(params).then(callback);
	},
	deleteInitiator: function(params, callback) {
	    Restangular.all(urlConfig.get("deleteInitiator")).post(params).then(callback);
	},
	getVolumeClient: function(params, callback) {
	    Restangular.all(urlConfig.get("getVolumeClient")).post(params).then(callback);
	},
	getPoolInfo: function(callback) {
	    Restangular.all(urlConfig.get("getPoolInfo")).post().then(callback);
	},
	getClientVolume: function(params, callback) {
	    Restangular.all(urlConfig.get("getClientVolume")).post(params).then(callback);
    }
};
}]);
