'use strict';


import router from './router.js';

import login from './login/login.component.js';
import commonPage from './commonPage/commonPage.component.js';
import mailBoxes from './mailBoxes/mailBoxes.component.js';
import lettersList from './lettersList/lettersList.component';
import contactList from './contactList/contactList.component.js';
import contactDetails from './contactDetails/contactDetails.component.js';
import dropDown from './dropDown/dropDown.component.js';
import avatar from './avatar/avatar.component.js';
import mailto from './mailto/mailto.component.js';
import error404 from './error404/error404.component.js';

import AuthService from './services/AuthService.js';
import RestoreDBService from './services/RestoreDBService.js';


const app = angular.module('mailApp', ['ui.router', 'restangular', 'ui.bootstrap', 'ngMessages']);

app.config(router);
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://test-api.javascript.ru/v1/imytropan');
});

app.run(function($rootScope, $transitions) {
    "ngInject";

    $transitions.onSuccess({to: state => state.requiresAuth}, function ($state) {
        "ngInject";
        $rootScope.$broadcast('stateWasChanged', $state.current);
    });
});

app.component('login', login);
app.component('commonPage', commonPage);
app.component('mailBoxes', mailBoxes);
app.component('lettersList', lettersList);
app.component('contactList', contactList);
app.component('contactDetails', contactDetails);
app.component('dropDown', dropDown);
app.component('avatar', avatar);
app.component('mailto', mailto);
app.component('error404', error404);

app.service('AuthService', AuthService);
app.service('RestoreDBService', RestoreDBService);
