'use strict';

import login from './login/login.component.js';
import commonPage from './commonPage/commonPage.component.js';
import mailBoxes from './mailBoxes/mailBoxes.component.js';
import inboxMail from './inboxMail/inboxMail.component.js';
import dropDown from './dropDown/dropDown.component.js';
import error404 from './error404/error404.component.js';

import AuthService from './services/AuthService.js';

const app = angular.module('mailApp', ['ui.router', 'ui.bootstrap']);

app.run(function($transitions) {
    "ngInject";

    $transitions.onStart( { to: 'inbox' }, function(AuthService, $state) {
        "ngInject";

        if (!AuthService.checkAuth) {
            return $state.target("login");
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
    "ngInject";

    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.when('/common', '/common/mail/inbox');
    $urlRouterProvider.when('/common/mail', '/common/mail/inbox');
    $urlRouterProvider.otherwise('404');

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('common', {
            url: '/common',
            abstract: true,
            template: '<common-page></common-page>'
        })
        .state('mail', {
            url: '/mail',
            parent: 'common',
            abstract: true,
            template: '<mail-boxes></mail-boxes>'
        })
        .state('inbox', {
            url: '/inbox',
            parent: 'mail',
            template: '<inbox-mail></inbox-mail>'
        })
        .state('404', {
            url: '/404',
            template: '<error-404></error-404>'
        })
});

app.component('login', login);
app.component('commonPage', commonPage);
app.component('mailBoxes', mailBoxes);
app.component('inboxMail', inboxMail);
app.component('dropDown', dropDown);
app.component('error404', error404);



app.service('AuthService', AuthService);
