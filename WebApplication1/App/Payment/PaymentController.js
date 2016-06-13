// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var PaymentsController = (function () {
        function PaymentsController($location, url, search, save, authService, dropdown) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService;
            this.DropdownService = dropdown;
            this.IsUpdateMode = false;
            this.Activate();
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
        }
        PaymentsController.prototype.Activate = function () {
            console.log('i m in PaymentsController');
            this.Models = [];
            this.Model = new App.Payment();
            this.TotalAmount = 0;
            this.Dropdown = new Object();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
            this.LoadDropdown("supplier");
        };
        PaymentsController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        PaymentsController.prototype.LoadDropdown = function (name) {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Dropdown[name] = response.Models;
                console.log(self.Dropdown);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.DropdownService.Load(name).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.TotalAmount = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalAmount += self.Models[i].Amount;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        PaymentsController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        PaymentsController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        PaymentsController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.UpdateDate = function () {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        };
        PaymentsController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.PaymentQueryReport, "_blank", "");
        };
        PaymentsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "DropdownService"];
        return PaymentsController;
    })();
    App.PaymentsController = PaymentsController;
    angular.module("app").controller("PaymentsController", PaymentsController);
})(App || (App = {}));
