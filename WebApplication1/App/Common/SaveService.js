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
    })();
    App.SaveService = SaveService;
    angular.module("app").service("SaveService", SaveService);
})(App || (App = {}));
