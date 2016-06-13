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
    })();
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
    })();
    App.PermissionService = PermissionService;
    angular.module("app").service("permissionService", PermissionService);
})(App || (App = {}));
