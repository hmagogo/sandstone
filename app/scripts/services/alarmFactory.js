/**
 * Created by yuguangda on 2014/12/20.
 */
sdsomwebApp.factory("alarmFactory", function(Restangular){
    return{
        //查询告警信息列表
        sdsAlarmList: function (queryParams, callback) {
        	Restangular.all(urlConfig.get("sdsAlarmList")).post(queryParams).then(callback);
        },
        //确认告警信息
        sdsAlarmConfirm: function (ids, callback) {
        	Restangular.all(urlConfig.get("sdsAlarmConfirm")).post(ids).then(callback);
        },
        //解决告警信息
        sdsAlarmResolve: function (ids, callback) {
            Restangular.all(urlConfig.get("sdsAlarmResolve")).post(ids).then(callback);
        },
        //获取日志
        sdsClusterLog: function (callback) {
        	Restangular.one(urlConfig.get("sdsClusterLog")).post().then(callback);
        },
        //删除日志
        deleteSdsClusterLog: function (logs, callback) {
        	Restangular.all(urlConfig.get("deleteSdsClusterLog")).post(logs).then(callback);
        },
        //创建日志
        createSdsClusterLog: function (logs, callback) {
        	Restangular.all(urlConfig.get("createSdsClusterLog")).post(logs).then(callback);
        },
        //下载日志
        downloadSdsLog: function (ip, callback) {
            Restangular.all(urlConfig.get("sdsLogDownload")).post(ip).then(callback);
        }
    }
});

sdsomwebApp.factory("eventFactory", function(Restangular){
    return{
        //查询告警信息列表
        sdsEventList: function (queryParams, callback) {
        	Restangular.all(urlConfig.get("sdsEventList")).post(queryParams).then(callback);
        }
    }
});