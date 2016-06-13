// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var M = App.Supplier;
    var SuppliersController = (function () {
        function SuppliersController($location, url, search, save, authService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();
            // Arif Added Code - Start
            var acc = this.authService.AccountInfo;
            console.log(acc);
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
            // Arif Added Code - End
        }
        SuppliersController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.TotalDue = 0;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Supplier;
            this.QueryUrl = this.Url.SupplierQueryData;
            this.Search();
        };
        SuppliersController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        SuppliersController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.TotalDue = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalDue += self.Models[i].Due;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SupplierQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        SuppliersController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        SuppliersController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        SuppliersController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.History = function (p) {
            var self = this;
            self.stateService.go('root.supplierhistory', { supplier: { Id: p.Id, Name: p.Name, Address: p.Address, Phone: p.Phone, Company: p.CompanyName } });
        };
        SuppliersController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.SupplierQueryReport, "_blank", "");
        };
        SuppliersController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "$state", "$stateParams"];
        return SuppliersController;
    }());
    App.SuppliersController = SuppliersController;
    angular.module("app").controller("SuppliersController", SuppliersController);
})(App || (App = {}));
