/**
 * Created by HMX on 2016/07/20.
 * 存放公用的 Controller 方法
 */
'use strict';

function baseModal($rootScope, $scope) {
	/************** 确认 与 取消 **************/
	$rootScope.showConfirm = function (skip) {
		$scope.confirmVal = skip;
		$('#confirmModal').modal('show');
	};
	$rootScope.confirmFun = function () {
		$('#confirmModal').modal('hide');
		$scope[$scope.confirmVal]();
	};

	/************** 扩容确认 **************/
	$rootScope.showNodeExtendConfirm = function (skip) {
		$scope.confirmExtendVal = skip;
		$('#confirmNodeExtendModal').modal('show');
	};
	$rootScope.confirmNodeExtendFun = function () {
		$('#confirmNodeExtendModal').modal('hide');
		$scope[$scope.confirmExtendVal]();
	};

    $rootScope.isConfigNetworkNics = function(networks_config, networkName) {
        if (networks_config == undefined || !networks_config) {
            return true;
        }
        var config_nics = false;
        angular.forEach(networks_config, function (network_config) {
            if (network_config.name == networkName){
                if (network_config.enable == 1 && network_config.using_independent_nics == 1) {
                    config_nics = true;
                };
            };
        });
        return config_nics;
    };

    $rootScope.isConfigNetworkIpaddr = function (networks_config, networkName) {
        if (networks_config == undefined || !networks_config) {
            return true;
        }
        var config_ipaddr = false;
        angular.forEach(networks_config, function (network_config) {
            if (network_config.name == networkName){
                if (network_config.enable == 1) {
                    config_ipaddr = true;
                };
            };
        });
        return config_ipaddr;
    };

    $rootScope.isConfigNetworkGateway = function (networks_config, networkName) {
        if (networks_config == undefined || !networks_config) {
            return true;
        };
        switch (networkName) {
            case 'bussiness':
                if (networks_config.bussiness.enable == 1 &&
                    networks_config.om_bussiness.enable == 1 &&
                    networks_config.om_bussiness.using_independent_nics != 1 &&
                    networks_config.om_bussiness.share_nics_from == 'bussiness') {
                    return true;
                }
                return false;
            case 'om_bussiness':
                if (networks_config.om_bussiness.enable == 1 &&
                    networks_config.om_bussiness.using_independent_nics == 1) {
                    return true;
                }
                return false;
            case 'public':
                if (networks_config.public.enable == 1 &&
                    networks_config.om_bussiness.enable == 1 &&
                    networks_config.om_bussiness.using_independent_nics != 1 &&
                    networks_config.om_bussiness.share_nics_from == 'public') {
                    return true;
                }
                return false;
            case 'om_public':
                return false;
            case 'cluster':
            case 'om_cluster':
                return false;
            default:
                return false;
        };
    };



};
