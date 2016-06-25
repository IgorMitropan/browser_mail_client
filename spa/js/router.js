'use strict';

export default function($urlRouterProvider, $transitionsProvider, $stateProvider) {
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

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('common', {
            url: '/common',
            abstract: 'common.mail',
            template: '<common-page></common-page>'
        })
        .state('common.mail', {
            url: '/mail',
            abstract: 'common.mail.inbox',
            template: '<mail-boxes></mail-boxes>'
        })
        .state('common.mail.inbox', {
            url: '/inbox',
            template: '<inbox-mail></inbox-mail>'
        })
        .state('common.contacts', {
            url: '/contacts',
            template: '<contact-list></contact-list>'
        })
        .state('common.contact', {
            url: '/contacts/:id',
            template: '<contact-details contact="contact"></contact-details>',
            resolve: {
                contact: (Restangular, $stateParams) => {
                    "ngInject";
                    return Restangular.one('users', $stateParams.id).get();
                }
            },
            controller: function($scope, contact) {
                $scope.contact = contact;
            }
        })
        .state('404', {
            url: '/404',
            template: '<error-404></error-404>'
        })
}
