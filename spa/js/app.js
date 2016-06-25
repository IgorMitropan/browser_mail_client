'use strict';

import login from './login/login.component.js';
import commonPage from './commonPage/commonPage.component.js';
import dropDown from './dropDown/dropDown.component.js';

import AuthService from './services/AuthService.js';

const app = angular.module('mailApp', ['ui.router', 'ui.bootstrap']);

app.run(function($transitions) {
    "ngInject";

    $transitions.onStart( { to: 'common' }, function(AuthService, $state) {
        "ngInject";

        if (!AuthService.checkAuth) {
            alert('Wrong Login or password!');

            return $state.target("login");
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
    "ngInject";

    $urlRouterProvider.otherwise('login');
    $urlRouterProvider.when('', '/login/');

    $stateProvider
        .state('login', {
            url: '/login/',
            template: '<login></login>'
        })
        .state('common', {
            url: '/common/',
            template: '<common-page></common-page>'
        })
});

app.component('login', login);
app.component('commonPage', commonPage);
app.component('dropDown', dropDown);


app.service('AuthService', AuthService);
