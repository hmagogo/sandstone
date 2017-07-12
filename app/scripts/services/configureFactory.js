/**
 * Created by zpc.
 */
sdsomwebApp.factory("configFactory", function(Restangular){
    return{
        //获取集群名称接口
    	getClustName: function (callback) {
        	Restangular.all(urlConfig.get("sysClustGet")).post().then(callback);
        },
        updateClustName: function(params, callback) {
        	Restangular.all(urlConfig.get("sysClustUpdate")).post(params).then(callback);
        },
        //集群外部访问IP地址接口
        getPublicIp: function(callback) {
        	Restangular.all(urlConfig.get("sysIpGet")).post().then(callback);
        },
        updateSysIp: function(params, callback) {
        	Restangular.all(urlConfig.get("sysIpUpdate")).post(params).then(callback);
        },

        //NTP Server接口
        getNtpServer: function(callback) {
        	Restangular.all(urlConfig.get("sysNtpGet")).post().then(callback);
        },
        updateNtpServer: function(params, callback) {
        	Restangular.all(urlConfig.get("sysNtpUpdate")).post(params).then(callback);
        },
        //获取初始化进程
        getProgress: function(params, callback){
        	Restangular.all(urlConfig.get("getProgress")).post(params).then(callback);
        },
        //集群节点列表获取
        getSysNode: function(params, callback) {
        	Restangular.all(urlConfig.get("sysNodeGet")).post(params).then(callback);
        },
        updateSysNode: function(params, callback) {
        	Restangular.all(urlConfig.get("sysNodeUpdate")).post(params).then(callback);
        },

		//节点时间配置, added by hosfore 20160225
		setNodeTime: function(params, callback) {
			Restangular.all(urlConfig.get("setNodeTime")).post(params).then(callback);
		},
		getNodeListTime: function(params, callback) {
			Restangular.all(urlConfig.get("getNodeListTime")).post(params).then(callback);
		},
		syncClusterNodeTime: function(params, callback) {
			Restangular.all(urlConfig.get("syncClusterNodeTime")).post(params).then(callback);
		},
    }
});
