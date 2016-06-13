var App;
(function (App) {
    var HomeController = (function () {
        function HomeController($state, $rootScope, authService) {
            this.IsSignedIn = false;
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.Activate();
            });
            self.rootScopeService.$on("SignedOut", function (event, args) {
                self.Activate();
                self.loadUser();
            });
            self.Activate();
        }
        HomeController.prototype.Activate = function () {
            var self = this;
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
            }
            else {
                self.IsSignedIn = false;
            }
        };
        HomeController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        };
        HomeController.$inject = ["$state", "$rootScope", "AuthService"];
        return HomeController;
    })();
    App.HomeController = HomeController;
    angular.module('app').controller('HomeController', HomeController);
})(App || (App = {}));
