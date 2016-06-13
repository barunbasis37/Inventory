var App;
(function (App) {
    var StockReportController = (function () {
        function StockReportController($location, $uibModal, url, search) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.Activate();
        }
        StockReportController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.StockViewModel();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
        };
        StockReportController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Model = response.Data;
                self.Models = self.Model.StockDetailViewModels;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        StockReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        StockReportController.prototype.UpdateDate = function () {
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
        StockReportController.$inject = ["$location", "$uibModal", "UrlService", "SearchService"];
        return StockReportController;
    })();
    App.StockReportController = StockReportController;
    angular.module("app").controller("StockReportController", StockReportController);
})(App || (App = {}));
