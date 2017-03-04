/**
 * Created by Xander on 3/2/2017.
 */

/*
    Core Angular Routing App

    Author: Xander Hacking
 */

angular.module('enigmaApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })
        .state('encoder', {
            url:'/encoder',
            templateUrl: './views/encoder.html',
            controller: 'encoderCtrl'
        })
        .state('decoder', {
            url:'/decoder',
            templateUrl:'./views/decoder.html',
            controller:'decoderCtrl'
        })
        .state('admin', {
            url:'/admin',
            templateUrl:'./views/admin.html',
            controller:'adminCtrl'
        });

}).run();