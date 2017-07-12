/**
 * Created by peishilong on 2014/6/3.
 */

sdsomwebApp.config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('config', {
                url: '/config',
                templateUrl: 'views/configure.html',
                controller: 'configController'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('main.container', {
                url: '/dashboard',
                views: {
                    'container_view': {
                        templateUrl: 'views/container.html'
                    }
                }
            })
            .state('main.container.container_view', {
                url: '/view',
                views: {
                    'left_view': {
                        templateUrl: 'views/main/left.html',
                        controller: 'mainLeftCtrl'
                    },
                    'right_view': {
                        templateUrl: 'views/main/right.html',
                        controller: 'mainRightCtrl'
                    }
                }
            })
            .state('main.storage_view', {
                url: '/storage',
                views: {
                    'container_view': {
                        templateUrl: 'views/storageManage/body.html',
                        controller: 'storageResourceCtrl',
                        controllerAs: 'storage'
                    }
                }
            })
            .state('main.block_view', {
                url: '/block',
                views: {
                    'container_view': {
                        templateUrl: 'views/blockStorage/body.html',
                        controller: 'blockStorageCtrl',
                        controllerAs: 'block'
                    }
                }
            })
            .state('main.container.hardware_view', {
                url: '/hardware',
                views: {
                    'left_view': {
                        templateUrl: 'views/hardwareManage/left.html',
                        controller: 'hardwareLeft'
                    },
                    'right_view': {
                        templateUrl: 'views/hardwareManage/body.html',
                        controller: 'nodeViewManager'
                    }
                }
            })
            .state('main.stateAnalysis', {
                url: '/stateAnalysis',
                views: {
                    'container_view': {
                        templateUrl: 'views/stateAnalysis/stateAnalysis.html',
                        controller: 'analyseCtrl'
                    }
                }
            })
            .state('main.alarmManage', {
                url: '/alarmManage',
                views: {
                    'container_view': {
                        templateUrl: 'views/alarmManage/body.html',
                        controller: 'alarmManagerCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');
    });
