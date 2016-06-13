var App;
(function (App) {
    var SigninController = (function () {
        function SigninController(authService, $state, $rootScope) {
            //console.log('i m in signincontroller');
            this.authService = authService;
            this.stateService = $state;
            this.rootScopeService = $rootScope;
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.stateService.go("root.home");
            }
        }
        SigninController.prototype.Signin = function () {
            var self = this;
            var signinSuccess = function (response) {
                self.stateService.go("root.home");
                self.rootScopeService.$broadcast("SignedIn");
            };
            var signinError = function (error) {
                console.log(error);
                if (error.data.error_description) {
                    alert(error.data.error_description);
                }
                else {
                    alert('Unknown error occurred. Please contact support. Thanks.');
                }
                self.ShowErrorMessage = true;
            };
            self.authService.Signin(new App.SigninRequest(self.User.Email, self.User.Password)).then(signinSuccess, signinError);
        };
        SigninController.$inject = ["AuthService", "$state", "$rootScope"];
        return SigninController;
    }());
    App.SigninController = SigninController;
    angular.module("app").controller("SigninController", SigninController);
    var NavController = (function () {
        function NavController(authService, $state, $rootScope) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
            }
            else {
                self.IsSignedIn = false;
            }
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.loadUser();
            });
        }
        NavController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        };
        NavController.prototype.Signout = function () {
            var self = this;
            self.authService.Signout();
            self.loadUser();
            self.stateService.go("root.signin");
            self.rootScopeService.$broadcast("SignedOut");
        };
        NavController.$inject = ["AuthService", "$state", "$rootScope"];
        return NavController;
    }());
    App.NavController = NavController;
    angular.module("app").controller("NavController", NavController);
    var RegisterController = (function () {
        function RegisterController(authService, $state) {
            this.authService = authService;
            this.stateService = $state;
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.stateService.go("root.home");
            }
            this.Notification = new App.Notification();
            this.Notification.IsError = false;
            this.Notification.IsInfo = false;
            this.IsDisabled = false;
        }
        RegisterController.prototype.Register = function () {
            var self = this;
            self.IsDisabled = true;
            var successCallback = function (response) {
                self.stateService.go("root.signin");
                // console.log(response);
                self.IsDisabled = false;
                return response;
            };
            var errorCallback = function (errorResponse) {
                self.IsDisabled = false;
                console.log(errorResponse);
                self.Notification.IsError = true;
                if (errorResponse.status === 500) {
                    self.Notification.Message = errorResponse.data.ExceptionMessage;
                }
                else {
                    if (errorResponse.status === 400 && errorResponse.data.ModelState["model.Password"]) {
                        self.Notification.Message = errorResponse.data.ModelState["model.Password"][0];
                    }
                    else {
                        if (errorResponse.status === 400 && errorResponse.data.ModelState["model.Phone"]) {
                            self.Notification.Message = errorResponse.data.ModelState["model.Phone"][0];
                        }
                        else {
                            if (errorResponse.status === 400 && errorResponse.data.ModelState[""]) {
                                if (errorResponse.data.ModelState[""].length > 1) {
                                    self.Notification.Message = errorResponse.data.ModelState[""][1];
                                }
                                else
                                    self.Notification.Message = errorResponse.data.ModelState[""][0];
                            }
                            else
                                self.Notification.Message = errorResponse.data.Message;
                        }
                    }
                }
            };
            self.authService.Register(self.User).then(successCallback, errorCallback);
        };
        RegisterController.$inject = ["AuthService", "$state"];
        return RegisterController;
    }());
    App.RegisterController = RegisterController;
    angular.module("app").controller("RegisterController", RegisterController);
})(App || (App = {}));

var App;
(function (App) {
    "use strict";
    var BaseService = (function () {
        function BaseService($q, urlService, webService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
        }
        return BaseService;
    }());
    App.BaseService = BaseService;
})(App || (App = {}));

var App;
(function (App) {
    var WebService = (function () {
        function WebService($q, $http) {
            this.qService = $q;
            this.httpService = $http;
        }
        WebService.prototype.Post = function (url, data) {
            var self = this;
            var deffered = self.qService.defer();
            self.httpService.post(url, data).then(function (result) {
                if (result.status === 200) {
                    deffered.resolve(result);
                }
                else {
                    deffered.reject(result);
                }
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        WebService.prototype.Put = function (url, data) {
            var self = this;
            var deffered = self.qService.defer();
            self.httpService.put(url, data).then(function (result) {
                if (result.status === 200) {
                    deffered.resolve(result);
                }
                else {
                    deffered.reject(result);
                }
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        WebService.prototype.PostUrlencodedForm = function (url, data) {
            var self = this;
            var deffered = self.qService.defer();
            var config = { headers: { 'Content-Type': "application/x-www-form-urlencoded" } };
            self.httpService.post(url, data, config).then(function (result) {
                if (result.status === 200) {
                    deffered.resolve(result);
                }
                else {
                    deffered.reject(result);
                }
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        WebService.prototype.Get = function (url) {
            var self = this;
            var deffered = self.qService.defer();
            self.httpService.get(url).then(function (result) {
                if (result.status === 200) {
                    deffered.resolve(result);
                }
                else {
                    deffered.reject(result);
                }
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        WebService.prototype.Delete = function (url) {
            var self = this;
            var deffered = self.qService.defer();
            self.httpService.delete(url).then(function (result) {
                if (result.status === 200) {
                    deffered.resolve(result);
                }
                else {
                    deffered.reject(result);
                }
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        WebService.$inject = ["$q", "$http"];
        return WebService;
    }());
    App.WebService = WebService;
    angular.module("app").service("WebService", WebService);
})(App || (App = {}));

var App;
(function (App) {
    "use strict";
    var UrlService = (function () {
        function UrlService() {
            var baseUrl = "";
            baseUrl = "/ShoppersZone";
            var baseApi = baseUrl + "/api";
            this.BaseUrl = baseUrl;
            this.SigninUrl = baseUrl + "/token";
            this.PermissionUrl = baseApi + "/Permission";
            this.RegisterUrl = baseApi + "/Account/Register";
            this.SideMenuUrl = baseApi + "/SideMenu";
            this.ProfileUrl = baseApi + "/Account/GetUserInfo";
            this.ChangePasswordUrl = baseApi + "/Account/ChangePassword";
            //business
            this.BarcodeImage = baseApi + "/BarcodeImage";
            this.productQuery = baseApi + "/ProductQuery";
            this.ProductQueryBarcode = this.productQuery + "/Barcode";
            this.ProductQueryData = this.productQuery + "/Data";
            this.ProductQueryCount = this.productQuery + "/Count";
            this.ProductQueryReport = this.productQuery + "/Report";
            this.Product = baseApi + "/Product";
            this.SupplierQuery = baseApi + "/SupplierQuery";
            this.Supplier = baseApi + "/Supplier";
            this.SupplierQueryData = this.SupplierQuery + "/Data";
            this.SupplierQueryCount = this.SupplierQuery + "/Count";
            this.SupplierQueryReport = this.SupplierQuery + "/Report";
            this.SupplierHistoryQuery = baseApi + "/SupplierHistoryQuery";
            this.Purchase = baseApi + "/Purchase";
            this.PurchaseQuery = baseApi + "/PurchaseQuery";
            this.PurchaseQueryData = this.PurchaseQuery + "/Data";
            this.PurchaseQueryCount = this.PurchaseQuery + "/Count";
            this.PurchaseQueryReport = this.PurchaseQuery + "/Report";
            this.PurchaseDetail = baseApi + "/PurchaseDetail";
            this.PurchaseDetailQuery = baseApi + "/PurchaseDetailQuery";
            this.Payment = baseApi + "/Payment";
            this.PaymentQuery = baseApi + "/PaymentQuery";
            this.PaymentQueryData = this.PaymentQuery + "/Data";
            this.PaymentQueryCount = this.PaymentQuery + "/Count";
            this.PaymentQueryReport = this.PaymentQuery + "/Report";
            this.Dropdown = baseApi + "/Dropdown";
            this.Sale = baseApi + "/Sale";
            this.saleQuery = baseApi + "/SaleQuery";
            this.SaleQueryData = this.saleQuery + "/Data";
            this.SaleQueryCount = this.saleQuery + "/Count";
            this.SaleQueryReport = this.saleQuery + "/Report";
            this.SaleDetail = baseApi + "/SaleDetail";
            this.SaleDetailQuery = baseApi + "/SaleDetailQuery";
            this.Bookmark = baseApi + "/Bookmark";
            this.BookmarkQuery = baseApi + "/BookmarkQuery";
            this.BookmarkQueryData = this.BookmarkQuery + "/Data";
            this.BookmarkQueryCount = this.BookmarkQuery + "/Count";
            this.ProductBookmark = baseApi + "/ProductBookmark";
            this.ProductBookmarkQuery = baseApi + "/ProductBookmarkQuery";
            this.ProductBookmarkQueryData = this.ProductBookmarkQuery + "/Data";
            this.ProductBookmarkQueryCount = this.ProductBookmarkQuery + "/Count";
            this.StockQuery = baseApi + "/StockQuery";
            this.StockQueryData = this.StockQuery + "/Data";
            this.StockQueryCount = this.StockQuery + "/Count";
            this.CustomerQuery = baseApi + "/CustomerQuery";
            this.Customer = baseApi + "/Customer";
            this.CustomerQueryBarcode = this.CustomerQuery + "/Barcode";
            this.CustomerQueryData = this.CustomerQuery + "/Data";
            this.CustomerQueryCount = this.CustomerQuery + "/Count";
            this.CustomerQueryReport = this.CustomerQuery + "/Report";
            this.CustomerHistoryQuery = baseApi + "/CustomerHistoryQuery";
        }
        return UrlService;
    }());
    App.UrlService = UrlService;
    angular.module("app").service("UrlService", UrlService);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SaveService = (function () {
        function SaveService($q, urlService, webService, auth) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.Auth = auth;
        }
        SaveService.prototype.Save = function (data, url) {
            var self = this;
            var deferred = self.Q.defer();
            data.Created = new Date().toDateString();
            data.Modified = new Date().toDateString();
            data.CreatedBy = self.Auth.AccountInfo.UserName;
            data.ModifiedBy = self.Auth.AccountInfo.UserName;
            self.Web.Post(url, data).then(function (result) {
                var response = new App.BaseResponse(true, result.data, "Success");
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        SaveService.prototype.Update = function (data, url) {
            var self = this;
            var deffered = self.Q.defer();
            data.Modified = new Date().toDateString();
            data.ModifiedBy = self.Auth.AccountInfo.UserName;
            self.Web.Put(url, data).then(function (result) {
                var response = new App.BaseResponse(true, result.data, "Success");
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        SaveService.prototype.Delete = function (id, url) {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Delete(url + "?id=" + id).then(function (result) {
                var response = new App.BaseResponse(true, result.data, "Success");
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        SaveService.$inject = ["$q", "UrlService", "WebService", "AuthService"];
        return SaveService;
    }());
    App.SaveService = SaveService;
    angular.module("app").service("SaveService", SaveService);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SearchService = (function () {
        function SearchService($q, urlService, webService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.Id = undefined;
        }
        SearchService.prototype.Search = function (request, url) {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Post(url, request).then(function (result) {
                var response = new App.SearchResponse(result.data);
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        SearchService.prototype.Get = function (url) {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Get(url).then(function (result) {
                var response = result.data;
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        SearchService.prototype.Download = function (url) {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Get(url).then(function (result) {
                deffered.resolve(result);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        SearchService.$inject = ["$q", "UrlService", "WebService"];
        return SearchService;
    }());
    App.SearchService = SearchService;
    angular.module("app").service("SearchService", SearchService);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var DropdownService = (function () {
        function DropdownService($q, urlService, webService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
        }
        DropdownService.prototype.Load = function (name) {
            var self = this;
            var deffered = self.Q.defer();
            var url = self.Url.Dropdown + "?name=" + name;
            self.Web.Get(url).then(function (result) {
                var response = new App.SearchResponse(result.data);
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        DropdownService.$inject = ["$q", "UrlService", "WebService"];
        return DropdownService;
    }());
    App.DropdownService = DropdownService;
    angular.module("app").service("DropdownService", DropdownService);
    var AppModalService = (function () {
        function AppModalService() {
        }
        AppModalService.$inject = ["$uibModal"];
        return AppModalService;
    }());
    App.AppModalService = AppModalService;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    "use strict";
    var Entity = (function () {
        function Entity() {
        }
        return Entity;
    }());
    App.Entity = Entity;
    var PermissionRequest = (function () {
        function PermissionRequest(name) {
            this.Name = name;
        }
        return PermissionRequest;
    }());
    App.PermissionRequest = PermissionRequest;
    var Notification = (function () {
        function Notification() {
        }
        return Notification;
    }());
    App.Notification = Notification;
    var DataRequest = (function () {
        function DataRequest() {
        }
        DataRequest.prototype.getBaseQueryString = function () {
            if (this.Page == null)
                this.Page = 1;
            var queryString = "?keyword=" + this.Keyword + "&orderBy=" + this.OrderBy + "&page=" + this.Page;
            return queryString;
        };
        return DataRequest;
    }());
    App.DataRequest = DataRequest;
    var SearchRequest = (function (_super) {
        __extends(SearchRequest, _super);
        function SearchRequest(keyword, orderBy, isAsc, parentId) {
            _super.call(this);
            this.Keyword = keyword;
            this.OrderBy = orderBy;
            this.IsAscending = isAsc;
            this.ParentId = parentId;
            this.Page = 1;
        }
        return SearchRequest;
    }(DataRequest));
    App.SearchRequest = SearchRequest;
    var DetailRequest = (function (_super) {
        __extends(DetailRequest, _super);
        function DetailRequest(id) {
            _super.call(this);
            this.Id = id;
        }
        DetailRequest.prototype.GetQueryString = function () {
            return "?id=" + this.Id;
        };
        return DetailRequest;
    }(DataRequest));
    App.DetailRequest = DetailRequest;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    "use strict";
    var BaseResponse = (function () {
        function BaseResponse(isSuccess, data, message) {
            this.IsSuccess = isSuccess;
            this.Data = data;
            this.Message = message == null ? "Success" : message;
        }
        return BaseResponse;
    }());
    App.BaseResponse = BaseResponse;
    var PermissionResponse = (function (_super) {
        __extends(PermissionResponse, _super);
        function PermissionResponse() {
            _super.apply(this, arguments);
        }
        return PermissionResponse;
    }(BaseResponse));
    App.PermissionResponse = PermissionResponse;
    var ErrorResponse = (function (_super) {
        __extends(ErrorResponse, _super);
        function ErrorResponse() {
            _super.apply(this, arguments);
        }
        return ErrorResponse;
    }(BaseResponse));
    App.ErrorResponse = ErrorResponse;
    var SearchResponse = (function (_super) {
        __extends(SearchResponse, _super);
        function SearchResponse(data) {
            _super.call(this, true, data, "Success");
            this.Models = data;
        }
        return SearchResponse;
    }(BaseResponse));
    App.SearchResponse = SearchResponse;
})(App || (App = {}));

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
var App;
(function (App) {
    var AuthService = (function () {
        function AuthService($q, localStorageService, urlService, webService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.localStorageService = localStorageService;
        }
        AuthService.prototype.Signin = function (request) {
            var self = this;
            self.Signout();
            var deffered = self.Q.defer();
            var data = "username=" + request.Email + "&password=" + request.Password + "&grant_type=password";
            self.Web.PostUrlencodedForm(self.Url.SigninUrl, data).then(function (result) {
                self.AccountInfo = new App.AccountInfo();
                self.AccountInfo.UserName = result.data.userName;
                self.AccountInfo.RoleName = result.data.roleName;
                self.AccountInfo.AuthToken = result.data.AuthToken;
                self.AccountInfo.AccessToken = result.data.access_token;
                self.AccountInfo.IsAuth = true;
                // self.localStorageService.set("authorizationData", self.AccountInfo);
                self.Web.Get(self.Url.SideMenuUrl).then(function (result) {
                    console.log(result);
                    self.AccountInfo.Routes = result.data;
                    deffered.resolve(self.AccountInfo);
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        AuthService.prototype.Signout = function () {
            this.localStorageService.remove("authorizationData");
            this.AccountInfo = null;
        };
        AuthService.prototype.FillAuthData = function () {
            var authData = this.localStorageService.get("authorizationData");
            if (authData) {
                this.AccountInfo = (authData);
            }
        };
        AuthService.prototype.IsSignedIn = function () {
            if (this.AccountInfo == null) {
                return false;
            }
            return this.AccountInfo.IsAuth;
        };
        AuthService.prototype.LoadMenu = function () {
            var self = this;
            //self.AccountInfo.Routes = result.data.Routes;
            self.Web.Get(self.Url.SideMenuUrl).then(function (result) {
                console.log(result);
                self.AccountInfo.Routes = result.data;
            }, function (error) {
                console.log(error);
            });
        };
        AuthService.prototype.Register = function (request) {
            var self = this;
            self.Signout();
            var deffered = self.Q.defer();
            self.Web.Post(self.Url.RegisterUrl, request).then(function (result) {
                var response = new App.RegisterResponse(true, result.data, "Success");
                response.UserName = result.data.userName;
                response.IsRegistered = true;
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        AuthService.$inject = ["$q", "localStorageService", "UrlService", "WebService"];
        return AuthService;
    }());
    App.AuthService = AuthService;
    angular.module("app").service("AuthService", AuthService);
    var PermissionService = (function () {
        function PermissionService($q, securityUrlService, webService) {
            this.q = $q;
            this.securityUrlService = securityUrlService;
            this.web = webService;
        }
        PermissionService.prototype.IsAllowed = function (request) {
            var self = this;
            var deffered = self.q.defer();
            self.web.Post(self.securityUrlService.PermissionUrl, new App.PermissionRequest(request))
                .then(function (result) {
                var response = new App.PermissionResponse(true, result.data, "Success");
                response.IsAllowed = true;
                deffered.resolve(response);
            }, function (error) {
                deffered.reject(error);
            });
            return deffered.promise;
        };
        PermissionService.$inject = ["$q", "UrlService", "WebService"];
        return PermissionService;
    }());
    App.PermissionService = PermissionService;
    angular.module("app").service("permissionService", PermissionService);
})(App || (App = {}));

var App;
(function (App) {
    var SigninRequest = (function () {
        function SigninRequest(email, password) {
            this.Email = email;
            this.Password = password;
        }
        return SigninRequest;
    }());
    App.SigninRequest = SigninRequest;
    var RegisterRequest = (function () {
        function RegisterRequest(email, password, confirmPassword, firstName, lastName, phone) {
            this.Email = email;
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Phone = phone;
        }
        return RegisterRequest;
    }());
    App.RegisterRequest = RegisterRequest;
    var AccountInfo = (function () {
        function AccountInfo() {
        }
        return AccountInfo;
    }());
    App.AccountInfo = AccountInfo;
    var RegisterResponse = (function () {
        function RegisterResponse(isSuccess, data, message) {
            this.IsSuccess = isSuccess;
            this.data = data;
            this.Message = message == null ? "Success" : message;
        }
        return RegisterResponse;
    }());
    App.RegisterResponse = RegisterResponse;
})(App || (App = {}));

angular.module('app').directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });