'use strict';

//bytes转换自适应的单位
/*
 retStyle
 'value_unit' (default): return value and unit
 'value': return value only
 'unit': return unit only
 */
sdsomwebApp.filter('BytesToKMGTB', function () {
  return function (bytes) {
    if (isNaN(bytes)){
      return '';
    }
    if (!bytes) {
        return 0;
    }

    var retStyle = arguments[1] ? arguments[1] : 'value_unit';
    var limit = arguments[2] ? arguments[2] : 1;
    if (!limit || isNaN(limit)){
      limit = 1;
    }
    var sizeUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var quantity = bytes;
    var index = 0;
    while(quantity>=1024){
      quantity /= 1024;
      index += 1;
    }
    if (retStyle == 'value'){
      return quantity.toFixed(limit);
    } else if (retStyle == 'unit') {
      return sizeUnit[index];
    } else if (retStyle == 'index'){
        //增加一个功能，直接指定使用哪个作为单位，用法 capacity | BytesToKMGTB: 'index':3 
        quantity = bytes;
        for(var i=0;i<limit;i++){
            quantity /= 1024;
        }
        return quantity.toFixed(0) + sizeUnit[limit];
    } else {
      return quantity.toFixed(limit) + ' ' + sizeUnit[index];
    }
  };
});


sdsomwebApp.filter('mhz2Ghz', function () {
    return function (value) {
        var retValue = value / 1000;
        return retValue.toFixed(1);
    }
});


sdsomwebApp.filter('networksConfigFilter', function () {
    return function  (networks) {
        if (networks == null){
            return [];
        }
        var output = [];
        if (networks.bussiness.enable == 1 && networks.bussiness.using_independent_nics == 1) {
            output.push(networks.bussiness);
        }

        if (networks.public.enable == 1 && networks.public.using_independent_nics == 1) {
            output.push(networks.public);
        }

        if (networks.cluster.enable == 1 && networks.cluster.using_independent_nics == 1) {
            output.push(networks.cluster);
        }

        angular.forEach(output, function (item) {
            item.totalCount = output.length;
        });
        return output;
    }
});


/**
    * created by wuchanggui
    */
//告警状态
sdsomwebApp.filter('alarmSevState', function () {
    return function (value) {
        switch (value.toUpperCase()) {
            case 'WARNING':
                return '重要';
            case 'CRITICAL':
                return '紧急';
            case 'INFO':
                return '警告';
            default:
                return '';
        }
    };
});

//1是, 0否
sdsomwebApp.filter('isOrNot', function () {
    return function (value, confirmed) {
        if (confirmed == 1) {
            return '手工清除'
        };
        switch (value) {
            case 1:
                return '已修复';
            case 0:
                return '未修复';
            default:
                return '';
        }
    };
});

//将选中的数组提取name
sdsomwebApp.filter('selectedToStr', function () {
    return function (arr, type) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '没有找到网卡';
        }
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].network === type) {
                strArr.push(arr[i].name);
            } else if (!type && arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        var retStr = strArr.toString();
        if (retStr.length > 30) {
            return retStr.substr(0, 30) + '...';
        } else {
            return retStr;
        }
    };
});
sdsomwebApp.filter('selectedToStr2', function () {
    return function (arr, type) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '没有找到磁盘';
        }
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].purpose === type) {
                strArr.push(arr[i].name);
            } else if (!type && arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        var retStr = strArr.toString();
        if (retStr.length > 30) {
            return retStr.substr(0, 30) + '...';
        } else {
            return retStr;
        }
    };
});
sdsomwebApp.filter('selectedToStr3', function () {
    return function (arr) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '没有找到磁盘';
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        var retStr = strArr.toString();
        if (retStr.length > 30) {
            return retStr.substr(0, 30) + '...';
        } else {
            return retStr;
        }
    };
});

sdsomwebApp.filter('disksUseTypeFilter', function () {
    return function (arr) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '';
        }
        for (var i = 0; i < arr.length; i++) {
            var partitionCapacity = 0;
            if (arr[i].useCapacity == undefined || isNaN(arr[i].useCapacity)) {
                partitionCapacity = 0;
            } else {
                partitionCapacity = arr[i].useCapacity / 1073741824;
            }

            if (arr[i].selected == 1) {
                switch (arr[i].useType) {
                    case 'disk':
                        strArr.push('全盘');
                        break;
                    case 'partition':
                        strArr.push('分区 (' + partitionCapacity + ')GB');
                        break;
                    default:
                        strArr.push('');
                        break;
                }
            }
        }

        return strArr.toString();
    };
});

sdsomwebApp.filter('disksUseTypeChecked', function () {
    return function (arr) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '';
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].selected) {
                strArr.push(arr[i].useType == 'disk' ? 1 : 0);
            }
        }
        return strArr.toString();
    };
});

// 配置页面  磁盘数
sdsomwebApp.filter('selectedDisksNum', function () {
    return function (arr, type) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return 0;
        }
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].purpose === type) {
                strArr.push(arr[i].name);
            } else if (!type && arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        return strArr.length;
    };
});
sdsomwebApp.filter('selectedDisksNum2', function () {
    return function (arr) {
        var strArr = [];
        arr = arr || [];
        if (arr.length == 0) {
            return 0;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        return strArr.length;
    };
});

//字段过长显示省略号
sdsomwebApp.filter('lessWorld', function () {
    return function (value, len) {
        value = value || '';
        len = len || 3;
        if (value.length > len) {
            // 双字符长度转为单字符长度
            var str = value.substring(0, len);
            var strlen = str.replace(/[^\x00-\xff]/g,'01').length;
            return value.substring(0, len - (strlen - len) / 2) + '...';
        } else {
            return value;
        }
    };
});

//单位转换过滤
sdsomwebApp.filter('unit', function () {
    return function (value, unit) {
        if (isNaN(value)) return '';
        switch (unit) {
            case 'bToTb':
                return (value/1073741824).toFixed(1) + ' TB';
            case 'bToT':
                return (value/1073741824).toFixed(1);
            case 'iops':
                if (value < 1024) return value + ' (IO/s)';
                var vv = value/1024;
                if (vv < 1024) return vv.toFixed(1) + ' K(IO/s)';
                return (vv/1024).toFixed(1) + ' M(IO/s)';
            case 'mbps':
                if (value < 1024) return value + ' (Bytes/s)';
                var vv = value/1024;
                if (vv < 1024) return vv.toFixed(1) + ' (KB/s)';
                return (vv/1024).toFixed(1) + ' (MB/s)';
            case 'ms':
                return value + ' ms';
            case 'cpu':
                return (value < 0) ? 'NA' : value + '%';
            case 'mem':
                return value + '%';
            default: return value;
        }
    }
});

//bytes转换为GB或者TB
sdsomwebApp.filter('GBorTB', function () {
    return function (value) {
        if (!value || isNaN(value)) return '';
        var gbValue = value/1048576;
        if (gbValue < 1024) return gbValue.toFixed(1) + ' GB';
        else return (gbValue/1024).toFixed(1) + ' TB';
    }
});

//bytes转换为MB ????
sdsomwebApp.filter('MB', function () {
    return function (value) {
        if (!value || isNaN(value)) return '';
        var mbValue = value/1024;
        if (mbValue < 1024) return mbValue.toFixed(1) + ' MB';
        var gbValue = mbValue/1024;
        if (gbValue < 1024) return gbValue.toFixed(1) + ' GB';
        else return (gbValue/1024).toFixed(1) + ' TB';
    }
});


//bytes转换为GB或者TB
sdsomwebApp.filter('TB', function () {
    return function (value) {
        if (!value || isNaN(value)) return "";
        else return (value/1073741824).toFixed(1);
    }
});

//告警时间过滤器
sdsomwebApp.filter('showTime', ['$filter', function ($filter) {
    return function (value) {
        if (!value) return;
        var sec = (new Date().getTime() - Date.parse(value)) / 1000;
        if (sec < 10) return '刚刚';
        if (sec < 60) return sec.toFixed(0) + '秒前';
        var mul = sec / 60;
        if (mul < 60) return mul.toFixed(0) + '分钟前';
        var hou = mul / 60;
        if (hou < 24) return hou.toFixed(0) + '小时前';
        var day = hou / 24;
        if (day == 1) return '昨天 ' + $filter('date')(value, 'HH:mm:ss');
        if (day < 31) return day.toFixed(0) + '天前 ' + $filter('date')(value, 'HH:mm:ss');
        return $filter('date')(value, 'yyyy-MM-dd HH:mm:ss');
    }
}]);

//显示缩略字符串
sdsomwebApp.filter('limitChar', function () {
    return function (value, len) {
        if (value === null) {
            return ' - ';
        }
        //设置默认显示字符数
        if (len === null) {
            len = 15;
        }
        if (value.length <= len)
            return value;
        else
            return value.substr(0, len) + '...';
    };
});

//硬件资源节点缩略节点过滤器
sdsomwebApp.filter('subNodes', function () {
    return function (value, len) {
        if (!len) {
            len = 8;
        }
        if (value.length < 8) {
            return value;
        }
        return value.slice(0, len);
    };
});

//授权时间过期过滤器
sdsomwebApp.filter('licenseFormat', ['$sce',function ($sce) {
    return function (value,val) {
        //三个月

        if(val === ''){
            return $sce.trustAsHtml("<span style='color: #F67C05'>试用</span>");
        }
        else{
            return $sce.trustAsHtml("<span style='color: #4BD37E'>商用</span>");
        }
    };
}]);

//授权时间过期过滤器
sdsomwebApp.filter('licenseFormatTime', ['$sce',function ($sce) {
    return function (value,val) {
        //三个月
        var day = (value) / (60 * 60 * 24);

        if(day > 365){
            return $sce.trustAsHtml('<span style="color: #4BD37E">' + Math.floor(day / 365) + '年 ' + Math.floor(day%365) + '天' + '</span>');
        }else if(1 < day && day <= 365){
            return $sce.trustAsHtml('<span style="color: #F60510">' + Math.floor(day) + '天 ' + Math.floor(day%1*24) + '小时' + '</span>');
        }else if( 0 < day && day <= 1) {
            //minute
            var minute = day * 24 * 60;
            if(60 < minute){
                return $sce.trustAsHtml('<span style="color: #F60510">' + Math.floor(minute / 60) + '小时 ' + Math.floor(minute%60) + '分钟' + '</span>');
            }else{
                return $sce.trustAsHtml('<span style="color: #F60510">' + Math.floor(minute) + '分钟' + '</span>');
            }
        }else if(day === 0){
            return $sce.trustAsHtml('<span style="color: #F60510">已失效</span>');
        }else{
            return $sce.trustAsHtml('<span style="color: #F60510">异常</span>');
        }
    };
}]);
//字符串显示换行
sdsomwebApp.filter('to_trusted', ['$sce', function ($sce) {
　　return function (text) {
    　　return $sce.trustAsHtml(text);
　　};
}]);

//硬件节点状态
sdsomwebApp.filter('nodeStatusFilter', [function () {
    return function (status) {
        switch (status) {
            case 'normal':
                return '正常';
            case 'abnormal':
                return '异常';
            case 'maintain':
                return '维护';
            default:
                return '';
        }
    };
}]);

//硬盘过滤器
sdsomwebApp.filter('diskFilter', [function () {
    return function (val) {
        switch (val) {
            case 'data':
                return '数据盘';
            case 'read_cache':
                return '读缓存盘';
            case 'write_cache':
                return '写缓存盘';
            case 'read_write_cache':
                return '缓存盘';
            default:
                return '';
        }
    };
}]);

//硬盘慢盘过滤器
sdsomwebApp.filter('diskSlowDiskFilter', [function () {
    return function (val) {
        switch (val) {
            case 'normal':
                return '正常';
            case 'warning':
                return '亚健康';
            case 'critical':
                return '慢盘';
            default:
                return '';
        }
    };
}]);

//硬盘Smart健康状态过滤器
sdsomwebApp.filter('diskSmartHealthyFilter', [function () {
    return function (val) {
        switch (val) {
            case 'normal':
                return '正常';
            case 'warning':
                return '亚健康';
            case 'critical':
                return '健康度严重下降';
            default:
                return '';
        }
    };
}]);

//网卡过滤器
sdsomwebApp.filter('networkTypeNameFilter', [function () {
    return function (networkName, networks_config, totalCount) {
        if (totalCount <= 1){
            if (networks_config.bussiness.enable == 1){
                return 'iSCSI服务网络/内部网络';
            } else {
                return '存储服务网络/内部网络';
            }
        }
        switch (networkName) {
            case 'bussiness':
                return 'iSCSI服务网络';
            case 'public':
                return '存储服务网络';
            case 'cluster':
                return '内部网络';
            default:
                return '';
        }
    };
}]);

//网卡状态过滤器
sdsomwebApp.filter('nicStatus', [function () {
    return function (val, nodeStatus) {
        if (nodeStatus == 'down') {
            return 'NA';
        };
        switch (val) {
            case 'ok':
                return '已连接';
            case 'down':
                return '未连接';
            default:
                return 'NA';
        }
    };
}]);


// 网卡绑定中的 margin-left、width 样式设置
sdsomwebApp.filter('bondMarginLeft', [function () {
    return function (bond, nics) {
        var resolution = document.body.clientWidth;
        var nicsCount = 0;
        for (var i = 0; i < nics.length; i++) {
            if (bond.type == nics[i].type) {
                nicsCount += 1;
            };
        };
        if (resolution <= 1440) {
            switch (nicsCount) {
                case 2:
                    return 16;
                case 3:
                    return 26;
                case 4:
                    return 40;
                default:
                    return 0;
            };
        } else {
            switch (nicsCount) {
                case 2:
                    return 22;
                case 3:
                    return 39;
                case 4:
                    return 60;
                default:
                    return 0;
            };
        };
    };
}]);


// 网卡绑定中的 margin-left、width 样式设置
sdsomwebApp.filter('nicStyle', [function () {
    return function (nics, itype, istyle) {
        var resolution = document.body.clientWidth,
            bussinessIndex = 0,
            clusterIndex = 0;

        for (var i = 0; i < nics.length; i++) {
            if (nics[i].type == 'bussiness' || nics[i].type == 'public') {
                bussinessIndex += 1;
            }
            if (nics[i].type == 'cluster') {
                clusterIndex += 1;
            }
        }

        if (istyle == "margin" && (itype == 'bussiness' || itype == 'public')) {
            if (resolution <= 1440) {
                switch (bussinessIndex) {
                    case 2:
                        return 16;
                    case 3:
                        return 26;
                    case 4:
                        return 40;
                    default:
                        return 0;
                }
            } else {
                switch (bussinessIndex) {
                    case 2:
                        return 22;
                    case 3:
                        return 39;
                    case 4:
                        return 60;
                    default:
                        return 0;
                }
            }
        }
        if (istyle == "margin" && itype == 'cluster') {
            if (resolution <= 1440) {
                switch (clusterIndex) {
                    case 2:
                        return 16;
                    case 3:
                        return 26;
                    case 4:
                        return 40;
                    default:
                        return 0;
                }
            } else {
                switch (clusterIndex) {
                    case 2:
                        return 22;
                    case 3:
                        return 39;
                    case 4:
                        return 60;
                    default:
                        return 0;
                }
            }
        }

        if (istyle == "width" && (itype == 'bussiness' || itype == 'public')) {
            if (resolution <= 1440) {
                switch (bussinessIndex) {
                    case 2:
                        return 25;
                    case 3:
                        return 49;
                    case 4:
                        return 72;
                    default:
                        return 0;
                }
            } else {
                switch (bussinessIndex) {
                    case 2:
                        return 36;
                    case 3:
                        return 72;
                    case 4:
                        return 109;
                    default:
                        return 0;
                }
            }
        }
        if (istyle == "width" && itype == 'cluster') {
            if (resolution <= 1440) {
                switch (clusterIndex) {
                    case 2:
                        return 25;
                    case 3:
                        return 49;
                    case 4:
                        return 72;
                    default:
                        return 0;
                }
            } else {
                switch (clusterIndex) {
                    case 2:
                        return 36;
                    case 3:
                        return 72;
                    case 4:
                        return 109;
                    default:
                        return 0;
                }
            }
        }
    };
}]);

// 网卡绑定的图标及样式是否隐藏
sdsomwebApp.filter('nicSolidLineHide', [function () {
    return function (nics, itype) {
        var bussinessCount = 0;
        var clusterCount = 0;
        var bussinessClusterCount = 0;

        for (var i = 0; i < nics.length; i++) {
            if (nics[i].type == 'bussiness') {
                bussinessCount += 1;
            }
            if (nics[i].type == 'cluster') {
                clusterCount += 1;
            }
            if (nics[i].type == 'public') {
                bussinessClusterCount += 1;
            }
        }

        if (bussinessCount == 1 && itype == 'bussiness') {
            return true;
        }
        if (clusterCount == 1 && itype == 'cluster') {
            return true;
        }
        if (bussinessClusterCount == 1 && itype == 'public') {
            return true;
        }
    };
}]);


// 将小数化成百分比格式
sdsomwebApp.filter('showNodeShrinkFilter', [function () {
    return function (nodeCount) {
        var resolution = document.body.clientWidth;
        if (resolution <= 1440) {
            if (nodeCount <= 4) {
                return false;
            } else {
                return true;
            }
        } else {
            if (nodeCount <= 6) {
                return false;
            } else {
                return true;
            }
        }
    };
}]);

// 将小数化成百分比格式
sdsomwebApp.filter('capacityFilter', [function () {
    return function (capacity) {
        if (capacity != null) {
            return parseInt(capacity) + '%';
        } else {
            return 'NA';
        }
    };
}]);

/**
 * 空值过滤器
 */
sdsomwebApp.filter('naFilter', [function() {
    return function(val) {
        if (val === '' || val === null || val === undefined) {
            return 'NA';
        } else {
            return val;
        }
    };
}]);

/**
 * 空值过滤器
 */
sdsomwebApp.filter('nullFilter', [function() {
    return function(val) {
        if (val === '' || val === null || val === undefined) {
            return 'NA';
        } else {
            return val;
        }
    };
}]);

/**
 * 配置页面 磁盘使用类型过滤器
 */
sdsomwebApp.filter('disksUseType', ['$filter', function($filter) {
    return function (arr, type) {
        var strArr = [], useCapacity = [];
        arr = arr || [];
        if (arr.length == 0) {
            return '';
        }
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].purpose === type) {
                strArr.push(arr[i].useType);

                if (arr[i].useType == 'partition') {
                    var useCapacityNum = $filter('GBorTB')(arr[i].useCapacity / 1024);
                    useCapacity.push(useCapacityNum);
                }
            }
        }
        var retStr = strArr.toString(), useCapacityStr = useCapacity.toString();

        if (retStr == 'disk') {
            return '整块盘';
        }

        if (retStr == 'partition') {
            return '分区(' + useCapacity + ')';
        }
    };
}]);

sdsomwebApp.filter('physicalPoolsReplicated', [function() {
    return function (arr) {
        switch (arr.length) {
            case 1:
                return arr[0].toString();
            case 2:
                return arr[0].toString() + '+' + arr[1].toString();
            default:
                return '';
        }
    };
}]);
