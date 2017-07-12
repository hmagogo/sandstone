/**
    * Created by yuguangda on 2014/12/20.
    */
sdsomwebApp.factory('mainFactory',function(Restangular){
  'use strict';
  return{
    //存储容量显示
    queryCapacity:function(callBack){
        return Restangular.one(urlConfig.get('storageCapacity')).post().then(callBack);
    },
    //查询硬件summary
    querySysNodes:function(callBack){
        return Restangular.one(urlConfig.get('getSysNodes')).post().then(callBack);
    },
    //查询应用主机
    queryChost:function(callBack){
        return Restangular.one(urlConfig.get('storageHost')).post().then(callBack);
    },

    //查询存储池
    queryResourcePool: function (queryParams, callback) {
        Restangular.all(urlConfig.get('queryResourcePool')).post(queryParams).then(callback);
    },
    //查询卷
    queryResourceVolume: function (queryParams, callback) {
        Restangular.all(urlConfig.get('getVolumes')).post(queryParams).then(callback);
    },
    //集群IOPS/集群IO宽带/平均时延（target:'iops.rw mbps.rw latency.rw'）
    queryPerf:function(data,callBack){
        return Restangular.all(urlConfig.get('storagePerf')).post(data).then(callBack);
    },
    // 采集信息获取
    getSeriesData:function(data,callBack){
        return Restangular.all(urlConfig.get('seriesData')).post(data).then(callBack);
    },
    //首页头部显示告警/一般/事件
    queryAllConfrim:function(callBack){
        return Restangular.one(urlConfig.get('sdsAlarmTotal')).post().then(callBack);
    },
    //首页头部显示告警/一般/事件
    querySdsomDbMode:function(callBack){
        return Restangular.one(urlConfig.get('sdsomDbMode')).post().then(callBack);
    },
    // 系统配置
    getIscsiSystemConf:function(callBack){
        return Restangular.one(urlConfig.get('systemConfIscsi')).post().then(callBack);
    },
    //首页查询告警数据
    queryConfirm:function(data,callBack){
        return Restangular.all(urlConfig.get('sdsAlarmList')).post(data).then(callBack);
    },
    //查询NTP Server
    queryServer: function (callBack) {
        return Restangular.all(urlConfig.get('sysNtpList')).post().then(callBack);
    },
    //新增NTP Server
    addServer: function (params, callBack) {
        return Restangular.all(urlConfig.get('sysNtpAdd')).post(params).then(callBack);
    },
    //删除NTP Server
    delServer: function (params, callBack) {
        return Restangular.all(urlConfig.get('sysNtpDel')).post(params).then(callBack);
    },

    // SNMP get
    getSnmp: function (callBack) {
        return Restangular.all(urlConfig.get('sysSnmpGet')).post().then(callBack);
    },
    // SNMP update
    updateSnmp: function (params, callBack) {
        return Restangular.all(urlConfig.get('sysSnmpUpdate')).post(params).then(callBack);
    },

    //查询SMTP
    querySmtp: function (callBack) {
        return Restangular.all(urlConfig.get('sysSmtpGet')).post().then(callBack);
    },
    //新增SMTP
    addSmtp: function (params, callback) {
        return Restangular.all(urlConfig.get('sysSmtpCfg')).post(params).then(callback);
    },
    //删除Smtp
    deleteSmtp: function (params, callback) {
        return Restangular.all(urlConfig.get('sysSmtpDel')).post(params).then(callback);
    },
    //发送测试邮件
    testSmtp: function (callback) {
        return Restangular.all(urlConfig.get('testSmtp')).post().then(callback);
    },
    //删除Smtp
    deleteSmtp: function (params, callBack) {
        return Restangular.all(urlConfig.get('sysSmtpDel')).post(params).then(callBack);
    },
    //增加联系人
    addSysEmail: function (email, callback) {
        Restangular.all(urlConfig.get('addSysEmail')).post(email).then(callback);
    },
    //修改联系人
    updateSysEmail: function (email, callback) {
        Restangular.all(urlConfig.get('updateSysEmail')).post(email).then(callback);
    },
    //删除联系人
    deleteSysEmail: function (emailId, callback) {
        Restangular.all(urlConfig.get('deleteSysEmail')).post({id: emailId}).then(callback);
    },
    //查询联系人
    querySysEmail: function (callback) {
        Restangular.one(urlConfig.get('querySysEmail')).post().then(callback);
    },
    //查询邮件服务状态
    queryEmailService: function (callback) {
        Restangular.one(urlConfig.get('queryEmailService')).post().then(callback);
    },
    //更新邮件服务状态
    updateEmailService: function (enabled, callback) {
        Restangular.all(urlConfig.get('updateEmailService')).post({enabled: enabled}).then(callback);
    },
    //修改用户密码
    updatePassword:function(data,callback){
        Restangular.all(urlConfig.get('updatePassword')).post(data).then(callback);
    },
    //查询所有节点的授权信息
    queryAllLicense:function(callback){
        Restangular.all(urlConfig.get('queryLicense')).post().then(callback);
    },
    updateLicense:function(data,callback){
        Restangular.all(urlConfig.get('updateLicense')).post(data).then(callback);
    },
    logout:function(data,callback){
        Restangular.all(urlConfig.get('sysLogout')).post().then(callback);
    },
    queryDiskReplaceMode: function(callback){
        Restangular.all(urlConfig.get('getDiskReplaceMode')).post().then(callback);
    },
    updateDiskReplaceMode: function(data,callback) {
        Restangular.all(urlConfig.get('setDiskReplaceMode')).post(data).then(callback);
    },
    getRebalance: function(callback){
        Restangular.all(urlConfig.get('getRebalance')).post().then(callback);
    },
    updateRebalance: function(data,callback) {
        Restangular.all(urlConfig.get('updateRebalance')).post(data).then(callback);
    },
    getScrub: function(callback){
        Restangular.all(urlConfig.get('getScrub')).post().then(callback);
    },
    updateScrub: function(data, callback){
        Restangular.all(urlConfig.get('updateScrub')).post(data).then(callback);
    },
    queryNodeInfo: function(callback){
        Restangular.all(urlConfig.get('upgradeNodeInfo')).post().then(callback);
    },
    startUpgrade: function(callback){
        Restangular.all(urlConfig.get('startUpgrade')).post().then(callback);
    },
    resetUpgradeEnviroment: function(callback){
        Restangular.all(urlConfig.get('resetUpgradeEnviroment')).post().then(callback);
    },
    rollbackVersion: function(callback){
        Restangular.all(urlConfig.get('rollbackVersion')).post().then(callback);
    },
    uploadPackage: function(data,callback){
        Restangular.all(urlConfig.get('uploadPackage')).post(data).then(callback);
    },
    getNowStatus: function(callback){
        Restangular.all(urlConfig.get('getNowStatus')).post().then(callback);
    },
    getVersion: function(callback){
        Restangular.all(urlConfig.get('getVersion')).post().then(callback);
    },
    getRecoverConfig: function(callback){
        Restangular.all(urlConfig.get("getRecoverConfig")).post().then(callback);
    },
    updateRecoverConfig: function(data,callback){
        Restangular.all(urlConfig.get("updateRecoverConfig")).post(data).then(callback);
    },
    getRestApi: function(callback){
        Restangular.all(urlConfig.get('getRestApi')).post().then(callback);
    },
    updateRestApi: function(callback){
        Restangular.all(urlConfig.get('updateRestApi')).post().then(callback);
    },
    getThinAssignSetting: function(callback){
        Restangular.all(urlConfig.get('getThinAssignSetting')).post().then(callback);
    },
    updateThinAssignSetting: function(data, callback){
        Restangular.all(urlConfig.get('updateThinAssignSetting')).post(data).then(callback);
    },
  };
});
