/**
    * Module dependencies.
    */
var express = require('express');
var http = require('http');
var path = require('path');
var mainData = require('./data/mainData');
var fixture = require('./data/fixture');
var alarm = require('./data/alarm');
var storage = require('./data/storage');
var cfg = require('./data/configure');
var nodeApi = require('./data/nodeManager');
var nodeBot = require('./data/nodeBottom');
var hardware = require('./data/hardwareManager');

var app = express();
// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//更新节点授权
app.post('/sds/hardware/license/update',function(req,res){
    var data = req.body;
    console.log(data);
    if(data.license.indexOf('_') != -1){
        res.send('{"success":1}');
    }else{
        var ll =
        res.send('{"success":0,"message":"invalid license string"}');
    }
})

//节点授权列表查询
app.post('/sds/hardware/license/query',function(req,res){
    res.send(fixture.license);
})

app.post('/api/v1/sds/common/collection/series/get', function(req, res){
    res.send(mainData.get);
});

//查询存储容量
app.post('/api/v1/sds/storage/capacity',function(req,res){
    //var name = req.query.name;
    res.send(fixture.capacityData);
});
//查询硬件summary节点数
app.post('/api/v1/sds/nodes/status',function(req,res){
    //var name = req.query.name;
    res.send(fixture.summaryData);
});
//查询应用主机
/*app.get('/storage/chost',function(req,res){
    res.send(fixture.chost);
});*/
//集群IOPS/集群IO宽带/平均时延（target:'iops.rw mbps.rw latency.rw'）
app.post('/api/v1/sds/storage/perf',function(req,res){
    var data = req.body;
        if('iops.rw'===data.target){
            res.send(fixture.prefIops);
        }else if('mbps.rw'===data.target){
            res.send(fixture.prefMbps);
        }else if('latency.rw'===data.target){
            res.send(fixture.prefLatency);
        }
});
//首页一次性查询所有告警相关数据
app.post('/api/v1/sds/alarm/total',function(req,res){
    res.send(fixture.allConfirm);
})
//首页分别查询告警数据
app.post('/api/v1/sds/alarm/list',function(req,res){
    var reqbody = req.body;
    var criticalData = fixture.critical.data.results;

    // 设置分页
    var startNo    = (reqbody.pageno - 1 ) * reqbody.pagesize;
    var endNo      = reqbody.pageno * reqbody.pagesize;
    var newResults = criticalData.slice(startNo, endNo);
    var responseModel = {
        'success': 1,
        'message': 'request is processed successfully!',
        'data': {
            "totalCount": 0,
            "pagesize": 10,
            "pageno": 1,
            "results": []
        }
    }
    responseModel.data.totalCount = criticalData.length;
    responseModel.data.pageno     = reqbody.pageno;
    responseModel.data.pagesize   = reqbody.pagesize;
    responseModel.data.results    = newResults;

    if('critical' === reqbody.severity[0]){
        res.send(responseModel);
    }else if('warning' === reqbody.severity[0]){
        res.send(fixture.warning);
    }else if('info' === reqbody.severity[0]){
        res.send(fixture.infoDa);
    }
});
//请求日志列表
app.post('/api/v1/sds/cluster/file/log_list',function(req,res){
    res.send(alarm.logList);
});

// 版本升级
app.post('/api/v1/sds/cluster/update/query2',function(req,res){
    res.send(mainData.upgrade);
});

//告警确认
app.post('/api/v1/sds/alarm/confirm', function (req, res) {
    console.log(req.body);
    res.send(storage.successMessage);
});
//请求告警列表
app.post('/api/v1/sds/alarm/resolve', function (req, res) {
    console.log(req.body);
    //res.send(storage.successMessage);
    res.send({
        success: 0,
        message: 'USER NOT AUTHORIZED TO ACCESS THIS PAGE'
    })
});
//集群节点列表获取
app.post('/api/v1/sds/system/node/get', function (req, res) {
    setTimeout(function(){
        res.send(cfg.cfgGroups);
    }, 30);

});
//集群节点列表更新
app.post('/api/v1/sds/system/node/update', function (req, res) {
    var group = req.body.data;
    console.log(group);
    for (var i = 0;i < cfg.progress.data.length; i++) {
        cfg.progress.data[i].progress = 0;
    }
    cfg.cfgGroups.data = group;
    res.send({success:1,message:''});
});
//集群名称获取
app.post('/api/v1/sds/system/clust/get', function (req, res) {
    res.send(cfg.clustName);
});
//集群名称更新
app.post('/api/v1/sds/system/clust/update', function (req, res) {
    console.log(req.body);
    cfg.clustName.data = req.body;
    res.send({success:1,message:''});
});
//集群外部访问IP地址获取
app.post('/api/v1/sds/system/ip/get', function (req, res) {
    res.send(cfg.hostIp);
});
//集群外部访问IP地址更新
app.post('/api/v1/sds/system/ip/update', function (req, res) {
    console.log(req.body);
    cfg.hostIp.data = req.body;
    res.send({success:1,message:''});
});
//集群NTP Server获取
app.post('/api/v1/sds/system/ntp/get', function (req, res) {
    res.send(cfg.ntpServer);
});
//集群NTP Server更新
app.post('/api/v1/sds/system/ntp/update', function (req, res) {
    console.log(req.body);
    cfg.ntpServer.data = req.body;
    res.send({success:1,message:''});
});
//查询邮件服务状态
app.post('/api/v1/sds/system/email/service/query', function (req, res) {
    res.send({
        success: 1,
        message: '',
        data: {
            enabled: 1
        }
    });
});
//查询联系人列表
app.post('/api/v1/sds/system/email/query', function (req, res) {
    res.send({
        success: 1,
        message: '',
        data: [{
            id: 1,
            email: 'djdyeff@sina.com'
        }, {
            id: 2,
            email: 'iamcold@qq.com'
        }]
    });
})
//获取默认副本数
app.post('/api/v1/storage/setting/replication', function (req, res) {
    console.log(req.body);
    res.send(storage.replicationListResponse);
});
//获取存储池列表
app.post('/api/v1/storage/pool/query', function (req, res) {
    console.log(req.body);
    res.send(storage.poolListResponse);
});
//获取存储池下拉列表
app.post('/api/v1/storage/pool/list', function (req, res) {
    console.log(req.body);
    res.send(storage.poolListResponse);
});
//增加存储池列表
app.post('/api/v1/storage/pool/add', function (req, res) {
    console.log(req.body);
    var pool = req.body;
    var poolList = storage.poolListResponse.data;
    pool.poolId = poolList.length + 1;
    pool.capacity_bytes = 10737418240 * Math.random() + 104857600;
    pool.used_bytes = 104857600 * Math.random();
    pool.free_bytes = pool.capacity_bytes - pool.used_bytes;
    pool.iops = (1000 * Math.random()).toFixed(2);
    pool.mbps = (100 * Math.random()).toFixed(2);
    pool.latency = (100 * Math.random()).toFixed(2);
    poolList.push(pool);
    setTimeout(function () {
        res.send(storage.successMessage);
    }, 10000);
});
//修改存储池列表
app.post('/api/v1/storage/pool/update', function (req, res) {
    console.log(req.body);
    res.send(storage.successMessage);
});
//删除存储池列表
app.post('/api/v1/storage/pool/delete', function (req, res) {
    console.log(req.body);
    res.send(storage.successMessage);
});
//获取某个存储池的大小
app.post('/api/v1/storage/pool/capacity', function (req, res) {
    console.log(req.body);
    var poolId = req.body.poolId;
    var poolList = storage.poolListResponse.data;
    for (var i = 0; i < poolList.length; i++) {
        if (poolList[i].poolId == poolId) {
            var response = {
                success: 1,
                message: '',
                data: poolList[i]
            }
            res.send(response);
        }
    }
});
//获取LUN列表
app.post('/api/v1/storage/lun/list', function (req, res) {
    res.send(storage.lunListResponse);
});
//增加LUN列表
app.post('/api/v1/storage/lun/add', function (req, res) {
    res.send(storage.successMessage);
});
//修改LUN列表
app.post('/api/v1/storage/lun/update', function (req, res) {
    res.send(storage.successMessage);
});
//删除LUN列表
app.post('/api/v1/storage/lun/delete', function (req, res) {
    res.send(storage.successMessage);
});
//获取 block 列表
app.post('/api/v1/storage/block/list', function (req, res) {
    res.send(storage.blockList);
});

//获取图形数据详情
app.post('/api/v1/sds/storage/pool/perf', function (req, res) {
    console.log(req.body);
    var response = {
        'success': 1,
        'message': '',
        'data': {
            'targets': ['iops.rw', 'mbps.rw', 'latency.rw'],
            'datapoints': []
        }
    }
    for (var i = 0; i < 2400; i++) {
        //var time = (i<10 ? '0'+i : '' + i) + ':00';
        var time = 1422936780 + i*30;
        var iops = 10 * Math.random();
        var mbps = 30000 + 20000 * Math.random();
        var capacity = 107374182400 * Math.random() + 1073741824;
        var pref = [];
        pref.push(time);
        pref.push(iops.toFixed(2));
        pref.push(mbps.toFixed(2));
        pref.push(capacity.toFixed(2));
        response.data.datapoints.push(pref);
    }
    res.send(storage.echartsData);
});
//获取节点个数和状态
app.post('/api/v1/sds/nodes/status', function (req, res) {
    console.log(req.body);
    res.send({
        success: 1,
        message: '',
        data: {
            total: 40,
            ok: Math.round(40*Math.random()),
            down: Math.round(40*Math.random())
        }
    });
});

//获取群集总体信息
app.post('/api/v1/sds/cluster/hardware/cluster_hardware_info', function (req, res) {
    res.send(hardware.clusterInfo);
});
//获取硬件详细信息
app.post('/api/v1/sds/hardware/status', function (req, res) {
    res.send(hardware.status);
});
//获取前后视图，结点状况
app.post('/api/v1/sds/hardware/view', function (req, res) {
    console.log(req.body);
    res.send(nodeApi.hardView);
});
//请求top节点
app.post('/api/v1/sds/cluster/hardware/monitor', function (req, res) {
    // console.log(req.body);
    var resJson = {
        success: 1,
        message: '',
        data: []
    }
    for (var i = 0; i < 3; i++) {
        var resObj = [];
        resObj.push('name'+ i);
        resObj.push('192.168.1.' + Math.round(255*Math.random()));
        if (req.body.resType == 'IOPS') {
            resObj.push(Math.round(1024*Math.random()));
        } else if (req.body.resType == 'MBPS') {
            resObj.push(Math.round(1024000*Math.random()));
        } else if (req.body.resType == 'CPU') {
            resObj.push(-1);
            // resObj.push(Math.round(100*Math.random()));
        } else if (req.body.resType == 'MEM') {
            resObj.push(Math.round(100*Math.random()));
        }
        resJson.data.push(resObj);
    }
    res.send(resJson);
});
/************************************************/
//获取主机列表
app.post('/api/v1/storage/host/list', function (req, res) {
    res.send(storage.hostListResponse);
});
//增加主机
app.post('/api/v1/storage/host/add', function (req, res) {

});
//修改主机
app.post('/api/v1/storage/host/update', function (req, res) {

});
//删除主机
app.post('/api/v1/storage/host/delete', function (req, res) {

});
var arrayProgress = [{ipaddr:'192.168.1.91', progress: 95},{ipaddr:'192.168.1.90', progress: 28}];
var num = 0;
//获取初始化进程
app.post('/api/v1/sds/system/progress/get', function (req, res) {
    console.log(req.body);
//	for (var i = 0; i < arrayProgress.length; i++) {
//		if(arrayProgress[i].progress >= 100) num++;
//	}
//	if(arrayProgress.length == num){
//		for (var i = 0; i < arrayProgress.length; i++) {
//			arrayProgress[i].progress = parseInt(Math.random()*50);
//		}
//		num = 0;
//	}
    for (var i = 0; i < arrayProgress.length; i++) {
        if(arrayProgress[i].ipaddr == req.body.ipaddr){
            if(arrayProgress[i].progress < 100){
                arrayProgress[i].progress = arrayProgress[i].progress + 5;
                cfg.progress.data.progress = arrayProgress[i].progress;
                cfg.progress.data.ipaddr = req.body.ipaddr;
            }

    }
}
res.send(cfg.progress);
});

//获取ntpserver
var ntpserverList = {
    message:'',
    success:'',
    data:[
        {
            id:'1',
            servername:'djdyeff@sina.com'
        },
        {
            id:'2',
            servername:'djdyeff@sina.com'
        }
    ]
}
app.post('/api/v1/sds/system/ntpserver/list', function (req, res) {
    res.send(ntpserverList);
});
app.post('/api/v1/sds/system/ntpserver/add', function (req, res) {
    var id = parseInt(Math.random()*1000);
    ntpserverList.data.push({id:id,servername:req.body.servername});
    res.send({message:'',success: 1});
});
app.post('/api/v1/sds/system/ntpserver/delete', function (req, res) {
    var id = req.body.id;
    for(var i=0; i < ntpserverList.data.length; i++){
        var server = ntpserverList.data[i];
        if(server.id == id){
            ntpserverList.data.splice(i, 1);
        }
    }
    res.send({message:'',success: 1});
});
//登录系统
app.post('/api/v1/sds/system/login', function (req, res) {
    var user = req.body;
    if(user.username == 'admin' && user.password == 'admin'){
        res.send({success:1,message:'admin,欢迎你'});
    }else{
        res.send({success:0,message:'用户名或密码错误'});
    }
});

//修改用户密码
app.post('/api/v1/sds/system/passWord/update',function(req,res){
    var user = req.body;
    var tip = 1;//修改成功
    if(user===''){
        tip=0;//修改失败
    }
    res.send({success:tip});
});

//集群硬件详细信息
app.post('/api/v1/sds/hardwares/status', function (req, res) {
    var user = req.body;
    res.send(nodeBot.nodeStatus);
});
//集群CPU使用详情
app.post('/api/v1/sds/hardware/cpu', function (req, res) {
    var user = req.body;
    res.send(nodeBot.nodeCpu);
});
//集群内存使用
app.post('/api/v1/sds/hardware/memory', function (req, res) {
    res.send(nodeBot.nodeMemory);
});
//磁盘容量详情
app.post('/api/v1/sds/hardware/disk', function (req, res) {
    res.send(nodeBot.nodeDisk);
});
//集群IOPS详情
app.post('/api/v1/sds/hardware/iops', function (req, res) {
    res.send(nodeBot.nodeIops);
});
//集群吞吐量性能
app.post('/api/v1/sds/hardware/mbps', function (req, res) {
    res.send(nodeBot.nodeMbps);
});

/****************************************************************
    * 第三期API
    * --------------------------------------------------------------
    */
//节点业务IP获取
app.post('/api/v1/sds/hardware/node/network/bussiness/get', function (req, res) {
    res.send(nodeApi.netBussGet);
});
//节点业务IP更新
app.post('/api/v1/sds/hardware/node/network/bussiness/update', function (req, res) {
    res.send({success: 1, message: ''});
});
//OM业务IP获取
app.post('/api/v1/sds/system/om/network/bussiness/get', function (req, res) {
    res.send(nodeApi.omNetBussGet);
});
//OM业务IP更新
app.post('/api/v1/sds/system/om/network/bussiness/update', function (req, res) {
    res.send({success: 1, message: ''});
});
//获取现有节点配置信息
app.post('/api/v1/sds/system/node/configuration/get', function (req, res) {
    res.send(cfg.cfgGroups);
});
//扫描新节点
app.post('/api/v1/sds/system/node/discover', function (req, res) {
    setTimeout(function () {
        res.send(nodeApi.nodeDiscover);
    }, 5000);
});
//新增新节点
app.post('/api/v1/sds/system/node/add', function (req, res) {
    res.send({success: 1, message: ''});
});
//进度获取
app.post('/api/v1/sds/system/node/progress/get', function (req, res) {
    res.send({success: 1, message: '', data: [{ipaddr: '192.168.1.1', progress: 90}]});
});

app.post('/api/v1/sds/cluster/hardware/current_status', function (req, res) {
    res.send(hardware.currentStatus);
});

app.post('/api/v1/sds/system/dbmode/get', function (req, res) {
    res.send({'message': 'Default success message.', 'data': {}, 'success': 1});
});

app.post('/api/v1/sds/hardware/license/query', function (req, res) {
    res.send(hardware.license);
});

app.post('/api/v1/sds/cluster/setting/disk/replacemode/get', function (req, res) {
    res.send({"message": "Default success message.", "data": {"diskReplaceMode": "manual"}, "success": 1});
});

app.post('/api/v1/sds/cluster/setting/rebalance/get', function (req, res) {
    res.send({"message": "Default success message.", "data": {"mon_osd_down_out_interval": "172800"}, "success": 1});
});

app.post('/api/v1/sds/cluster/setting/disk/replacemode/update', function (req, res) {
    res.send({"message": "Default success message.", "data": null, "success": 1});
});

app.post('/api/v1/sds/hardware/node/configuration/get', function (req, res) {
    res.send(hardware.nodeConfiguration);
});

app.post('/api/v1/sds/hardware/node/singledislover', function (req, res) {
    res.send(hardware.singledislover);
});

app.post('/api/v1/sds/hardware/node/discover', function (req, res) {
    res.send(hardware.singledislover);
});

app.post('/api/v1/sds/cluster/hardware/nic/loss_packets', function (req, res) {
    res.send(hardware.lossPackets);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('监听端口： ' + app.get('port'));
});
