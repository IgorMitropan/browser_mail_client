'use strict';

import login from './login/login.component.js';
import commonPage from './commonPage/commonPage.component.js';

import AuthService from './services/AuthService.js';

const app = angular.module('mailApp', ['ui.router']);

app.run(function($transitions) {
    "ngInject";

    $transitions.onStart( { to: 'common' }, function(AuthService, $state) {
        "ngInject";

        // If the user is not authenticated
        if (!AuthService.checkAuth()) {
            alert('Wrong Login or password!');

            // Redirect to a state that we know doesn't require auth.
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

app.service('AuthService', AuthService);
