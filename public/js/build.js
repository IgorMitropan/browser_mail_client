/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(2);

	var _router2 = _interopRequireDefault(_router);

	var _loginComponent = __webpack_require__(3);

	var _loginComponent2 = _interopRequireDefault(_loginComponent);

	var _commonPageComponent = __webpack_require__(5);

	var _commonPageComponent2 = _interopRequireDefault(_commonPageComponent);

	var _mailBoxesComponent = __webpack_require__(7);

	var _mailBoxesComponent2 = _interopRequireDefault(_mailBoxesComponent);

	var _inboxMailComponent = __webpack_require__(9);

	var _inboxMailComponent2 = _interopRequireDefault(_inboxMailComponent);

	var _contactListComponent = __webpack_require__(11);

	var _contactListComponent2 = _interopRequireDefault(_contactListComponent);

	var _contactDetailsComponent = __webpack_require__(13);

	var _contactDetailsComponent2 = _interopRequireDefault(_contactDetailsComponent);

	var _dropDownComponent = __webpack_require__(15);

	var _dropDownComponent2 = _interopRequireDefault(_dropDownComponent);

	var _avatarComponent = __webpack_require__(17);

	var _avatarComponent2 = _interopRequireDefault(_avatarComponent);

	var _mailtoComponent = __webpack_require__(19);

	var _mailtoComponent2 = _interopRequireDefault(_mailtoComponent);

	var _error404Component = __webpack_require__(21);

	var _error404Component2 = _interopRequireDefault(_error404Component);

	var _AuthService = __webpack_require__(23);

	var _AuthService2 = _interopRequireDefault(_AuthService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = angular.module('mailApp', ['ui.router', 'restangular', 'ui.bootstrap', 'ngMessages']);

	app.config(_router2.default);
	app.config(["RestangularProvider", function (RestangularProvider) {
	    RestangularProvider.setBaseUrl('https://test-api.javascript.ru/v1//imytropan');
	}]);

	app.run(["$transitions", function ($transitions) {
	    "ngInject";

	    $transitions.onStart({ to: 'common.mail.inbox' }, ["AuthService", "$state", function (AuthService, $state) {
	        "ngInject";

	        if (!AuthService.checkAuth) {
	            return $state.target("login");
	        }
	    }]);
	}]);

	app.component('login', _loginComponent2.default);
	app.component('commonPage', _commonPageComponent2.default);
	app.component('mailBoxes', _mailBoxesComponent2.default);
	app.component('inboxMail', _inboxMailComponent2.default);
	app.component('contactList', _contactListComponent2.default);
	app.component('contactDetails', _contactDetailsComponent2.default);
	app.component('dropDown', _dropDownComponent2.default);
	app.component('avatar', _avatarComponent2.default);
	app.component('mailto', _mailtoComponent2.default);
	app.component('error404', _error404Component2.default);

	app.service('AuthService', _AuthService2.default);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$urlRouterProvider", "$transitionsProvider", "$stateProvider", function ($urlRouterProvider, $transitionsProvider, $stateProvider) {
	    "ngInject";

	    $urlRouterProvider.when('', '/login');
	    $urlRouterProvider.when('/common', '/common/mail/inbox');
	    $urlRouterProvider.when('/common/mail', '/common/mail/inbox');
	    $urlRouterProvider.otherwise('404');

	    $transitionsProvider.onBefore({
	        to: function to(state) {
	            return !!state.abstract;
	        }
	    }, ["$transition$", "$state", function ($transition$, $state) {
	        "ngInject";

	        if (angular.isString($transition$.to().abstract)) {
	            return $state.target($transition$.to().abstract);
	        }
	    }]);

	    $stateProvider.state('login', {
	        url: '/login',
	        template: '<login></login>'
	    }).state('common', {
	        url: '/common',
	        abstract: 'common.mail',
	        template: '<common-page></common-page>'
	    }).state('common.mail', {
	        url: '/mail',
	        abstract: 'common.mail.inbox',
	        template: '<mail-boxes></mail-boxes>'
	    }).state('common.mail.inbox', {
	        url: '/inbox',
	        template: '<inbox-mail></inbox-mail>'
	    }).state('common.contacts', {
	        url: '/contacts',
	        template: '<contact-list></contact-list>'
	    }).state('common.contact', {
	        url: '/contacts/:id',
	        template: '<contact-details contact="contact"></contact-details>',
	        resolve: {
	            contact: ["Restangular", "$stateParams", function contact(Restangular, $stateParams) {
	                "ngInject";

	                return Restangular.one('users', $stateParams.id).get();
	            }]
	        },
	        controller: ["$scope", "contact", function controller($scope, contact) {
	            $scope.contact = contact;
	        }]
	    }).state('404', {
	        url: '/404',
	        template: '<error-404></error-404>'
	    });
	}];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$state", "AuthService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _login = __webpack_require__(4);

	var _login2 = _interopRequireDefault(_login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($state, AuthService) {
	    "ngInject";

	    var _this = this;

	    this.login = '';
	    this.password = '';

	    this.signIn = function () {
	        AuthService.signIn(_this.login, _this.password);

	        $state.go('common');
	    };
	}

	exports.default = {
	    template: _login2.default,
	    controller: controller
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <form class=\"form-signin login-form\" name=\"loginForm\" ng-submit=\"$ctrl.signIn()\" novalidate>\n        <h2 class=\"form-signin-heading login-title\">Please sign in</h2>\n        <div class=\"form-group\" ng-class=\"{ 'has-error' : loginForm.email.$invalid && !loginForm.email.$pristine }\">\n            <label for=\"inputEmail\" class=\"sr-only\">Email address</label>\n            <input type=\"email\" name=\"email\" id=\"inputEmail\" class=\"form-control\" placeholder=\"Email address\"\n                   required=\"\" autofocus=\"\"\n                   ng-model=\"$ctrl.login\">\n            <div ng-messages=\"loginForm.email.$error\">\n                <div ng-message=\"email\"  class=\"alert alert-danger\">Enter a valid\n                    email.</div>\n            </div>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error' : loginForm.password.$invalid && !loginForm.password.$pristine }\">\n            <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\"\n                   ng-model=\"$ctrl.password\" ng-minlength=\"2\" autofocus=\"\">\n\n            <div ng-show=\"loginForm.password.$error.minlength\" class=\"alert alert-danger\">Password is too short.</div>\n        </div>\n\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n    </form>\n</div>\n";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["AuthService", "$state"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commonPage = __webpack_require__(6);

	var _commonPage2 = _interopRequireDefault(_commonPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller(AuthService, $state) {
	    "ngInject";

	    var user = AuthService.authUser;

	    this.userName = user.userName;
	    this.photoUrl = user.photo;

	    this.signOut = function () {
	        AuthService.signOut();
	        $state.go('login');
	    };
	}

	exports.default = {
	    template: _commonPage2.default,
	    controller: controller
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n    <header class=\"row\">\n        <div class=\"logo col-sm-5\">\n            <ul class=\"profile-icons list-inline pull-left\">\n                <li>\n                    <img ng-src={{$ctrl.photoUrl}} class=\"img-circle\">\n                </li>\n                <li>{{$ctrl.userName}}</li>\n            </ul>\n        </div><!-- profile -->\n\n        <div class=\"search-bar col-sm-5\">\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\">\n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-main\">\n                  <span class=\"glyphicon glyphicon-search\"></span>\n              </button>\n            </span>\n            </div><!-- /input-group -->\n\n            <span class=\"arrow caret\"></span>\n\n        </div><!-- search-bar -->\n\n        <div class=\"profile col-sm-2\">\n            <a class=\"logout pull-right\" ng-click=\"$ctrl.signOut()\">Sign out <span class=\"glyphicon glyphicon-log-out\"></span></a>\n\n        </div><!-- logout -->\n    </header>\n\n    <div class=\"control-bar row\">\n        <div class=\"col-sm-2\">\n            <drop-down items=\"[{title:'Mail', state:'common.mail'}, {title:'Contacts', state:'common.contacts'}]\"></drop-down>\n        </div><!-- menu -->\n\n        <div class=\"controls col-sm-10\">\n            <ul class=\"control-list list-inline\">\n                <li>\n                    <button class=\"btn btn-control\">\n                        <input type=\"checkbox\" class=\"mail-select\">\n                        <span class=\"caret\"></span>\n                    </button>\n                </li>\n                <li>\n                    <button class=\"btn btn-control\">\n                        <span class=\"glyphicon glyphicon-repeat\"></span>\n                    </button>\n                </li>\n            </ul>\n        </div><!-- controls -->\n    </div><!-- control-bar -->\n</div>\n\n<div class=\"mail row\">\n    <div ui-view></div>\n</div>\n\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mailBoxes = __webpack_require__(8);

	var _mailBoxes2 = _interopRequireDefault(_mailBoxes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    template: _mailBoxes2.default
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"sidebar col-sm-2\">\n    <button class=\"compose btn btn-danger\">\n        Compose\n    </button>\n\n    <ul class=\"inbox-sections list-unstyled\">\n        <li class=\"active\">\n            Inbox (100)\n        </li>\n        <li>Sent Mail</li>\n        <li class=\"pending\">\n            Drafts (7)\n        </li>\n        <li>All Mail</li>\n        <li class=\"pending\">\n            Spam (1)\n        </li>\n    </ul>\n</div><!-- sidebar -->\n\n<div ui-view></div>";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _inboxMail = __webpack_require__(10);

	var _inboxMail2 = _interopRequireDefault(_inboxMail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    template: _inboxMail2.default
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"inbox col-sm-10\">\n    <ul class=\"list-unstyled\">\n        <li class=\"email-item row unread\">\n            <div class=\"people col-sm-3\">\n                <ul class=\"mail-icons list-inline\">\n                    <li>\n                        <input type=\"checkbox\" class=\"mail-select\">\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-cutlery\"></span>\n                    </li>\n                </ul>\n\n<span class=\"people-names\">\nNizar Khalife\n</span>\n            </div><!-- people -->\n\n            <div class=\"message col-sm-7\">\n                <div class=\"clipper\">\n                    <h3>About your pizza</h3>\n                    -\n                    <p>We can't deliver your pizza on time. We will be about 50 minutes late. Is that okay? Let us\n                        know because there are a lot of hungry people in the world.</p>\n                </div>\n            </div><!-- message -->\n\n            <div class=\"date col-sm-2\">\n                <date class=\"pull-right\">11:27 a.m.</date>\n            </div><!-- date -->\n        </li>\n\n        <li class=\"email-item row\">\n            <div class=\"people col-sm-3\">\n                <ul class=\"mail-icons list-inline\">\n                    <li>\n                        <input type=\"checkbox\" class=\"mail-select\">\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-cutlery\"></span>\n                    </li>\n                </ul>\n\n<span class=\"people-names\">\nNizar Khalife\n</span>\n            </div><!-- people -->\n\n            <div class=\"message col-sm-7\">\n                <div class=\"clipper\">\n                    <h3>About your pizza</h3>\n                    -\n                    <p>We can't deliver your pizza on time. We will be about 50 minutes late. Is that okay? Let us\n                        know because there are a lot of hungry people in the world.</p>\n                </div>\n            </div><!-- message -->\n\n            <div class=\"date col-sm-2\">\n                <date class=\"pull-right\">11:27 a.m.</date>\n            </div><!-- date -->\n        </li>\n\n        <li class=\"email-item row unread\">\n            <div class=\"people col-sm-3\">\n                <ul class=\"mail-icons list-inline\">\n                    <li>\n                        <input type=\"checkbox\" class=\"mail-select\">\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-cutlery\"></span>\n                    </li>\n                </ul>\n\n<span class=\"people-names\">\nNizar Khalife\n</span>\n            </div><!-- people -->\n\n            <div class=\"message col-sm-7\">\n                <div class=\"clipper\">\n                    <h3>About your pizza</h3>\n                    -\n                    <p>We can't deliver your pizza on time. We will be about 50 minutes late. Is that okay? Let us\n                        know because there are a lot of hungry people in the world.</p>\n                </div>\n            </div><!-- message -->\n\n            <div class=\"date col-sm-2\">\n                <date class=\"pull-right\">11:27 a.m.</date>\n            </div><!-- date -->\n        </li>\n        <li class=\"email-item row\">\n            <div class=\"people col-sm-3\">\n                <ul class=\"mail-icons list-inline\">\n                    <li>\n                        <input type=\"checkbox\" class=\"mail-select\">\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-cutlery\"></span>\n                    </li>\n                </ul>\n\n<span class=\"people-names\">\nNizar Khalife\n</span>\n            </div><!-- people -->\n\n            <div class=\"message col-sm-7\">\n                <div class=\"clipper\">\n                    <h3>About your pizza</h3>\n                    -\n                    <p>We can't deliver your pizza on time. We will be about 50 minutes late. Is that okay? Let us\n                        know because there are a lot of hungry people in the world.</p>\n                </div>\n            </div><!-- message -->\n\n            <div class=\"date col-sm-2\">\n                <date class=\"pull-right\">11:27 a.m.</date>\n            </div><!-- date -->\n        </li>\n\n        <li class=\"email-item row\">\n            <div class=\"people col-sm-3\">\n                <ul class=\"mail-icons list-inline\">\n                    <li>\n                        <input type=\"checkbox\" class=\"mail-select\">\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-star-empty\"></span>\n                    </li>\n                    <li>\n                        <span class=\"glyphicon glyphicon-cutlery\"></span>\n                    </li>\n                </ul>\n\n<span class=\"people-names\">\nNizar Khalife\n</span>\n            </div><!-- people -->\n\n            <div class=\"message col-sm-7\">\n                <div class=\"clipper\">\n                    <h3>About your pizza</h3>\n                    -\n                    <p>We can't deliver your pizza on time. We will be about 50 minutes late. Is that okay? Let us\n                        know because there are a lot of hungry people in the world.</p>\n                </div>\n            </div><!-- message -->\n\n            <div class=\"date col-sm-2\">\n                <date class=\"pull-right\">11:27 a.m.</date>\n            </div><!-- date -->\n        </li>\n    </ul>\n</div><!-- inbox -->\n</div><!-- mail -->";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["Restangular", "$filter"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contactList = __webpack_require__(12);

	var _contactList2 = _interopRequireDefault(_contactList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller(Restangular, $filter) {
	    "ngInject";

	    var _this = this;

	    this.contacts = [];
	    Restangular.all('users').getList().then(function (contacts) {
	        _this.contacts = $filter('orderBy')(contacts, 'fullName');
	    });
	}

	exports.default = {
	    template: _contactList2.default,
	    controller: controller
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"media-list tab-pane fade in active\">\n    <li class=\"media\" ng-repeat=\"contact in $ctrl.contacts\">\n        <div class=\"media-left media-middle\">\n            <a ui-sref=\"common.contact({id: contact._id})\" >\n                <img  class=\"media-object img-thumbnail\" ng-src={{contact.avatarUrl}} alt=\"Contact\">\n            </a>\n        </div>\n        <div class=\"media-body\">\n            <h3>{{contact.fullName}}</h3>\n        </div>\n    </li>\n</ul>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$filter"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contactDetails = __webpack_require__(14);

	var _contactDetails2 = _interopRequireDefault(_contactDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($filter) {
	    "ngInject";

	    this.contact.birthdate = $filter('date')(this.contact.birthdate, 'dd.MM.yyyy');
	    this.contact.gender = this.contact.gender === 'M' ? 'male' : 'female';
	}

	exports.default = {
	    template: _contactDetails2.default,
	    bindings: {
	        contact: '<'
	    },
	    controller: controller
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-info\">\n\n    <div class=\"panel-heading\">\n        <button class=\"btn btn-xs btn-primary pull-right\"\n                type=\"button\" ui-sref=\"common.contacts\">Back</button>\n        <h3 class=\"panel-title\">{{$ctrl.contact.fullName}}</h3>\n    </div>\n    <div class=\"panel-body\">\n        <div class=\"row\">\n\n            <div class=\"col-md-3 col-lg-3 \" align=\"center\">\n                <avatar user=\"$ctrl.contact\"></avatar>\n            </div>\n\n            <div class=\" col-md-9 col-lg-9 \">\n                <table class=\"table table-user-information\">\n                    <tbody>\n                    <tr>\n                        <td>BirthDate</td>\n                        <td>{{$ctrl.contact.birthdate}}</td>\n                    </tr>\n                    <tr>\n                        <td>Gender</td>\n                        <td>{{$ctrl.contact.gender}}</td>\n                    </tr>\n                    <tr>\n                        <td>Address</td>\n                        <td>{{$ctrl.contact.address}}</td>\n                    </tr>\n                    <tr>\n                        <td>Email</td>\n                        <td>\n                            <mailto email='$ctrl.contact.email'></mailto>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$state"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dropDown = __webpack_require__(16);

	var _dropDown2 = _interopRequireDefault(_dropDown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($state) {
	    "ngInject";

	    var _this = this;

	    this.choice = this.items[0];

	    this.toggleDropdown = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	    };

	    this.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

	    this.goToChoice = function (choice) {
	        _this.choice = choice;

	        if (choice.state) {
	            $state.go(choice.state);
	        }
	    };
	}

	exports.default = {
	    template: _dropDown2.default,
	    bindings: {
	        items: '<'
	    },
	    controller: controller
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<span uib-dropdown on-toggle=\"toggled(open)\">\n    <a href id=\"simple-dropdown\" uib-dropdown-toggle>\n        <div class=\"menu\">\n            <div>\n                {{$ctrl.choice.title || $ctrl.choice}}\n                <span class=\"caret\"></span>\n            </div>\n        </div>\n    </a>\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"simple-dropdown\">\n        <li ng-repeat=\"choice in $ctrl.items\">\n            <a ng-click=\"$ctrl.goToChoice(choice)\">{{choice.title || choice}}</a>\n        </li>\n    </ul>\n</span>";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _avatar = __webpack_require__(18);

	var _avatar2 = _interopRequireDefault(_avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    template: _avatar2.default,
	    bindings: {
	        user: '<'
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <img ng-src=\"{{$ctrl.user.avatarUrl || 'http://psdexport.com/storage/avatars/default.png'}}\"\n         class=\"img-circle img-responsive\">\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mailto = __webpack_require__(20);

	var _mailto2 = _interopRequireDefault(_mailto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    template: _mailto2.default,
	    bindings: {
	        email: '<'
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<a ng-href=\"mailto:{{$ctrl.email}}\">mailto:{{$ctrl.email}}</a>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["AuthService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _error = __webpack_require__(22);

	var _error2 = _interopRequireDefault(_error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller(AuthService) {
	    "ngInject";

	    var user = AuthService.getAuthUser();

	    this.userName = user.userName;
	    this.photoUrl = user.photo;
	}

	exports.default = {
	    template: _error2.default
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<h1> Error 404</h1>\n<h2>This Page is not found!</h2>\n<br>\n<h4><a ui-sref=\"common\">Go to the main page>></a></h4>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var userProfile = {
	    userName: 'John Smith',
	    photo: 'img/profile.jpg',
	    login: '',
	    password: ''
	};

	var AuthService = function () {
	    function AuthService() {
	        _classCallCheck(this, AuthService);

	        this._isAuthorized = false;

	        this._authUser = {
	            userName: '',
	            photo: ''
	        };
	    }

	    _createClass(AuthService, [{
	        key: 'signIn',
	        value: function signIn(login, password) {
	            this._isAuthorized = login === userProfile.login && password === userProfile.password;

	            this._authUser = {
	                userName: userProfile.userName,
	                photo: userProfile.photo
	            };
	        }
	    }, {
	        key: 'signOut',
	        value: function signOut() {
	            this._isAuthorized = false;

	            this._authUser = {
	                userName: '',
	                photo: ''
	            };
	        }
	    }, {
	        key: 'checkAuth',
	        get: function get() {
	            return this._isAuthorized;
	        }
	    }, {
	        key: 'authUser',
	        get: function get() {
	            return this._authUser;
	        }
	    }]);

	    return AuthService;
	}();

	exports.default = AuthService;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map