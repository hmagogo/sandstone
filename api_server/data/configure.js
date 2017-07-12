exports.cfgGroups = {
    'message': 'Default success message.',
    'data': {
        'scanInterval': 0.29778814315795898,
        'cluster': {
            'isDualMachineSystem': 0,
            'diskReplaceMode': 'manual',
            'bondingMode': 6,
            'osdJournalNum': 1,
            'isReadWriteCacheMix': 0,              // 1: 缓存盘   0: 写缓存盘、读缓存盘
            'nodeNamePrefix': 'node',
            'osdFilesystem': 'xfs',
            'omPublicIpaddr': '126.251.5.30',
            'omBussinessNetmask': '255.0.0.0',
            'omBussinessIpaddr': '10.10.5.30',
            'application': {
                'openstack': {
                    'selected': 0
                },
                'used_application': 'common',
                'jzgk': {
                    'jzgkDbDiskLunId': '1',
                    'datasize': '11534336',
                    'selected': 0,
                    'jzgkdatadisklunid': '2',
                    'dbsize': '10240'
                }
            },
            'bizNetAndClusterNetSharedNics': 0,
            'isSdsCacheWB': 1,
            'omBizNetAndBizNetSharedNics': 1,
            'policy': {
                'erasureCode': 0
            },
            'ntpServer': '126.251.5.30',
            'omBussinessGateway': '0.0.0.0',
            'osdReplicateMode': 0
        },
        'timeinfo': {
            'skewedFlag': false,
            'skewedinfo': []
        },
        'servers': [{
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'HDD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'ssd',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                }
            ],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': 100,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'HDD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                }
            ],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            },{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'HDD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sbb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                }
            ],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'HDD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                }
            ],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [
                {
                    'vendor': 'VMware',
                    'name': 'sdb',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'HDD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                },
                {
                    'vendor': 'VMware',
                    'name': 'sad',
                    'selected': 1,
                    'purpose': 'osddisk',
                    'capacity': 17179869184,
                    'type': 'SSD',
                    'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
                }
            ],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }, {
            'checkTime': 1465025275.7022419,
            'hostid': 'localhost',
            'disks': [{
                'vendor': 'VMware',
                'name': 'sdb',
                'selected': 1,
                'purpose': 'osddisk',
                'capacity': 17179869184,
                'type': 'HDD',
                'wwid': '6000c2916ee7d10edb7e8b6ebb4a5989'
            }],
            'nics': [{
                'slot': '1',
                'status': 'OK',
                'name': 'eth0',
                'selected': 1,
                'mac': '00:50:56:84:5e:bf',
                'network': 'bussiness'
            }, {
                'slot': '2',
                'status': 'OK',
                'name': 'eth1',
                'selected': 1,
                'mac': '00:50:56:84:62:64',
                'network': 'bussiness'
            }, {
                'slot': '3',
                'status': 'OK',
                'name': 'eth2',
                'selected': 1,
                'mac': '00:50:56:84:6c:0e',
                'network': 'cluster'
            }, {
                'slot': '4',
                'status': 'OK',
                'name': 'eth3',
                'selected': 1,
                'mac': '00:50:56:84:41:89',
                'network': 'cluster'
            }],
            'selected': 1,
            'humanCheckTime': '2016-06-04 15:27:55   CST',
            'publicIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'clusterIP': {
                'netmask': '255.255.255.0',
                'ipaddr': '126.251.5.31'
            },
            'bussinessIP': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31',
                'gateway': '0.0.0.0'
            },
            'originalIp': {
                'netmask': '255.0.0.0',
                'ipaddr': '10.10.5.31'
            },
            'progress': -1,
            'osSupport': {
                'min_version_support': 1,
                'max_version_support': 1,
                'kernel_version_support_list': ['2.6.32-431.el6.x86_64', '3.10.0-229.el7.x86_64', '3.10.0+10'],
                'kernel_version_name': '2.6.32-431.el6.x86_64'
            }
        }]
    },
    'success': 1
};

exports.clustName = {
    success: 1, //0/1,
    message: '',
    data: {
        clustName: '测试组1000号'
    }
};

exports.hostIp = {
    success: 1, //0/1,
    message: '',
    data: {
        ip: '192.168.1.110'
    }
};

exports.ntpServer = {
    success: 1, //0/1,
    message: '',
    data: {
        ntpServer: '测试NTP Server 1000'
    }
};
exports.progress = {
    success: 1, //0/1,
    message: '',
    data: {
        ipaddr: '127.0.0.1',
        progress: 48
    }
};