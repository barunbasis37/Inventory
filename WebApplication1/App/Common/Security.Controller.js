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
    })();
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
    })();
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
    })();
    App.RegisterController = RegisterController;
    angular.module("app").controller("RegisterController", RegisterController);
})(App || (App = {}));
