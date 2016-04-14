'use strict';

angular.module('ekmobilesapp')
    .controller('AdminUserCtrl', ['$scope', '$location', '$sessionStorage', '$rootScope', '$state', '$stateParams',
        'UserService', 'AuthenticationService', 'FlashService', '$window', '$timeout',
        function AdminUserCtrl($scope, $location, $sessionStorage, $rootScope, $state, $stateParams,
            UserService, AuthenticationService, FlashService, $window, $timeout) {

            $scope.auth = AuthenticationService;
            //Admin User Controller (login, logout)
            $scope.logIn = function logIn(username, password) {
                if (username !== undefined && password !== undefined) {

                    $scope.ngPromise = UserService.logIn(username, password).success(function (data) {
                        AuthenticationService.isAuthenticated = true;
                        AuthenticationService.userName = data.userName;
                        $sessionStorage.userInfo = data;
                        //$state.go('site.index');
                        $state.go($stateParams.returnUrl);
                        $scope.dataLoading = false;
                    }).error(function (status, data) {
                        console.log(status);
                        console.log(data);
                        $scope.hasError = true;
                        FlashService.Error(status.error_description || null);
                        $scope.dataLoading = false;
                    });
                }
            }

            $scope.logout = function logout() {
                if (AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = false;
                    delete $sessionStorage.userInfo;
                    $state.go('site.login');
                }
            }
        }

    ])
    .controller('UserAddressCtrl', ['$scope', '$location', '$sessionStorage', '$rootScope', '$state',
        'UserService', 'AuthenticationService', 'FlashService', '$window', '$timeout', '$stateParams',
        function AdminUserCtrl($scope, $location, $sessionStorage, $rootScope, $state,
            UserService, AuthenticationService, FlashService, $window, $timeout, $stateParams) {

            var vm = this;

            vm.update = function update() {
                vm.dataLoading = true;
                UserService.Update(vm.user)
                    .success(function (data) {
                        // FlashService.Success('Information updated successful', true);
                        $state.go($stateParams.returnUrl);
                    }).error(function (status, data) {
                        FlashService.Error('Information update error : ' + JSON.stringify(status));
                        vm.dataLoading = false;
                        $state.go($stateParams.returnUrl);
                    });
            }

            UserService.getUser()
            .success(function (data) {
                // FlashService.Success('User Information successful', true);
                vm.user = data;
                console.log(data);
            }).error(function (status, data) {
                FlashService.Error('Error in loading user information : ' + JSON.stringify(status));
                vm.dataLoading = false;
            });
        }
    ])
    .controller('RegisterController', ['UserService', '$location', '$rootScope', 'FlashService',
        function RegisterController(UserService, $location, $rootScope, FlashService) {
            var vm = this;

            vm.register = register;

            function register() {
                vm.dataLoading = true;
                UserService.Create(vm.user)
                    .success(function (data) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    }).error(function (status, data) {
                        FlashService.Error('Registration unsuccessful : ' + status.Message);
                        vm.dataLoading = false;
                    });
            }
        }])
 .factory('AuthenticationService', function ($sessionStorage) {
     var auth = {
         isAuthenticated: false,
         userName: null
     }
     if ($sessionStorage.userInfo) {
         auth.isAuthenticated = true;
         auth.userName = $sessionStorage.userInfo.userName
     }

     return auth;
 })
    .factory('UserService', function ($http, $sessionStorage, REST_BASE_URL) {

        return {
            logIn: function (username, password) {
                var data = "username=" + username + "&password=" + password + "&grant_type=password";
                var req = {
                    method: 'POST',
                    url: REST_BASE_URL + "/token",
                    data: data
                }

                return $http(req);
            },

            logOut: function () {

            },

            Create: function (user) {
                return $http.post(REST_BASE_URL + '/api/Account/Register', user);
            },

            Update: function (user) {
                return $http.put(REST_BASE_URL + '/api/Users', user);
            },

            getUser: function () {
                var username = $sessionStorage.userInfo ? $sessionStorage.userInfo.userName : null;
                return $http.get(REST_BASE_URL + '/api/Users/?id=' + username);
            }

        };
    })
    .factory('TokenInterceptor', function ($q, $sessionStorage, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.userInfo) {
                    config.headers.Authorization = 'Bearer ' + $sessionStorage.userInfo.access_token;
                }
                return config;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $sessionStorage.userInfo && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;

                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($sessionStorage.userInfo || AuthenticationService.isAuthenticated)) {
                    delete $sessionStorage.userInfo;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("/");
                }

                return $q.reject(rejection);
            }
        };
    })
    .directive('ngUserView', [function () {
        return {
            restrict: 'E',
            controller: 'AdminUserCtrl',
            scope: {},
            templateUrl: function (element, attrs) {
                if (typeof attrs.templateUrl == 'undefined') {
                    return 'partials/auth.user.view.html';
                } else {
                    return attrs.templateUrl;
                }
            },
            link: function (scope, element, attrs) {

            }
        };
    }])
    .directive('passwordConfirm', function () {

        return {
            restrict: 'A',
            scope: {
                matchTarget: '=',
            },
            require: 'ngModel',
            link: function link(scope, elem, attrs, ctrl) {
                var validator = function (value) {
                    ctrl.$setValidity('noMatch', value === scope.matchTarget);
                    return value;
                }

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);

                // This is to force validator when the original password gets changed
                scope.$watch('matchTarget', function (newval, oldval) {
                    validator(ctrl.$viewValue);
                });

            }
        }
    })