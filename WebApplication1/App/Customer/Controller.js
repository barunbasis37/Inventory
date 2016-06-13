// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var M = App.Customer;
    var CustomersController = (function () {
        function CustomersController($location, url, search, save, authService, $state, $stateParams) {
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
        CustomersController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.TotalDue = 0;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Customer;
            this.QueryUrl = this.Url.CustomerQueryData;
            this.Search();
        };
        CustomersController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        CustomersController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                // console.log(response);
                self.Models = response.Models;
                self.TotalDue = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalDue += self.Models[i].Point;
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
            self.SearchService.Search(self.SearchRequest, self.Url.CustomerQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        CustomersController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        CustomersController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
                alert('Could not save customer info. Please check the values carefully.');
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        CustomersController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.History = function (p) {
            var self = this;
            self.stateService.go('root.customerhistory', { customer: { Id: p.Id, Name: p.Name, Address: p.Address, Phone: p.Phone, MembarshipCardNo: p.MembarshipCardNo } });
        };
        CustomersController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.CustomerQueryReport, "_blank", "");
        };
        CustomersController.prototype.GetBarcode = function () {
            var self = this;
            var successCallback = function (response) {
                self.Model.MembarshipCardNo = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.CustomerQueryBarcode).then(successCallback, errorCallback);
        };
        CustomersController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "$state", "$stateParams"];
        return CustomersController;
    })();
    App.CustomersController = CustomersController;
    angular.module("app").controller("CustomersController", CustomersController);
})(App || (App = {}));
