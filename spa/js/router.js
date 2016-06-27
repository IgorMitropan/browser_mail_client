'use strict';

export default function ($urlRouterProvider, $transitionsProvider, $stateProvider) {
    "ngInject";

    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.when('/common', '/common/mail/inbox');
    $urlRouterProvider.when('/common/mail', '/common/mail/inbox');
    $urlRouterProvider.otherwise('404');

    $transitionsProvider.onBefore({
        to: state => !!state.abstract
    }, ($transition$, $state) => {
        "ngInject";
        if (angular.isString($transition$.to().abstract)) {
            return $state.target($transition$.to().abstract);
        }
    });
    $transitionsProvider.onStart({to: state => state.requiresAuth}, function (AuthService, $state) {
        "ngInject";

        if (!AuthService.checkAuth) {
            return $state.target("login");
        }
    });


    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>',
            requiresAuth: false
        })
        .state('common', {
            url: '/common',
            abstract: 'mail',
            template: '<common-page></common-page>',
            requiresAuth: true
        })
        .state('mail', {
            url: '/mail',
            parent: 'common',
            abstract: 'inbox',
            template: '<mail-boxes></mail-boxes>',
            requiresAuth: true
        })
        .state('inbox', {
            url: '/inbox',
            parent: 'mail',
            template: '<inbox-mail></inbox-mail>',
            requiresAuth: true
        })
        .state('contacts', {
            url: '/contacts',
            parent: 'common',
            template: '<contact-list contacts="contacts" select="$parent.$ctrl.select"></contact-list>',
            requiresAuth: true,
            resolve: {
                contacts: (Restangular) => {
                    "ngInject";
                    return Restangular.all('users').getList();
                }
            },
            controller: function ($scope, contacts) {
                'ngInject';
                $scope.contacts = contacts;
            }
        })
        .state('contact', {
            url: '/contacts/:id',
            parent: 'common',
            template: '<contact-details contact="contact"></contact-details>',
            requiresAuth: true,
            resolve: {
                contact: (Restangular, $stateParams) => {
                    "ngInject";
                    return Restangular.one('users', $stateParams.id).get();
                }
            },
            controller: function ($scope, contact) {
                $scope.contact = contact;
            }
        })
        .state('404', {
            url: '/404',
            template: '<error-404></error-404>',
            requiresAuth: false
        })
}
