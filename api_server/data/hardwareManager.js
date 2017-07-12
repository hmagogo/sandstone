/**
 * Created by huangminxuan on 2016/4/21.
 */
exports.currentStatus = {
    "message": "Default success message.",
    "data": {
        "count": 12,
        "total": 12,
        "type": "Storage Server",
        "status": [
            {
                "updateTime": "None",
                "nodeName": "node0001",
                "nodeStatus": "ok",
                "nodeIp": "100.100.100.120",
                "machineInfo":{
                    "capacityRate" : "25.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670"}, { "model" : "E5-2300"}
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "down",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0002",
                "nodeStatus": "down",
                "nodeIp": "10.10.1.222",
                "machineInfo":{
                    "capacityRate" : "30.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "read_cache",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "SSD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "read_cache",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "SSD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "write_cache",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "SSD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "write_cache",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "SSD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "down",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0003",
                "nodeStatus": "warn",
                "nodeIp": "10.10.1.03",
                "machineInfo":{
                    "capacityRate" : "36.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": ''
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": ''
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": ''
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0004",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.04",
                "machineInfo":{
                    "capacityRate" : "50.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "warn",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno2",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno2",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno3",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0005",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.05",
                "machineInfo":{
                    "capacityRate" : "33.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "warn",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0006",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.06",
                "machineInfo":{
                    "capacityRate" : "42.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0007",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.07",
                "machineInfo":{
                    "capacityRate" : "43.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0008",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.08",
                "machineInfo":{
                    "capacityRate" : "62.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "ok",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0009",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.09",
                "machineInfo":{
                    "capacityRate" : "100.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0010",
                "nodeStatus": "ok",
                "nodeIp": "10.10.1.10",
                "machineInfo":{
                    "capacityRate" : "10.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],

                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0011",
                "nodeStatus": "is_rollbacking",
                "progress_status": 40,
                "nodeIp": "10.10.1.11",
                "machineInfo":{
                    "capacityRate" : "70.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0012",
                "nodeStatus": "is_expanding",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0013",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0014",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0015",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            },
            {
                "updateTime": "None",
                "nodeName": "node0016",
                "nodeStatus": "ok",
                "progress_status": 20,
                "nodeIp": "10.10.1.12",
                "machineInfo":{
                    "capacityRate" : "98.0",
                    "serverModel" : "DELL R720",
                    "cpu":[
                        {"model" : "E5-2670",},{ "model" : "E5-2300",},
                    ],
                    "mem": 38403910,
                    "raidCard": "HR710",
                    "os":"centos7.2",
                    "status": "normal",
                    "software_version" : "v2.6-572",
                },
                "disks": [
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    },
                    {
                        "status": "ok",
                        "lightStatus": "off",
                        "used_capacity":200787030016,
                        "capacity": 4000787030016,
                        "function": "data",
                        "smartStatus": "normal",
                        "serviceTimeStatus": "normal",
                        "device_name": "sda",
                        "progress": "100",
                        "vendor": "WDC",
                        "type": "HDD",
                        "wwid": "50014ee20bde4da3"
                    }
                ],
                "nics": [
                    {
                        "status": "down",
                        "type": "bussiness",
                        "name": "eno1",
                        "lanNum": 2,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno1",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno2",
                        "lanNum": 1,
                        "speed":"1500MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    },
                    {
                        "status": "ok",
                        "type": "cluster",
                        "name": "cno3",
                        "lanNum": 3,
                        "speed":"1000MB",
                        "macAddr":"45:32:ad:2a",
                        "MTU":1500,
                        "packet_loss_count": 1233
                    }
                ],
                "bonds": [
                    {
                        "name": "bond0",
                        "type": "bussiness",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1200,
                        "packet_loss_count": 1233
                    },
                    {
                        "name": "bond1",
                        "type": "cluster",
                        "speed": "2000MB",
                        "macAddr": "45:32:ad:1d",
                        "MTU":1500,
                        "packet_loss_count": 1233,
                    }
                ],
                "bussinessNetwork": {
                    "netmask": "255.0.0.0",
                    "ipaddr": "10.10.1.112",
                    "gateway": "0.0.0.0"
                },
                "clusterNetwork": {
                    "netmask": "255.255.255.0",
                    "ipaddr": "126.251.1.112",
                    "gateway": null
                }
            }
        ]
    },
    "success": 1
};

exports.lossPackets = {
    "message": "Default success message.",
    "data": {
        "node0001": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0002": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 3,
            "cno2": 44,
            "cno3": 44
        },
        "node0003": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0004": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0005": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0006": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0007": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0008": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0009": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0010": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0011": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        },
        "node0012": {
            "bond0": 0,
            "bond1": 1,
            "eno1": 2,
            "cno1": 0,
            "cno2": 0,
            "cno3": 0
        }
    },
    "success": 1
}

exports.license = {
    'message': 'Default success message.',
    'data': {
        'license_data': [{
            'ip': '10.10.5.31',
            'hostid': 'node0001',
            'expiredtime': 1844785,
            'license': '',
            'machineid': '1121486053859-325234033258-1616185626860-57161499040'
        }, {
            'ip': '10.10.5.32',
            'hostid': 'node0002',
            'expiredtime': 1844775,
            'license': '',
            'machineid': '1121486053859-325234033258-430401353160-694442563852'
        }, {
            'ip': '10.10.5.33',
            'hostid': 'node0003',
            'expiredtime': 1844935,
            'license': '',
            'machineid': '1121486053859-325234033258-1403458127919-234654793045'
        }],
        'used_capacity': '45.00 GB',
        'authorized_capacity': '0 GB'
    },
    'success': 1
};

exports.status = {
    'message': 'Default success message.',
    'data': {
        'nodeCount': 3,
        'totalMem': 11.0,
        'totalCPU': 3,
        'hddCount': 3,
        'ssdCount': 0
    },
    'success': 1
};

exports.nodeConfiguration = {
    "message": "Get node config successfully.",
    "data": {
        "cluster": {
            "bizNetAndClusterNetSharedNics": "0",
            "isReadWriteCacheMix": "0",
            "omPublicIpaddr": "126.251.5.188",
            "omBussinessNetmask": "255.0.0.0",
            "omBizNetAndBizNetSharedNics": "1",
            "omBussinessIpaddr": "10.10.5.31",
            "omBussinessGateway": "0.0.0.0"
        },
        "servers": [{
            "bussinessIP": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.185",
                "gateway": "0.0.0.0"
            },
            "disks": [{
                "capacity": "16777216K",
                "name": "sdb",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c29547812a4e5ba1a1a38ede4799"
            }, {
                "capacity": "16777216K",
                "name": "sdc",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c29273503e341baf988165144a4f"
            }],
            "nics": [{
                "slot": 161,
                "selected": 1,
                "name": "ens160",
                "network": "bussiness"
            }, {
                "slot": 193,
                "selected": 1,
                "name": "ens192",
                "network": "bussiness"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "public"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "public"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "cluster"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "cluster"
            }],
            "selected": 1,
            "publicIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.185"
            },
            "originalIp": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.185"
            },
            "hostid": "node0001",
            "clusterIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.185"
            },
            "progress": 100
        }, {
            "bussinessIP": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.186",
                "gateway": "0.0.0.0"
            },
            "disks": [{
                "capacity": "16777216K",
                "name": "sdb",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c299ca4ea73038a62ebd814f6e8d"
            }, {
                "capacity": "16777216K",
                "name": "sdc",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c290ceb812da3842bdd8ee90c199"
            }],
            "nics": [{
                "slot": 161,
                "selected": 1,
                "name": "ens160",
                "network": "bussiness"
            }, {
                "slot": 193,
                "selected": 1,
                "name": "ens192",
                "network": "bussiness"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "public"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "public"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "cluster"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "cluster"
            }],
            "selected": 1,
            "publicIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.186"
            },
            "originalIp": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.186"
            },
            "hostid": "node0002",
            "clusterIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.186"
            },
            "progress": 100
        }, {
            "bussinessIP": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.187",
                "gateway": "0.0.0.0"
            },
            "disks": [{
                "capacity": "16777216K",
                "name": "sdb",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c29e65434e76de17646349d5c6cd"
            }, {
                "capacity": "16777216K",
                "name": "sdc",
                "selected": 1,
                "purpose": "osddisk",
                "type": "HDD",
                "wwid": "6000c29561b5c807efd967b0eaeacf89"
            }],
            "nics": [{
                "slot": 161,
                "selected": 1,
                "name": "ens160",
                "network": "bussiness"
            }, {
                "slot": 193,
                "selected": 1,
                "name": "ens192",
                "network": "bussiness"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "public"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "public"
            }, {
                "slot": 225,
                "selected": 1,
                "name": "ens224",
                "network": "cluster"
            }, {
                "slot": 257,
                "selected": 1,
                "name": "ens256",
                "network": "cluster"
            }],
            "selected": 1,
            "publicIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.187"
            },
            "originalIp": {
                "netmask": "255.0.0.0",
                "ipaddr": "10.10.5.187"
            },
            "hostid": "node0003",
            "clusterIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.5.187"
            },
            "progress": 100
        }]
    },
    "success": 1
};

exports.singledislover = {
    "message": "Default success message.",
    "data": {
        "cluster": {
            "bizNetAndClusterNetSharedNics": "0",
            "omBizNetAndBizNetSharedNics": "1"
        },
        "servers": [{
            "checkTime": 1464070456,
            "hostid": "node0001",
            "disks": [{
                "vendor": "WDC",
                "name": "sdb",
                "selected": 1,
                "purpose": "osddisk",
                "capacity": 3000592982016,
                "type": "HDD",
                "wwid": "f65603a64ee05001"
            }, {
                "vendor": "KINGSTON",
                "name": "sdc3",
                "selected": 1,
                "purpose": "writecache",
                "capacity": 17179869184,
                "type": "SSD",
                "wwid": "fcbc57006b785002-part3"
            }, {
                "vendor": "KINGSTON",
                "name": "sdc4",
                "selected": 1,
                "purpose": "readcache",
                "capacity": 1024,
                "type": "SSD",
                "wwid": "fcbc57006b785002-part4"
            }, {
                "vendor": "WDC",
                "name": "sdf",
                "selected": 1,
                "purpose": "osddisk",
                "capacity": 3000592982016,
                "type": "HDD",
                "wwid": "1a84ae524ee05001"
            }],
            "nics": [{
                "slot": "1",
                "status": "OK",
                "name": "enp2s0f0",
                "selected": 1,
                "mac": "a0:36:9f:2c:1b:0a",
                "network": "bussiness"
            }, {
                "slot": "2",
                "status": "OK",
                "name": "enp2s0f1",
                "selected": 1,
                "mac": "a0:36:9f:2c:1b:0b",
                "network": "bussiness"
            }, {
                "slot": "1",
                "status": "OK",
                "name": "enp6s0",
                "selected": 1,
                "mac": "10:c3:7b:20:65:db",
                "network": "cluster"
            }, {
                "slot": "1",
                "status": "OK",
                "name": "enp7s0",
                "selected": 1,
                "mac": "10:c3:7b:20:65:dc",
                "network": "cluster"
            }],
            "selected": 1,
            "publicIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.1.91"
            },
            "clusterIP": {
                "netmask": "255.255.255.0",
                "ipaddr": "126.251.1.91"
            },
            "bussinessIP": {
                "netmask": "255.255.0.0",
                "ipaddr": "10.10.1.91",
                "gateway": "0.0.0.0"
            },
            "originalIp": {
                "netmask": "255.255.0.0",
                "ipaddr": "10.10.1.91"
            },
            "progress": 20,
            "osSupport": {
                "min_version_support": 1,
                "max_version_support": 1,
                "kernel_version_support_list": ["2.6.32-431.el6.x86_64", "3.10.0-229.el7.x86_64", "3.10.0+10"],
                "kernel_version_name": "3.10.0-229.el7.x86_64"
            }
        }]
    },
    "success": 1
};

exports.clusterInfo = {
    "message": "Default success message.",
    "data": {
        'cpu_count' : 5,
        'mem_total' : 1233466,
        'disk_count' : 64,
        'data_disk_capacity' : 222365422,
        'cache_disk_capacity' : 12324459
    },
    "success": 1
};
