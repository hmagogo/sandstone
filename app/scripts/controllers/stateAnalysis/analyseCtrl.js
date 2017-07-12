'use strict';

/**
 * @ngdoc function
 * @name sdsomwebApp.controller:analyseCtrl
 * @description
 * # MainCtrl
 * Controller of the sdsomwebApp
 */
sdsomwebApp.controller('analyseCtrl', ['$scope', '$state', 'Restangular', 'mainFactory','nodeFactory',
  function ($scope, $state, Restangular, mainFactory, nodeFactory) {

      $scope.charts = {};

      $scope.init = function () {
          $scope.gMainStateRouteView.current = 'main.stateAnalysis';
          $scope.freshContentDivStyle();
          $scope.freshCharts();
          $scope.getResourceItem();
          $scope.modalSelected = {
              type: 'node',
              node: {
                  object: null,
                  device: {
                      type: '',
                      object: null,
                      perfType: ''
                  }
              },
              storage: {
                  poolObject: '',
                  perfType: ''
              },
              cluster: {
                  perfType: ''
              }
          };

          //初始化信息提示
          var selectors = ['#analyseItmAddingMode select']
          for (var i = 0; i < selectors.length ; i++) {
              $(selectors[i]).each(function () {
                  var _this = $(this);
                  _this.popover({
                      trigger: 'manual',
                      placement: 'top',
                      html: true,
                      content: function () {
                          if (_this.data('tipMsg')) {
                              return '<div style="color:#000;">' + _this.data('tipMsg') + '</div>';
                          }
                          return '';
                      }
                  });
              });
          }
      };

      $scope.freshContentDivStyle = function () {
          var dom = document.getElementById('contentDivId');
          var referenceHeight = dom.parentNode.offsetHeight;
          var height = referenceHeight - 70;
          $scope.contentDivStyle = {
              'height': height + 'px'
          };
      };

      $scope.removeItem = function (chartid) {
          for (var i = 0; i < $scope.gAnalysis.items.length; i++) {
              if ($scope.gAnalysis.items[i].id == chartid){
                  $scope.gAnalysis.items.splice(i, 1);
              }
          }
          if ($scope.charts[chartid]) {
              delete $scope.charts[chartid];
          }
      };

      $scope.addItem = function (tipsModel, item) {
          var existed = false;
          for (var i = 0; i < $scope.gAnalysis.items.length; i++) {
              if ($scope.gAnalysis.items[i].id == item.id){
                  existed = true;
              }
          }
          if (!existed) {
              $scope.gAnalysis.items.push(item);
          } else {
              $scope.showTipMsg('已存在', tipsModel);
          }
      };

      $scope.addingItem = function () {
          // 添加
          if ($scope.modalSelected.type == 'node'){
              if (!$scope.modalSelected.node.object){
                  $scope.showTipMsg('请选择节点', 'modalSelected.node.object');
                  return;
              }
              // 磁盘性能
              if ($scope.modalSelected.node.device.type == 'disk'){
                  // 检查
                  if (!$scope.modalSelected.node.device.object){
                      $scope.showTipMsg('请选择磁盘', 'modalSelected.node.device.object');
                      return;
                  }
                  if ($scope.modalSelected.node.device.perfType != 'IOPS' &&
                      $scope.modalSelected.node.device.perfType != 'MBPS'){
                      $scope.showTipMsg('请选择性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  var diskItem = $scope._makeDiskItem();
                  if (!diskItem) {
                      $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  $scope.addItem('modalSelected.node.device.perfType', diskItem);
              // 网卡性能
              } else if ($scope.modalSelected.node.device.type == 'nic'){
                  if (!$scope.modalSelected.node.device.object){
                      $scope.showTipMsg('请选择网卡', 'modalSelected.node.device.object');
                      return;
                  }
                  if ($scope.modalSelected.node.device.perfType != 'RxTx_byte' &&
                      $scope.modalSelected.node.device.perfType != 'RxTx_package'){
                      $scope.showTipMsg('请选择性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  var networkItem = $scope._makeNetworkItem();
                  if (!networkItem) {
                      $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  $scope.addItem('modalSelected.node.device.perfType', networkItem);
              // CPU性能
              } else if ($scope.modalSelected.node.device.type == 'cpu'){
                  var itemList = ['idle', 'system', 'user', 'iowait', 'irq', 'softirq', 'nice'];
                  if (!foundInArray($scope.modalSelected.node.device.perfType, itemList)){
                      $scope.showTipMsg('请选择性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  var cpuItem = $scope._makeCpuItem();
                  if (!cpuItem) {
                      $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  $scope.addItem('modalSelected.node.device.perfType', cpuItem);
              // 内存性能
              } else if ($scope.modalSelected.node.device.type == 'memory'){
                  var itemList = ['Buffers', 'Cached', 'MemFree', 'SwapCached', 'SwapFree'];
                  if (!foundInArray($scope.modalSelected.node.device.perfType, itemList)){
                      $scope.showTipMsg('请选择性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  var memoryItem = $scope._makeMemoryItem();
                  if (!memoryItem) {
                      $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                      return;
                  }
                  $scope.addItem('modalSelected.node.device.perfType', memoryItem);
              // 没有选择设备类型
              } else {
                  $scope.showTipMsg('请选择设备类型', 'modalSelected.node.device.type');
                  return;
              }
          // 存储池
          } else if ($scope.modalSelected.type == 'storage'){
              // 检查
              if (!$scope.modalSelected.storage.poolObject){
                  $scope.showTipMsg('请选择存储池', 'modalSelected.storage.poolObject');
                  return;
              }
              if ($scope.modalSelected.storage.perfType != 'IOPS' &&
                  $scope.modalSelected.storage.perfType != 'MBPS' &&
                  $scope.modalSelected.storage.perfType != 'LATENCY'){
                  $scope.showTipMsg('请选择性能类型', 'modalSelected.storage.perfType');
                  return;
              }
              var poolItem = $scope._makeClusterPoolItem();
              if (!poolItem) {
                  $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                  return;
              }
              $scope.addItem('modalSelected.storage.perfType', poolItem);
          // 集群
          } else if ($scope.modalSelected.type == 'cluster'){
              // 检查
              if ($scope.modalSelected.cluster.perfType != 'IOPS' &&
                  $scope.modalSelected.cluster.perfType != 'MBPS' &&
                  $scope.modalSelected.cluster.perfType != 'LATENCY'&&
                  $scope.modalSelected.cluster.perfType != 'CAPACITY'){
                  $scope.showTipMsg('请选择性能类型', 'modalSelected.cluster.perfType');
                  return;
              }
              var clusterItem = $scope._makeClusterItem();
              if (!clusterItem) {
                  $scope.showTipMsg('无此类型数据，请选择其它性能类型', 'modalSelected.node.device.perfType');
                  return;
              }
              $scope.addItem('modalSelected.cluster.perfType', clusterItem);
          // 没有选择要添加的类型
          } else {
              $scope.showTipMsg('请选择要添加的类型', 'modalSelected.type');
              return;
          }
      };

      // 磁盘item
      $scope._makeDiskItem = function(){
          var itemName = $scope.modalSelected.node.object.hostid +
              ':' + $scope.modalSelected.node.device.object.device_name +
              ' ' + $scope.modalSelected.node.device.perfType;
          var itemId = 'servers__' + $scope.modalSelected.node.object.hostid +
              '__disk__' + $scope.modalSelected.node.device.object.device_name +
              '__' + $scope.modalSelected.node.device.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1000;
          var targetPrefix = 'servers.' + $scope.modalSelected.node.object.hostid +
              '.iostat.' + $scope.modalSelected.node.device.object.device_name;
          if($scope.modalSelected.node.device.perfType == 'IOPS') {
              itemTargets.push(targetPrefix + '.reads_per_second');
              itemTargets.push(targetPrefix + '.writes_per_second');
              itemChartNames.push('read');
              itemChartNames.push('write');
          } else if($scope.modalSelected.node.device.perfType == 'MBPS') {
              itemTargets.push(targetPrefix + '.read_byte_per_second');
              itemTargets.push(targetPrefix + '.write_byte_per_second');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(B/s)';
              itemUnitSize = 1024;
          } else {
              return null;
          }
          var diskItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return diskItem;
      };

      // 网络item
      $scope._makeNetworkItem = function(){
          var itemName = $scope.modalSelected.node.object.hostid +
                  ':' + $scope.modalSelected.node.device.object.name +
                  ' ' + $scope.modalSelected.node.device.perfType;
          var itemId = 'servers__' + $scope.modalSelected.node.object.hostid +
              '__nic__' + $scope.modalSelected.node.device.object.name +
              '__' + $scope.modalSelected.node.device.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1000;
          var targetPrefix = 'servers.' + $scope.modalSelected.node.object.hostid +
              '.network.' + $scope.modalSelected.node.device.object.name;
          if($scope.modalSelected.node.device.perfType == 'RxTx_package') {
              itemTargets.push(targetPrefix + '.rx_packets');
              itemTargets.push(targetPrefix + '.tx_packets');
              itemChartNames.push('rx');
              itemChartNames.push('tx');
          } else if($scope.modalSelected.node.device.perfType == 'RxTx_byte') {
              itemTargets.push(targetPrefix + '.rx_byte');
              itemTargets.push(targetPrefix + '.tx_byte');
              itemChartNames.push('rx');
              itemChartNames.push('tx');
              itemName += '(B/s)';
              itemUnitSize = 1024;
          } else {
              return null;
          }
          var networkItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return networkItem;
      };

      // CPU item
      $scope._makeCpuItem = function(){
          var itemName = $scope.modalSelected.node.object.hostid +
              ':CPU ' + $scope.modalSelected.node.device.perfType + "(百分比)";
          var itemId = 'servers__' + $scope.modalSelected.node.object.hostid +
              '__CPU__' + $scope.modalSelected.node.device.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1000;
          var target = 'servers.' + $scope.modalSelected.node.object.hostid +
              '.cpu.total.' + $scope.modalSelected.node.device.perfType + '_percentage';
          itemTargets.push(target);
          itemChartNames.push($scope.modalSelected.node.device.perfType);
          var cpuItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return cpuItem;
      };

      // Memory item
      $scope._makeMemoryItem = function(){
          var itemName = $scope.modalSelected.node.object.hostid +
              ':内存 ' + $scope.modalSelected.node.device.perfType + "(Byte)";
          var itemId = 'servers__' + $scope.modalSelected.node.object.hostid +
              '__memory__' + $scope.modalSelected.node.device.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1024;
          var targetPrefix = 'servers.' + $scope.modalSelected.node.object.hostid + '.memory.';
          var memList = ['Buffers', 'Cached', 'MemFree'];
          var swapList = ['SwapCached', 'SwapFree'];
          if (foundInArray($scope.modalSelected.node.device.perfType, memList)){
              itemTargets.push(targetPrefix + 'MemTotal');
              itemChartNames.push('MemTotal');
          } else if (foundInArray($scope.modalSelected.node.device.perfType, swapList)){
              itemTargets.push(targetPrefix + 'SwapTotal');
              itemChartNames.push('SwapTotal');
          } else {
              return null;
          }

          itemTargets.push(targetPrefix + $scope.modalSelected.node.device.perfType);
          itemChartNames.push($scope.modalSelected.node.device.perfType);
          var memoryItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return memoryItem;
      };

      // Pool item
      $scope._makeClusterPoolItem = function(){
          var itemName = '存储池' +
              ':' + $scope.modalSelected.storage.poolObject.poolName +
              ' ' + $scope.modalSelected.storage.perfType;
          var itemId = 'cluster__pool__' + $scope.modalSelected.storage.poolObject.poolId +
              '__' + $scope.modalSelected.storage.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1000;
          var targetPrefix = 'sds.cluster.*.pool.' + $scope.modalSelected.storage.poolObject.poolId;
          if($scope.modalSelected.storage.perfType == 'IOPS') {
              itemTargets.push(targetPrefix + '.sds_read');
              itemTargets.push(targetPrefix + '.sds_write');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(Byte)';
              itemUnitSize = 1024;
          } else if($scope.modalSelected.storage.perfType == 'MBPS') {
              itemTargets.push(targetPrefix + '.sds_read_b');
              itemTargets.push(targetPrefix + '.sds_write_b');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(B/s)';
              itemUnitSize = 1024;
          } else if($scope.modalSelected.storage.perfType == 'LATENCY') {
              itemTargets.push(targetPrefix + '.sds_read_latency');
              itemTargets.push(targetPrefix + '.sds_write_latency');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(ms)';
          } else {
              return null;
          }
          var poolItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return poolItem;
      };

      // Cluster item
      $scope._makeClusterItem = function(){
          var itemName = '系统' + $scope.modalSelected.cluster.perfType;
          var itemId = 'cluster__pool__all__' + $scope.modalSelected.cluster.perfType;
          var itemTargets = [];
          var itemChartNames = [];
          var itemUnitSize = 1000;
          var targetPrefix = 'sds.cluster.*.pool.all.';
          if($scope.modalSelected.cluster.perfType == 'IOPS') {
              itemTargets.push(targetPrefix + 'sds_read');
              itemTargets.push(targetPrefix + 'sds_write');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(Byte)';
              itemUnitSize = 1024;
          } else if($scope.modalSelected.cluster.perfType == 'MBPS') {
              itemTargets.push(targetPrefix + 'sds_read_b');
              itemTargets.push(targetPrefix + 'sds_write_b');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName += '(B/s)';
              itemUnitSize = 1024;
          } else if($scope.modalSelected.cluster.perfType == 'LATENCY') {
              itemTargets.push(targetPrefix + 'sds_read_latency');
              itemTargets.push(targetPrefix + 'sds_write_latency');
              itemChartNames.push('read');
              itemChartNames.push('write');
              itemName = '系统时延(ms)';
          } else if($scope.modalSelected.cluster.perfType == 'CAPACITY') {
              targetPrefix = 'sds.cluster.*.capacity.';
              itemTargets.push(targetPrefix + 'total_space');
              itemTargets.push(targetPrefix + 'total_used');
              itemChartNames.push('total');
              itemChartNames.push('used');
              itemName = '系统容量(Byte)';
              itemUnitSize = 1024;
          } else {
              return null;
          }
          var clusterItem = {
              name: itemName,
              id: itemId,
              targets: itemTargets,
              chartNames: itemChartNames,
              unitSize: itemUnitSize,
              show: true
          };
          return clusterItem;
      };

      // 获取存储池和节点数据
      $scope.getResourceItem = function () {
          // 节点信息
          if (!$scope.hardwareSummary){
              nodeFactory.getSysHard(function (res) {
                  if (1===res.success) {
                      $scope.hardwareSummary = res.data;
                  }
              });
          }
          // 存储池
          if (!$scope.poolSummary){
              mainFactory.queryResourcePool({pagesize: 100, pageno: 1}, function (res) {
                  if(1===res.success) {
                      $scope.poolSummary = res.data;
                  }
              });
          }
      };

      // 重新获取并重画性能曲线
      $scope.freshCharts = function () {
          for (var i = 0; i < $scope.gAnalysis.items.length; i++) {
              mainFactory.getSeriesData({'from': $scope.gAnalysis.time, 'targets': $scope.gAnalysis.items[i].targets}, function (datas) {
                  if (1 === datas.success) {
                      var times = [];
                      var values = [];
                      var values2 = [];
                      var pointDatas = datas.data.datapoints;
                      var hasTwoValue = false;
                      if (pointDatas[0].length >= 3) {
                          hasTwoValue = true;
                      }
                      for (var i = 0; i < pointDatas.length; i++) {
                          times.push(pointDatas[i][0]);
                          if (null === pointDatas[i][1]) {
                            if (i > 0 && null != pointDatas[i - 1][1] && undefined != pointDatas[i - 1][1]) {
                                values.push(pointDatas[i - 1][1].toFixed(2));
                            } else {
                                values.push(0);
                            }
                          } else {
                              values.push(pointDatas[i][1].toFixed(2));
                          }

                          if (!hasTwoValue) {
                              continue
                          }

                          if (null === pointDatas[i][2]) {
                            if (i > 0 && null != pointDatas[i - 1][2] && undefined != pointDatas[i - 1][2]) {
                                values2.push(pointDatas[i - 1][2].toFixed(2));
                            } else {
                                values2.push(0);
                            }
                          } else {
                              values2.push(pointDatas[i][2].toFixed(2));
                          }
                      }
                      var showItem = $scope._getShowItem(datas.data.targets);
                      if (showItem){
                          if (hasTwoValue) {
                              $scope.setChart(showItem.id, showItem.name, times,
                                  showItem.chartNames[0], values, showItem.chartNames[1], values2, showItem.unitSize);
                          } else {
                              $scope.setChart(showItem.id, showItem.name, times,
                                  showItem.chartNames[0], values, null, null, showItem.unitSize);
                          }
                      }
                  }
              });
          }
      };

      $scope._getShowItem = function(itemTargets) {
          var showItem = null;
          for (var i = 0; i < $scope.gAnalysis.items.length; i++) {
              var item = $scope.gAnalysis.items[i];
              var found = true;
              for (var j = 0; j < item.targets.length; j++) {
                  if (!foundInArray(item.targets[j], itemTargets)) {
                      found = false;
                  }
              }
              if (found){
                  showItem = item;
              }
          }
          return showItem;
      };

      $scope.setChart = function(chartId, chartName, times, name1, values1, name2, values2, unitSize){
          var chartOption = getEchartsLineOption(chartName, times, name1, values1, name2, values2, unitSize);
          var theme = getTheme();
          var chart = echarts.init(document.getElementById(chartId), theme);

          chart.setOption(chartOption);
          $scope.charts[chartId] = chart;
      };

      $scope.showAnalyseItemAddingMode = function () {
          $('#analyseItmAddingMode').modal('show');
      };

      $scope.changeAnalysisTime = function (time) {
          $scope.gAnalysis.time = time;
          $scope.freshCharts();
      };

      //页面刷新
      $scope.$on('onMainWindowsResize', function() {
          $scope.freshContentDivStyle();
          for (var chartid in $scope.charts) {
              $scope.charts[chartid].resize();
          }
      });

  }]);
