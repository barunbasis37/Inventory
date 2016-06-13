// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var ProductsController = (function () {
        function ProductsController($location, url, search, save, authService) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService;
            this.Activate();
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
        }
        ProductsController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.Product();
            this.ProductPriceViewModel = new App.ProductPriceViewModel();
            this.BarcodeUrl = "";
            this.IsUpdateMode = false;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.Search();
        };
        ProductsController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        ProductsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                self.Models = response.Models;
                self.ProductPriceViewModel = new App.ProductPriceViewModel();
                for (var i = 0; i < self.Models.length; i++) {
                    self.ProductPriceViewModel.CostPriceTotal += self.Models[i].CostPrice;
                    self.ProductPriceViewModel.SalePriceTotal += self.Models[i].SalePrice;
                    self.ProductPriceViewModel.Total += self.Models[i].OnHand * self.Models[i].CostPrice;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        ProductsController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        ProductsController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        ProductsController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Generate = function () {
            var self = this;
            var successCallback = function (response) {
                self.BarcodeUrl = "/BarcodeImages/" + self.Model.Id + ".png";
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            var url = self.Url.BarcodeImage + "?id=" + this.Model.Id;
            window.open(url, "_blank");
            //self.SearchService.GetDetail(url).then(successCallback, errorCallback);
        };
        ProductsController.prototype.DeleteImage = function () {
            var self = this;
            var successCallback = function (response) {
                self.BarcodeUrl = null;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(self.Model.Id, self.Url.BarcodeImage).then(successCallback, errorCallback);
        };
        ProductsController.prototype.GetBarcode = function () {
            var self = this;
            var successCallback = function (response) {
                self.Model.BarCode = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.ProductQueryBarcode).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.ProductQueryReport, "_blank", "");
        };
        ProductsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService"];
        return ProductsController;
    })();
    App.ProductsController = ProductsController;
    angular.module("app").controller("ProductsController", ProductsController);
})(App || (App = {}));
