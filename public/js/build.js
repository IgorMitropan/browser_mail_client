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

	var _lettersList = __webpack_require__(9);

	var _lettersList2 = _interopRequireDefault(_lettersList);

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
	    RestangularProvider.setBaseUrl('https://test-api.javascript.ru/v1/imytropan');
	}]);

	app.component('login', _loginComponent2.default);
	app.component('commonPage', _commonPageComponent2.default);
	app.component('mailBoxes', _mailBoxesComponent2.default);
	app.component('lettersList', _lettersList2.default);
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
	    $urlRouterProvider.when('/common', '/common/mail/letters');
	    $urlRouterProvider.when('/common/mail', '/common/mail/letters');
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
	    $transitionsProvider.onStart({ to: function to(state) {
	            return state.requiresAuth;
	        } }, ["AuthService", "$state", function (AuthService, $state) {
	        "ngInject";

	        if (!AuthService.checkAuth) {
	            return $state.target("login");
	        }
	    }]);

	    $stateProvider.state('login', {
	        url: '/login',
	        template: '<login></login>',
	        requiresAuth: false
	    }).state('common', {
	        url: '/common',
	        abstract: 'mail',
	        template: '<common-page></common-page>',
	        requiresAuth: true
	    }).state('mail', {
	        url: '/mail',
	        parent: 'common',
	        abstract: 'letters',
	        template: '<mail-boxes \n                        mailboxes="mailboxes"\n                        select-all="$parent.$ctrl.selectAll"\n                        is-any-item-selected="$parent.$ctrl.isAnyItemSelected"\n                        search="$parent.$ctrl.search">\n                        </mail-boxes>',
	        requiresAuth: true,
	        resolve: {
	            mailboxes: ["Restangular", function mailboxes(Restangular) {
	                "ngInject";

	                return Restangular.all('mailboxes').getList();
	            }]
	        },
	        controller: ["$scope", "mailboxes", function controller($scope, mailboxes) {
	            $scope.mailboxes = mailboxes;
	        }]

	    }).state('letters', {
	        url: '/letters',
	        parent: 'mail',
	        template: '<letters-list \n                        letters="letters" \n                        mailbox-id="$parent.$ctrl.mailboxId"\n                        select-all="$parent.$ctrl.selectAll"\n                        is-any-item-selected="$parent.$ctrl.isAnyItemSelected"\n                        search="$parent.$ctrl.search">\n                        </letters-list>',
	        requiresAuth: true,
	        resolve: {
	            letters: ["Restangular", function letters(Restangular) {
	                "ngInject";

	                return Restangular.all('letters').getList();
	            }]
	        },
	        controller: ["$scope", "letters", function controller($scope, letters) {
	            $scope.letters = letters;
	        }]
	    }).state('contacts', {
	        url: '/contacts',
	        parent: 'common',
	        template: '<contact-list\n                        contacts="contacts"\n                        select-all="$parent.$ctrl.selectAll"\n                        is-any-item-selected="$parent.$ctrl.isAnyItemSelected"\n                        search="$parent.$ctrl.search">\n                        </contact-list>',
	        requiresAuth: true,
	        resolve: {
	            contacts: ["Restangular", function contacts(Restangular) {
	                "ngInject";

	                return Restangular.all('users').getList();
	            }]
	        },
	        controller: ["$scope", "contacts", function controller($scope, contacts) {
	            'ngInject';

	            $scope.contacts = contacts;
	        }]
	    }).state('contact', {
	        url: '/contacts/:id',
	        parent: 'common',
	        template: '<contact-details contact="contact"></contact-details>',
	        requiresAuth: true,
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
	        template: '<error-404></error-404>',
	        requiresAuth: false
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

	module.exports = "<div>\r\n    <form class=\"form-signin login-form\" name=\"loginForm\" ng-submit=\"$ctrl.signIn()\" novalidate>\r\n        <h2 class=\"form-signin-heading login-title\">Please sign in</h2>\r\n        <div class=\"form-group\" ng-class=\"{ 'has-error' : loginForm.email.$invalid && !loginForm.email.$pristine }\">\r\n            <label for=\"inputEmail\" class=\"sr-only\">Email address</label>\r\n            <input type=\"email\" name=\"email\" id=\"inputEmail\" class=\"form-control\" placeholder=\"Email address\"\r\n                   required=\"\" autofocus=\"\"\r\n                   ng-model=\"$ctrl.login\">\r\n            <div ng-messages=\"loginForm.email.$error\">\r\n                <div ng-message=\"email\"  class=\"alert alert-danger\">Enter a valid\r\n                    email.</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\" ng-class=\"{ 'has-error' : loginForm.password.$invalid && !loginForm.password.$pristine }\">\r\n            <label for=\"inputPassword\" class=\"sr-only\">Password</label>\r\n            <input type=\"password\" name=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\"\r\n                   ng-model=\"$ctrl.password\" ng-minlength=\"2\" autofocus=\"\">\r\n\r\n            <div ng-show=\"loginForm.password.$error.minlength\" class=\"alert alert-danger\">Password is too short.</div>\r\n        </div>\r\n\r\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\r\n    </form>\r\n</div>\r\n";

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

	var commonStateChildren = [{ title: 'Mail', state: 'mail' }, { title: 'Contacts', state: 'contacts' }];

	function controller(AuthService, $state) {
	    "ngInject";

	    this.commonStateChildren = commonStateChildren;

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

	module.exports = "<div class=\"container-fluid\">\r\n    <header class=\"row\">\r\n        <div class=\"logo col-sm-5\">\r\n            <ul class=\"profile-icons list-inline pull-left\">\r\n                <li>\r\n                    <img ng-src={{$ctrl.photoUrl}} class=\"img-circle\">\r\n                </li>\r\n                <li>{{$ctrl.userName}}</li>\r\n            </ul>\r\n        </div><!-- profile -->\r\n\r\n        <div class=\"search-bar col-sm-5\">\r\n            <div class=\"form-group has-feedback\">\r\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\"\r\n                           ng-model=\"$ctrl.search\" ng-model-options=\"{ debounce: 500 }\">\r\n                    <span class=\"glyphicon glyphicon-search form-control-feedback\" aria-hidden=\"true\"></span>\r\n            </div><!-- /form-group -->\r\n\r\n        </div><!-- search-bar -->\r\n\r\n        <div class=\"profile col-sm-2\">\r\n            <a class=\"logout pull-right\" ng-click=\"$ctrl.signOut()\">Sign out <span class=\"glyphicon glyphicon-log-out\"></span></a>\r\n\r\n        </div><!-- logout -->\r\n    </header>\r\n\r\n    <div class=\"control-bar row\">\r\n        <div class=\"col-sm-2\">\r\n            <drop-down items=\"$ctrl.commonStateChildren\"></drop-down>\r\n        </div><!-- menu -->\r\n\r\n        <div class=\"controls col-sm-10\">\r\n            <ul class=\"control-list list-inline\">\r\n                <li>\r\n                    <button class=\"btn btn-control\" title=\"Refresh\">\r\n                        <span class=\"glyphicon glyphicon-repeat\"></span>\r\n                    </button>\r\n                </li>\r\n                <li>\r\n                    <button class=\"btn btn-control\" title=\"Select All\">\r\n                        <input type=\"checkbox\" class=\"mail-select\" ng-model=\"$ctrl.selectAll\" ng-change=\"$ctrl.setSelection()\">\r\n                    </button>\r\n                </li>\r\n                <li>\r\n                    <button class=\"btn btn-control\" title=\"Delete\" ng-if=\"$ctrl.isAnyItemSelected\">\r\n                        <span class=\"glyphicon glyphicon-trash\"></span>\r\n                    </button>\r\n                </li>\r\n\r\n            </ul>\r\n        </div><!-- controls -->\r\n    </div><!-- control-bar -->\r\n</div>\r\n\r\n<div class=\"mail row\">\r\n    <div ui-view>Loading...</div>\r\n</div>\r\n\r\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$scope"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mailBoxes = __webpack_require__(8);

	var _mailBoxes2 = _interopRequireDefault(_mailBoxes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($scope) {
	    "ngInject";

	    var _this = this;

	    this.mailboxId = this.mailboxes[0]._id;

	    this.choseMailbox = function (mailbox) {
	        _this.mailboxId = mailbox._id;
	    };
	}

	exports.default = {
	    template: _mailBoxes2.default,
	    bindings: {
	        mailboxes: '<',
	        selectAll: '=',
	        isAnyItemSelected: '=',
	        search: '<'
	    },
	    controller: controller
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"sidebar col-sm-2\">\r\n    <button class=\"compose btn btn-danger\">\r\n        Compose\r\n    </button>\r\n\r\n    <ul class=\"inbox-sections list-unstyled\">\r\n        <li class=\"pending\" ng-repeat=\"mailbox in $ctrl.mailboxes\"\r\n            ng-class=\"{'active': mailbox._id === $ctrl.mailboxId}\" ng-click=\"$ctrl.choseMailbox(mailbox)\">\r\n            {{mailbox.title}}\r\n        </li>\r\n    </ul>\r\n</div><!-- sidebar -->\r\n\r\n<div ui-view></div>";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$filter", "$scope"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lettersList = __webpack_require__(10);

	var _lettersList2 = _interopRequireDefault(_lettersList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($filter, $scope) {
	    "ngInject";

	    var _this = this;

	    var letters = this.letters;
	    var lettersforSearch = this.letters;

	    $scope.$watch('$ctrl.mailboxId', function (mailboxId) {
	        $scope.$ctrl.letters = $filter('filter')(letters, mailboxId, true, '_id');
	        lettersforSearch = $scope.$ctrl.letters;
	    });

	    this.numberOfSelectedItems = 0;

	    $scope.$watch('$ctrl.selectAll', function (selectAll) {
	        $scope.$ctrl.letters.forEach(function (item) {
	            return item.selected = selectAll;
	        });

	        $scope.$ctrl.change();
	    });

	    $scope.$watch('$ctrl.search', function (search) {
	        $scope.$ctrl.letters = $filter('filter')(lettersforSearch, search);
	    });

	    this.change = function () {
	        var newNumberOfSelectedItems = _this.letters.filter(function (item) {
	            return item.selected;
	        }).length;

	        if (newNumberOfSelectedItems && !_this.numberOfSelectedItems) {
	            _this.isAnyItemSelected = true;
	        }

	        if (!newNumberOfSelectedItems && _this.numberOfSelectedItems) {
	            _this.selectAll = false;
	            _this.isAnyItemSelected = false;
	        }

	        if (newNumberOfSelectedItems === _this.letters.length) {
	            _this.selectAll = true;
	        }

	        _this.numberOfSelectedItems = newNumberOfSelectedItems;
	    };
	}

	exports.default = {
	    template: _lettersList2.default,
	    bindings: {
	        letters: '<',
	        mailboxId: '<',
	        selectAll: '=',
	        isAnyItemSelected: '=',
	        search: '<'
	    },
	    controller: controller
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"inbox col-sm-10\">\r\n        <ul class=\"list-unstyled\">\r\n            <li class=\"email-item row unread\" ng-repeat=\"letter in $ctrl.letters\">\r\n                <div class=\"people col-sm-3\">\r\n                    <ul class=\"mail-icons list-inline\">\r\n                        <li>\r\n                            <input type=\"checkbox\" class=\"mail-select\" ng-model=\"letter.selected\" ng-change=\"$ctrl.change()\">\r\n                        </li>\r\n                    </ul>\r\n    \r\n    <span class=\"people-names pending\">\r\n {{letter.to}}\r\n </span>\r\n                </div><!-- people -->\r\n    \r\n                <div class=\"message\">\r\n                    <div class=\"clipper\">\r\n                        <h3>{{letter.subject}}</h3>\r\n                        -\r\n                        <p>{{letter.body}}</p>\r\n                    </div>\r\n                </div><!-- message -->\r\n            </li>\r\n        </ul>\r\n    </div><!-- inbox -->\r\n</div><!-- mail --> ";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	controller.$inject = ["$filter", "$scope"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contactList = __webpack_require__(12);

	var _contactList2 = _interopRequireDefault(_contactList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function controller($filter, $scope) {
	    "ngInject";

	    var _this = this;

	    this.contacts = $filter('orderBy')(this.contacts, 'fullName');
	    var contacts = this.contacts;

	    this.numberOfSelectedItems = 0;

	    $scope.$watch('$ctrl.selectAll', function (selectAll) {
	        $scope.$ctrl.contacts.forEach(function (item) {
	            return item.selected = selectAll;
	        });

	        $scope.$ctrl.change();
	    });

	    $scope.$watch('$ctrl.search', function (search) {
	        $scope.$ctrl.contacts = $filter('filter')(contacts, search, false, 'fullName');
	    });

	    this.change = function () {
	        var newNumberOfSelectedItems = _this.contacts.filter(function (item) {
	            return item.selected;
	        }).length;

	        if (newNumberOfSelectedItems && !_this.numberOfSelectedItems) {
	            _this.isAnyItemSelected = true;
	        }

	        if (!newNumberOfSelectedItems && _this.numberOfSelectedItems) {
	            _this.selectAll = false;
	            _this.isAnyItemSelected = false;
	        }

	        if (newNumberOfSelectedItems === _this.contacts.length) {
	            _this.selectAll = true;
	        }

	        _this.numberOfSelectedItems = newNumberOfSelectedItems;
	    };
	}

	exports.default = {
	    template: _contactList2.default,
	    bindings: {
	        contacts: '<',
	        selectAll: '=',
	        isAnyItemSelected: '=',
	        search: '<'
	    },
	    controller: controller
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\r\n    <div class=\"col-sm-8\">\r\n        <ul class=\"list-unstyled\">\r\n            <li ng-repeat=\"contact in $ctrl.contacts\">\r\n                <ul class=\"list-inline\">\r\n                    <li>\r\n                        <input type=\"checkbox\" class=\"mail-select\" ng-model=\"contact.selected\" ng-change=\"$ctrl.change()\">\r\n                    </li>\r\n                    <li>\r\n                        <a ui-sref=\"contact({id: contact._id})\" >\r\n                            <img  class=\"img-circle\" ng-src={{contact.avatarUrl}} alt=\"Contact\">\r\n                        </a>\r\n                    </li>\r\n                    <li>\r\n                        <h3>{{contact.fullName}}</h3>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n";

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

	module.exports = "<br>\r\n<div class=\"container-fluid col-sm-6 col-sm-offset-3\">\r\n    <div class=\"panel panel-info\">\r\n\r\n        <div class=\"panel-heading\">\r\n            <button class=\"btn btn-xs btn-primary pull-right\"\r\n                    type=\"button\" ui-sref=\"contacts\">Back</button>\r\n            <h3 class=\"panel-title\">{{$ctrl.contact.fullName}}</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n\r\n                <div class=\"col-md-3 col-lg-3 \" align=\"center\">\r\n                    <avatar user=\"$ctrl.contact\"></avatar>\r\n                </div>\r\n\r\n                <div class=\" col-md-9 col-lg-9 \">\r\n                    <table class=\"table table-user-information\">\r\n                        <tbody>\r\n                        <tr>\r\n                            <td>BirthDate</td>\r\n                            <td>{{$ctrl.contact.birthdate}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>Gender</td>\r\n                            <td>{{$ctrl.contact.gender}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>Address</td>\r\n                            <td>{{$ctrl.contact.address}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>Email</td>\r\n                            <td>\r\n                                <mailto email='$ctrl.contact.email'></mailto>\r\n                            </td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

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

	module.exports = "<span uib-dropdown on-toggle=\"toggled(open)\">\r\n    <a href id=\"simple-dropdown\" uib-dropdown-toggle>\r\n        <div class=\"menu\">\r\n            <div>\r\n                {{$ctrl.choice.title || $ctrl.choice}}\r\n                <span class=\"caret\"></span>\r\n            </div>\r\n        </div>\r\n    </a>\r\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"simple-dropdown\">\r\n        <li ng-repeat=\"choice in $ctrl.items\">\r\n            <a ng-click=\"$ctrl.goToChoice(choice)\">{{choice.title || choice}}</a>\r\n        </li>\r\n    </ul>\r\n</span>";

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

	module.exports = "<div>\r\n    <img ng-src=\"{{$ctrl.user.avatarUrl || 'http://psdexport.com/storage/avatars/default.png'}}\"\r\n         class=\"media-object img-thumbnail\">\r\n</div>";

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

	module.exports = "<h1> Error 404</h1>\r\n<h2>This Page is not found!</h2>\r\n<br>\r\n<h4><a ui-sref=\"common\">Go to the main page>></a></h4>";

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