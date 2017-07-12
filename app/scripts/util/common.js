/**
 * Created by peishilong on 2015/4/1.
 */
'use strict';

//JS数组排序方法
function byParam(param, type) {
    return function(o, p) {
        var a, b;
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[param];
            b = p[param];
            if (type === 'str') {
                //如果是字母
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else if (type === 'num') {
                //如果是数字
                return parseInt(a, 10) - parseInt(b, 10);
            } else {
                throw ('error');
            }
        } else {
            throw ('error');
        }
    }
}

/**
 * 数组去重
 * @param  {[Array]} a
 * @return {[Array]}   新数组
 */
function arrayRidRepeat(a) {
    var res = a.filter(function(item, index, array) {
        return array.indexOf(item) === index;
    });
    return res;
};

/**
 * 根据指定 字符串 在 数组 中查找
 * @param  {[String]} item
 * @param  {[Array]} ary
 * @return {[Boolen]}
 */
function foundInArray(item, arrayList) {
    if (!item || !arrayList) {
        return false;
    }
    for (var i = 0; i < arrayList.length; i++) {
        if (item == arrayList[i]) {
            return true;
        }
    }
    return false;
}

/**
 * 删除数组中指定的元素
 */
function arrayRemove(arr, value) {
    var index = arr.indexOf(value);
    if (index >= 0) {
        arr.splice(index, 1);
    }
    return index;
}
//去掉字符串前后空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

// js Get object size
function getObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

/**
 * 查找字符是否在对象中
 */
function foundInObject(str, objs) {
    var sign = false;
    for (var k in objs) {
        if (k == str) {
            sign = true;
        }
    }
    return sign;
}



function getDivText($div) {
    return Trim($div.textContent !== undefined ? $div.textContent : $div.innerText);
}

function decimalOneDigit2Two(s) {
    return s < 10 ? '0' + s : s;
}

function getNetworkNameCN(networkName) {
    var networkNameCN = '';
    switch (networkName) {
        case "bussiness":
            networkNameCN = "iSCSI服务网络";
            break;
        case "public":
            networkNameCN = "存储服务网络";
            break;
        case "cluster":
            networkNameCN = "内部网络";
            break;
        case "om_bussiness":
            networkNameCN = "管理系统网络";
            break;
        case "om_public":
            networkNameCN = "管理系统内部网络";
            break;
        case "om_cluster":
            networkNameCN = "管理系统集群网络";
            break;
        default:
            networkNameCN = "未知网络" + networkName;
            break;
    };
    return networkNameCN;
};

function getEchartCapacityPieOption(usedSpaceRate, freeSpace, assignedSpaceRate, unitSize) {
    if (!unitSize) {
        unitSize = 1024;
    }
    var _itemstyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            zlevel: 10
        },
        emphasis: {
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            }
        }
    }
    var _label = {
        normal: {
            show: false
        }
    }
    var _labelline = {
        normal: {
            show: false
        }
    }
    var option = {
        tooltip: {
            show: false,
            showContent: false
        },
        calculable: false,
        series: [
            //draw free rate
            {
                name: '',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['85.5%', '89.5%'],
                itemStyle: _itemstyle,
                label: _label,
                labelLine: _labelline,
                data: [{
                    value: usedSpaceRate,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#d9dada',
                        }
                    }
                }, ]
            },
            //draw assigned
            {
                name: '',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['84%', '91%'],
                itemStyle: _itemstyle,
                label: _label,
                labelLine: _labelline,
                data: [{
                    value: assignedSpaceRate,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#BCBCBC',
                        }
                    }
                }, {
                    value: 100 - assignedSpaceRate,
                    name: '',
                    itemStyle: {
                        normal: {
                            opacity: 0,
                        }
                    }
                }]
            },
            //draw used
            {
                name: '',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['83%', '92%'],
                itemStyle: _itemstyle,
                label: _label,
                labelLine: _labelline,
                data: [{
                    value: usedSpaceRate,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#00a0e9',
                        }
                    }
                }, {
                    value: 100 - usedSpaceRate,
                    name: '',
                    itemStyle: {
                        normal: {
                            opacity: 0,
                        }
                    }
                }]
            },

        ]
    };

    return option;
}

function getNodeDiskPieOption(innerValue, outerValue, unitSize) {
    if (!unitSize) {
        unitSize = 1000;
    }
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params, ticket, callback) {
                var value = params.value;
                if (isNaN(value) || value < unitSize) {
                    return params.name + '<br/>已使用: ' + value + '<br/>占集群已使用容量百分比: ' + params.percent + '%';
                }
                var sizeUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var limit = value;
                var index = 0;
                while (limit >= unitSize) {
                    limit /= unitSize;
                    index += 1;
                }
                return params.name + '<br/>已使用: ' + limit.toFixed(1) + sizeUnit[index] + '<br/>占集群已使用容量百分比: ' + params.percent + '%';
            }
        },
        series: [{
            name: '节点',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '45%'],
            //avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false
                        //position: 'inside'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: innerValue
        }, {
            name: '磁盘',
            type: 'pie',
            radius: ['62%', '70%'],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: outerValue
        }]
    };
    return option;
}


function getEchartsLineOption(name, timeValue, name1, values1, name2, values2, unitSize) {
    if (!unitSize) {
        unitSize = 1000;
    }
    var ehartOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(53, 53, 53, 0.8)', // #353535 透明度 80%
            textStyle: {
                fontSize: '36px'
            }
        },
        grid: {
            x: 0,
            y: 30,
            x2: 0,
            y2: 24,
            borderWidth: 0,
            containLabel: false
        },
        legend: {
            data: [{
                name: name1
            }],
            x: 'right',
            y: 'top'
        },
        calculable: false,
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: {
                show: true,
                lineStyle: { //x轴线样式
                    color: '#d9dada',
                    width: 0
                }
            },
            axisTick: { //x坐标轴小标记
                show: true,
                onGap: false,
                lineStyle: {
                    color: '#d9dada',
                    width: 1
                }
            },
            axisLabel: { //坐标轴文本标签选项
                show: true,
                // interval: 10,     //坐标轴显示全部
                rotate: 0, //坐标轴顺时针45°显示
                textStyle: {
                    color: '#99a8b1',
                    fontSize: 10
                }
            },
            splitLine: {
                show: false
            },
            data: (function() {
                var newTime = [];
                var showDayHour = true;
                if ((timeValue[timeValue.length - 1] - timeValue[0]) <= 3600 * 24) {
                    showDayHour = false;
                }
                for (var i = 0; i < timeValue.length; i++) {
                    var nowTime = 1000 * timeValue[i];
                    var sTime = new Date(nowTime);
                    if (showDayHour) {
                        var sDay = sTime.getDate();
                        //var sMonth = sTime.getMonth();
                        var sMonth = ('0' + (sTime.getMonth() + 1)).slice(-2);
                        var sHour = sTime.getHours();
                        var sMinu = sTime.getMinutes();
                        nowTime = sMonth + '-' + sDay + ' ' + decimalOneDigit2Two(sHour) + ':' + decimalOneDigit2Two(sMinu);
                    } else {
                        var sHour = sTime.getHours();
                        var sMinu = sTime.getMinutes();
                        nowTime = decimalOneDigit2Two(sHour) + ':' + decimalOneDigit2Two(sMinu);
                    }
                    newTime.push(nowTime);
                }
                return newTime;
            })()
        }],
        yAxis: [{
            name: '',
            nameTextStyle: {
                color: '#8a8a8a',
                fontSize: '14px'
            },
            boundaryGap: [0, '10%'],
            type: 'value',
            splitNumber: 4,
            axisLine: {
                show: true,
                lineStyle: { //y轴线样式
                    color: '#d9dada',
                    width: 1
                }
            },
            axisLabel: {
                show: true,
                interval: 3, //坐标轴显示全部
                rotate: 0, //坐标轴顺时针45°显示
                textStyle: {
                    color: '#99a8b1',
                    fontSize: 10
                },
                formatter: function(value) {
                    if (isNaN(value) || value < unitSize) {
                        return value;
                    }
                    var sizeUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
                    var limit = value;
                    var index = 0;
                    while (limit >= unitSize) {
                        limit /= unitSize;
                        index += 1;
                    }
                    return limit.toFixed(1) + sizeUnit[index];
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(238,241,243, 0.5)' //'#eef1f3'
                }
            }
        }],
        series: [{
            name: name1,
            data: values1,
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: {}
                }
            }
        }]
    };

    if (name2 != null && values2 != null) {
        var series = {
            name: name2,
            data: values2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: {}
                }
            }
        };
        ehartOption.series.push(series);
        ehartOption.legend.data.push({
            name: name2
        })
    }

    return ehartOption;
}

function getNodeCyclePieOption(usedVal, freeVal) {
    var labelFromatter = {
        normal: {
            label: {
                formatter: function(params) {
                    return params.value + '%'
                },
                textStyle: {
                    baseline: 'top'
                }
            }
        },
    }
    var freeSpace = {
        normal: {
            color: '#7C7C7C',
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            }
        }
    };
    var usedSpace = {
        normal: {
            color: '#00a0e9',
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    color: '#353535'
                }
            },
            labelLine: {
                show: false
            }
        }
    };

    var option = {
        animationEasing: 'linear',
        toolbox: {
            show: false,
            feature: {
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: 'pie',
                    option: {
                        funnel: {
                            width: '20%',
                            height: '30%',
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function(params) {
                                            return 'other\n' + params.value + '%\n'
                                        },
                                        textStyle: {
                                            baseline: 'middle'
                                        }
                                    }
                                },
                            }
                        }
                    }
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['85%', '98%'],
            x: '0%',
            itemStyle: labelFromatter,
            data: [{
                name: 'usedSpace',
                value: usedVal,
                itemStyle: usedSpace
            }, {
                name: 'freeSpace',
                value: freeVal,
                itemStyle: freeSpace
            }]
        }]
    };
    return option;
}

function setEchartsOptionColor(options, rLineColor, wLineColor, rColor, wColor, pattern) {
    for (var i = 0; i < options.series.length; i++) {
        if (options.series[i].name == pattern) {
            options.series[i].itemStyle.normal = {
                color: rLineColor,
                areaStyle: {
                    normal: {
                        color: rColor,
                        opacity: 0.9
                    }
                }
            };
        } else {
            options.series[i].itemStyle.normal = {
                color: wLineColor,
                areaStyle: {
                    normal: {
                        color: wColor,
                        opacity: 0
                    }
                }
            };
        }
    }
    return options;
}

function mergeObj(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

function getTheme() {

    var theme = {
        // 默认色板
        color: [
            '#1790cf', '#1bb2d8', '#99d2dd', '#88b0bb',
            '#1c7099', '#038cc4', '#75abd0', '#afd6dd'
        ],

        // 图表标题
        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#1790cf'
            }
        },

        // 值域
        dataRange: {
            color: ['#1178ad', '#72bbd0']
        },

        // 工具箱
        toolbox: {
            color: ['#1790cf', '#1790cf', '#1790cf', '#1790cf']
        },

        // 提示框
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: { // 直线指示器样式设置
                    color: '#1790cf',
                    type: 'dashed'
                },
                crossStyle: {
                    color: '#1790cf'
                },
                shadowStyle: { // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },

        // 区域缩放控制器
        dataZoom: {
            dataBackgroundColor: '#eee', // 数据背景颜色
            fillerColor: 'rgba(144,197,237,0.2)', // 填充颜色
            handleColor: '#1790cf' // 手柄颜色
        },

        // 网格
        grid: {
            borderWidth: 0
        },

        // 类目轴
        categoryAxis: {
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: '#1790cf'
                }
            },
            splitLine: { // 分隔线
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },

        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: '#1790cf'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                }
            },
            splitLine: { // 分隔线
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#eee']
                }
            }
        },

        timeline: {
            lineStyle: {
                color: '#1790cf'
            },
            controlStyle: {
                normal: {
                    color: '#1790cf'
                },
                emphasis: {
                    color: '#1790cf'
                }
            }
        },

        // K线图默认参数
        k: {
            itemStyle: {
                normal: {
                    color: '#1bb2d8', // 阳线填充颜色
                    color0: '#99d2dd', // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#1c7099', // 阳线边框颜色
                        color0: '#88b0bb' // 阴线边框颜色
                    }
                }
            }
        },

        map: {
            itemStyle: {
                normal: {
                    areaStyle: {
                        color: '#ddd'
                    },
                    label: {
                        textStyle: {
                            color: '#c12e34'
                        }
                    }
                },
                emphasis: { // 也是选中样式
                    areaStyle: {
                        color: '#99d2dd'
                    },
                    label: {
                        textStyle: {
                            color: '#c12e34'
                        }
                    }
                }
            }
        },

        force: {
            itemStyle: {
                normal: {
                    linkStyle: {
                        color: '#1790cf'
                    }
                }
            }
        },

        chord: {
            padding: 4,
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: 'rgba(128, 128, 128, 0.5)',
                    chordStyle: {
                        lineStyle: {
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                },
                emphasis: {
                    borderWidth: 1,
                    borderColor: 'rgba(128, 128, 128, 0.5)',
                    chordStyle: {
                        lineStyle: {
                            color: 'rgba(128, 128, 128, 0.5)'
                        }
                    }
                }
            }
        },

        gauge: {
            axisLine: { // 坐标轴线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                        [0.2, '#1bb2d8'],
                        [0.8, '#1790cf'],
                        [1, '#1c7099']
                    ],
                    width: 8
                }
            },
            axisTick: { // 坐标轴小标记
                splitNumber: 10, // 每份split细分多少段
                length: 12, // 属性length控制线长
                lineStyle: { // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#99a8b1'
                }
            },
            splitLine: { // 分隔线
                length: 18, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                color: 'auto'
            },
            title: {
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            detail: {
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            }
        },

        textStyle: {
            fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
        }
    };

    return theme;
}
