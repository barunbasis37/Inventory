var App;
(function (App) {
    var SalesReportController = (function () {
        function SalesReportController($location, $uibModal, url, search, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();
        }
        SalesReportController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.SaleReport();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
        };
        SalesReportController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = (response.Models);
                self.Model = new App.SaleReport();
                for (var i = 0; i < self.Models.length; i++) {
                    if (self.Models[i].SaleType === 'Cash') {
                        self.Model.CashTotal += self.Models[i].Total;
                    }
                    else {
                        self.Model.CardTotal += self.Models[i].Total;
                    }
                    self.Model.ItemTotal += self.Models[i].ItemTotal;
                    self.Model.DiscountTotal += self.Models[i].Discount;
                    self.Model.Total += self.Models[i].Total;
                    self.Model.CostPrice += self.Models[i]["CostPrice"];
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        SalesReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        SalesReportController.prototype.AddDetail = function (p) {
            var self = this;
            self.stateService.go('root.saledetails', { sale: { Id: p.Id, Memo: p.Memo, Total: p.Total } });
        };
        SalesReportController.prototype.UpdateDate = function () {
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
        SalesReportController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.SaleQueryReport, "_blank", "");
        };
        SalesReportController.$inject = ["$location", "$uibModal", "UrlService", "SearchService", "$state", "$stateParams"];
        return SalesReportController;
    })();
    App.SalesReportController = SalesReportController;
    angular.module("app").controller("SalesReportController", SalesReportController);
})(App || (App = {}));
