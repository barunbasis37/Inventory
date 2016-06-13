var App;
(function (App) {
    var StockoutReportController = (function () {
        function StockoutReportController($location, url, search, save) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.Activate();
        }
        StockoutReportController.prototype.Activate = function () {
            this.Models = [];
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.SearchRequest["MaxQuantity"] = 10;
            this.Search();
            this.ProductPriceViewModel = new App.ProductPriceViewModel();
        };
        StockoutReportController.prototype.Search = function () {
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
        StockoutReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        StockoutReportController.$inject = ["$location", "UrlService", "SearchService", "SaveService"];
        return StockoutReportController;
    })();
    App.StockoutReportController = StockoutReportController;
    angular.module("app").controller("StockoutReportController", StockoutReportController);
})(App || (App = {}));
