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
    })();
    App.SearchService = SearchService;
    angular.module("app").service("SearchService", SearchService);
})(App || (App = {}));
