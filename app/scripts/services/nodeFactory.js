sdsomwebApp.factory('nodeFactory', ['Restangular', function (Restangular) {
	'use strict';
	return {
		//查询节点信息
		getSysNodes: function (callback) {
			Restangular.one(urlConfig.get('getSysNodes')).post().then(callback);
		},
		//获取硬件信息
		getSysHard: function (callback) {
			Restangular.one(urlConfig.get('getSysHard')).post().then(callback);
		},
		//获取前后视图信息
		getSysHardView: function (callback) {
			Restangular.one(urlConfig.get('getSysHardView')).post().then(callback);
		},
		//获取Top3节点
		top3node: function (queryParams, callback) {
			Restangular.all(urlConfig.get('top3node')).post(queryParams).then(callback);
		},

        //获取群集总体信息
        getClusterInfo: function (callback) {
            Restangular.all(urlConfig.get('clusterInfo')).post().then(callback);
        },
        //集群硬件详细信息
        getNodeStatus:function(data,callBack){
            Restangular.all(urlConfig.get('nodeStatus')).post(data).then(callBack);
        },
        //集群CPU使用详情
        getNodeCpu:function(data,callBack){
            Restangular.all(urlConfig.get('nodeCpu')).post(data).then(callBack);
        },
        //集群内存使用
        getNodeMemory:function(data,callBack){
            Restangular.all(urlConfig.get('nodeMemory')).post(data).then(callBack);
        },
        //磁盘容量详情
        getNodeDisk:function(data,callBack){
            Restangular.all(urlConfig.get('nodeDisk')).post(data).then(callBack);
        },
        //集群IOPS详情
        getNodeIops:function(data,callBack){
            Restangular.all(urlConfig.get('nodeIops')).post(data).then(callBack);
        },
        //集群吞吐量性能
        getNodeMbps:function(data,callBack){
            Restangular.all(urlConfig.get('nodeMbps')).post(data).then(callBack);
        },
        //节点业务IP获取
        netBussGet: function (queryParams, callback) {
        	Restangular.all(urlConfig.get('netBussGet')).post(queryParams).then(callback);
        },
        //节点业务IP更新
        netBussUpdate: function (buss, callback) {
        	Restangular.all(urlConfig.get('netBussUpdate')).post(buss).then(callback);
        },
        //OM业务IP获取
        omNetBussGet: function (callback) {
        	Restangular.one(urlConfig.get('omNetBussGet')).post().then(callback);
        },
        //OM业务IP更新
        omNetBussUpdate: function (buss, callback) {
        	Restangular.all(urlConfig.get('omNetBussUpdate')).post(buss).then(callback);
        },
        //获取现有节点信息
        nodeConfGet: function (callback) {
        	Restangular.one(urlConfig.get('nodeConfGet')).post().then(callback);
        },
        //扫描新节点
        nodeDiscover: function (queryParams, callback) {
        	Restangular.all(urlConfig.get('nodeDiscover')).post(queryParams).then(callback);
        },
        //扫描单一新节点
        singledislover: function (queryParams, callback) {
            Restangular.all(urlConfig.get('singledislover')).post(queryParams).then(callback);
        },
        //新增新节点
        nodeAdd: function (nodeConf, callback) {
        	Restangular.all(urlConfig.get('nodeAdd')).post(nodeConf).then(callback);
        },
        //获取进度
        nodeProgGet: function (queryParams, callback) {
        	Restangular.all(urlConfig.get('nodeProgGet')).post(queryParams).then(callback);
        },
        //硬盘点灯请求
        nodeDiskLightTurn: function(requestParams, callback) {
            Restangular.all(urlConfig.get('nodeDiskLightTurn')).post(requestParams).then(callback);
        },
        //获取硬盘拔插状态
        nodeDiskCheckout: function(requestParams, callback) {
            Restangular.all(urlConfig.get('checkoutDisk')).post(requestParams).then(callback);
        },
        //替换硬盘
        nodeDiskSwapDisk: function(requestParams, callback) {
            Restangular.all(urlConfig.get('swapDisk')).post(requestParams).then(callback);
        },
        //添加磁盘扩容
        nodeDiskAddDisk: function(requestParams, callback) {
            Restangular.all(urlConfig.get('addDisk')).post(requestParams).then(callback);
        },
        // 节点操作
        nodeOperation: function(requestParams, callback) {
            Restangular.all(urlConfig.get('nodeOperation')).post(requestParams).then(callback);
        },
        //扩容进度查询
        expandProgress: function(requestParams, callback) {
            Restangular.all(urlConfig.get('expandProgress')).post(requestParams).then(callback);
        },
        //扩容进度回滚
        nodeRollback: function(requestParams, callback) {
            Restangular.all(urlConfig.get('nodeRollback')).post(requestParams).then(callback);
        }
	};
}]);
