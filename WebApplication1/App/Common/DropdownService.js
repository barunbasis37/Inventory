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
    })();
    App.DropdownService = DropdownService;
    angular.module("app").service("DropdownService", DropdownService);
    var AppModalService = (function () {
        function AppModalService() {
        }
        AppModalService.$inject = ["$uibModal"];
        return AppModalService;
    })();
    App.AppModalService = AppModalService;
})(App || (App = {}));
