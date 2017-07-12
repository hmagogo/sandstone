/**
 * Created by yuguangda on 2014/12/20.
 */


//授权列表
exports.license = {
    "success": 1,
    "data": [
        {
            "hostname": "sandstone0001",
            "ip": "192.169.1.151",
            "license": "691afa5b-b95b-4d97-a244-6ea5379384f12-20150414",
            "expiredtime": "2022-04-14"
        },
        {
            "hostname": "sandstone0002",
            "ip": "192.169.1.152",
            "license": "",
            "expiredtime": ""
        },
        {
            "hostname": "sandstone0003",
            "ip": "192.169.1.153",
            "license": "691afa5b-b95b-4d97-a244-6ea5379384f12-20150414",
            "expiredtime": "2022-04-14"
        },
        {
            "hostname": "sandstone0004",
            "ip": "192.169.1.154",
            "license": "691afa5b-b95b-4d97-a244-6ea5379384f12-20150414",
            "expiredtime": "2015-06-14"
        },
        {
            "hostname": "sandstone0005",
            "ip": "192.169.1.155",
            "license": "691afa5b-b95b-4d97-a244-6ea5379384f12-20150414",
            "expiredtime": "2015-04-14"
        }
    ]
};

//存储总量
exports.capacityData = {
    success: 1,//0失败，1成功
    message: "",
    data: {
        "free_bytes": 11123123123.37,
        "used_bytes": 74874874960,
        "capacity_bytes": 121231231232.00    //单位byte
    }
};

//应用主机总数
exports.chost = {
    success: 1,//0失败，1成功
    message: "",
    data: {
        running: 12,
        unrunning: 12,
        total: 12
    }
};

//硬件summary节点数
exports.summaryData = {
    success: 1,
    message: "",
    data: {
        total: 4,
        ok: 3,
        down: 1
    }
}

//集群数据
exports.prefIops = {
    "message": "request is processed successfully!",
    "success": 1,
    "data": {
        "targets": "iops.rw",
        "datapoints": [
            [
                1422936780,
                7
            ], [
                1422936810,
                9
            ], [
                1422936840,
                8
            ], [
                1422936870,
                9
            ], [
                1422936900,
                10
            ], [
                1422936930,
                9
            ], [
                1422936960,
                8
            ], [
                1422936990,
                null
            ], [
                1422937020,
                9
            ], [
                1422937050,
                9
            ], [
                1422937080,
                9
            ], [
                1422937110,
                8
            ], [
                1422937140,
                9
            ], [
                1422937170,
                9
            ], [
                1422937200,
                8
            ], [
                1422937230,
                10
            ], [
                1422937260,
                9
            ], [
                1422937290,
                8
            ], [
                1422937320,
                9
            ], [
                1422937350,
                10
            ]
        ]
    }
};
exports.prefMbps = {
    "message": "request is processed successfully!",
    "success": 1,
    "data": {
        "targets": "mbps.rw",
        "datapoints": [
            [
                1422936300,
                35636
            ], [
                1422936330,
                42769
            ], [
                1422936360,
                34850
            ], [
                1422936390,
                33485
            ], [
                1422936420,
                32632
            ], [
                1422936450,
                36899
            ], [
                1422936480,
                29900
            ], [
                1422936510,
                35942
            ], [
                1422936540,
                33860
            ], [
                1422936570,
                34441
            ], [
                1422936600,
                39936
            ], [
                1422936630,
                34986
            ], [
                1422936660,
                34133
            ], [
                1422936690,
                33758
            ], [
                1422936720,
                33382
            ], [
                1422936750,
                36488
            ], [
                1422936780,
                29901
            ], [
                1422936810,
                37034
            ], [
                1422936840,
                31676
            ], [
                1422936870,
                35055
            ]
        ]
    }
};
exports.prefLatency = {
    success: 1,//0失败，1成功
    message: "",
    data: {
        targets: "latency.rw",
        datapoints: [
            ['08:00', 12],
            ['08:05', 45],
            ['08:10', 62],
            ['08:15', 78],
            ['08:20', 12],
            ['08:25', 36],
            ['08:30', 87],
            ['08:35', 43],
            ['08:40', 87],
            ['08:45', 62],
            ['08:50', 67],
            ['08:55', 52],
            ['09:00', 92]
        ]
    }
};

exports.allConfirm = {
    success: 1,
    message: "",
    data: {
        critical: "123",
        warning: "12",
        info: "12"
    }
}


exports.critical = {
    "message": "request is processed successfully!",
    "data": {
        "totalCount": 4,
        "pagesize": "10",
        "pageno": 1,
        "results": [{
            "resolved": 0,
            "index": "servername : node0001, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.157",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "\u8bb8\u53ef\u8bc1",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.157",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "1",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0002, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.158",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "\u8bb8\u53ef\u8bc1",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.158",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "2",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 1,
            "index": "servername : node0002, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.158",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "\u8bb8\u53ef\u8bc1",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.158",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "3",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.159",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "\u8bb8\u53ef\u8bc1",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "4",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 1,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "5",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "6",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.159",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "许可证",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "7",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "8",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "服务器",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "9",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "10",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "11",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "12",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "13",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: sys_ServerDown, objname: node0003, serverip: ",
            "confirmed": 0,
            "resolveTime": "2016-05-26 09:49:07",
            "severity": "critical",
            "object": "\u670d\u52a1\u5668",
            "when": "2016-05-25 10:37:14",
            "detail": null,
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": "system",
            "confirmTime": null,
            "tips": "\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7535\u6e90\u3001\u7f51\u5361\u3001\u7f51\u7ebf\u3001\u4ea4\u6362\u673a\u8fde\u63a5\u72b6\u6001\uff0c\u786e\u4fdd\u5176\u6b63\u5e38\u3002\u5982\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u5382\u5546\u8fdb\u884c\u7ef4\u62a4\u3002",
            "id": "14",
            "description": "\u670d\u52a1\u5668\u65e0\u6cd5\u901a\u8baf\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.159",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "许可证",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "15",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }, {
            "resolved": 0,
            "index": "servername : node0003, objtype: LicenseDue, objname: LicenseDue, serverip: 10.10.5.159",
            "confirmed": 0,
            "resolveTime": null,
            "severity": "warning",
            "object": "许可证",
            "when": "2016-05-25 10:02:45",
            "detail": "License due alarm!!!",
            "indexShow": "\u8282\u70b9 10.10.5.159",
            "operater": null,
            "confirmTime": null,
            "tips": "\u8bf7\u8054\u7cfb\u5382\u5bb6\u8d2d\u4e70\u8bb8\u53ef\u8bc1\u3002",
            "id": "16",
            "description": "\u8bb8\u53ef\u8bc1\u5feb\u5230\u671f\u3002"
        }]
    },
    "success": 1
};

exports.warning = {
    success: 1,
    message: "",
    data: {
        pageno: "1",
        pagesize: "10",
        totalCount: "23",
        results: [{
            id: "id1",
            severity: "warning",
            description: "简述简33333述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码",
            severity: "warning",
            description: "简述eeeeeeeeee述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 1,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "主机及",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码2",
            severity: "warning",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 1,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码3",
            severity: "warning",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "id5",
            severity: "warning",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }]
    }
};
exports.infoDa = {
    success: 1,
    message: "",
    data: {
        pageno: "1",
        pagesize: "10",
        totalCount: "23",
        results: [{
            id: "id1",
            severity: "info",
            description: "简述简33333述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码",
            severity: "info",
            description: "简述eeeeeeeeee述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 1,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "主机及",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码2",
            severity: "info",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 1,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "错误码3",
            severity: "info",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }, {
            id: "id5",
            severity: "info",
            description: "简述简述",
            detail: "ds",
            when: "2014-12-12",
            confirmed: 0,
            confirmTime: "",
            resolved: 0,
            resolveTime: "",
            operater: "操作员",
            object: "告警对象",
            tips: "解决提示"
        }]
    }
}

