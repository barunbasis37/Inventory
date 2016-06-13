 angular.module('app').service("authInterceptorService", [
        "$q", "$injector", function ($q, $injector) {

            var authInterceptorServiceFactory = {};

            var request = function (config) {
                var authService = $injector.get("AuthService");
                config.headers = config.headers || {};
                //  config.headers.Mama = 'mamamama';
                var authData = authService.AccountInfo;
               // console.log(authData);
                //var authData = localStorageService.get("authorizationData");
                if (authData) {
                    config.headers.Authorization = "Bearer " + authData.AccessToken;
                    config.headers.Mama = new Date().toDateString();
                }

                return config;
            };
            var responseError = function (rejection) {
                if (rejection.status === 401) {
                    console.log('permission rejection');
                    console.log(rejection);
                }
                return $q.reject(rejection);
            };
            authInterceptorServiceFactory["request"] = request;
            authInterceptorServiceFactory["responseError"] = responseError;

            return authInterceptorServiceFactory;
        }
    ]);
 angular.module("app").config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("authInterceptorService");
 }]);

    angular.module("app").run([
        "AuthService", authService => {
            if (authService.IsSignedIn()) {
               // authService.Signout();
            }
            authService.FillAuthData();
        }
    ]);
    angular.module("app").run([
        "$rootScope", "$state", "permissionService", "AuthService", function ($rootScope, $state, permissionService, authService) {
            $rootScope.$on("$stateChangeStart",
                function (event, toState, toParams, fromState, fromParams) {
                    var key = toState.name.replace('root.', '');;
                    permissionService.IsAllowed(key)
                        .then(function (response) {
                            //console.log(response);
                            if (response.IsAllowed) {
                                return;
                            } else {
                                //console.log(response);
                                event.preventDefault();
                                if (authService.IsSignedIn()) {
                                    $state.go("root.denied");
                                } else {
                                    $state.go("root.signin");
                                }
                            }
                        }, error => {
                            console.log(error);
                            if (authService.IsSignedIn()) {
                                $state.go("root.denied");
                            } else {
                                $state.go("root.signin");
                            }
                        });
                });
        }
    ]);