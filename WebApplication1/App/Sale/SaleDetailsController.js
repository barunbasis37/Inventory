var App;
(function (App) {
    var SaleDetailsController = (function () {
        function SaleDetailsController($location, url, search, save, dropdownService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }
        SaleDetailsController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new App.SaleDetail();
            this.Products = [];
            this.Product = new App.Product();
            this.CommandUrl = this.Url.SaleDetail;
            this.QueryUrl = this.Url.SaleDetailQuery;
            var sale = this.stateParams["sale"];
            if (sale != undefined) {
                this.Parent = sale;
                this.Model.SaleId = sale.Id;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False", this.Model.SaleId);
            }
            else {
                alert("Invalid selection");
                this.stateService.go('root.sales-report');
            }
            this.Search();
        };
        SaleDetailsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.Parent.Total = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    var m = self.Models[i];
                    self.Parent.Total += parseFloat(m["Total"]);
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.SearchProduct = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Products = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        SaleDetailsController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.LoadDropdown = function (name) {
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
        SaleDetailsController.prototype.Select = function (p) {
            console.log(p);
            this.Model.ProductId = p.Id;
            this.Product = p;
            this.Model.Price = p.CostPrice;
            console.log(this.Model);
        };
        SaleDetailsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return SaleDetailsController;
    })();
    App.SaleDetailsController = SaleDetailsController;
    angular.module("app").controller("SaleDetailsController", SaleDetailsController);
})(App || (App = {}));
