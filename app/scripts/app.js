'use strict';

/**
 * @ngdoc overview
 * @name sdsomwebApp
 * @description
 * # sdsomwebApp
 *
 * Main module of the application.
 */
var sdsomwebApp = angular
    .module('sdsomwebApp', [
        'ngAnimate',
        'ngCookies',
        'ui.router',
        'restangular'
    ]);

sdsomwebApp.config(function (RestangularProvider) {
    RestangularProvider.setResponseExtractor(function (response, operation) {
        if (!response.success && response.message === 'PERMISSION DENIED') {
            window.location = '/sdsomweb/#/login';
        } else {
            return response;
        }
    });
});
