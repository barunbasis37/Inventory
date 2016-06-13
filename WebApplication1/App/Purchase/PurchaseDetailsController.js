var App;
(function (App) {
    var PurchaseDetailsController = (function () {
        function PurchaseDetailsController($location, url, search, save, dropdownService, $state, $stateParams) {
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
        PurchaseDetailsController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new App.PurchaseDetail();
            this.Products = [];
            this.Product = new App.Product();
            this.CommandUrl = this.Url.PurchaseDetail;
            this.QueryUrl = this.Url.PurchaseDetailQuery;
            var purchase = this.stateParams["purchase"];
            if (purchase != undefined) {
                this.Parent = purchase;
                this.Model.PurchaseId = purchase.Id;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False", this.Model.PurchaseId);
            }
            else {
                alert("Invalid purchase");
                this.stateService.go('root.purchases');
            }
            this.Search();
            this.LoadDropdown("product");
            this.LoadDropdown('supplier');
        };
        PurchaseDetailsController.prototype.Search = function () {
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
        PurchaseDetailsController.prototype.SearchProduct = function () {
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
        PurchaseDetailsController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        PurchaseDetailsController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.LoadDropdown = function (name) {
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
        PurchaseDetailsController.prototype.Select = function (p) {
            console.log(p);
            this.Model.ProductId = p.Id;
            this.Product = p;
            this.Model.Price = p.CostPrice;
            console.log(this.Model);
        };
        PurchaseDetailsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return PurchaseDetailsController;
    })();
    App.PurchaseDetailsController = PurchaseDetailsController;
    angular.module("app").controller("PurchaseDetailsController", PurchaseDetailsController);
})(App || (App = {}));
