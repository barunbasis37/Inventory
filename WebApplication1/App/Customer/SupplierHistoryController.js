var App;
(function (App) {
    var CustomerHistoryController = (function () {
        function CustomerHistoryController($location, url, search, save, dropdownService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }
        CustomerHistoryController.prototype.Activate = function () {
            this.Model = new App.CustomerHistory();
            this.Customer = new App.Customer();
            var customer = this.stateParams["customer"];
            if (customer != undefined) {
                this.Customer = customer;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False");
                this.SearchRequest.Id = customer.Id;
            }
            else {
                alert("Invalid customer");
                this.stateService.go('root.customers');
            }
            this.QueryUrl = this.Url.CustomerHistoryQuery;
            this.Search();
        };
        CustomerHistoryController.prototype.Search = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                _this.Model = (response.Data);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
        };
        CustomerHistoryController.prototype.LoadDropdown = function (name) {
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
        CustomerHistoryController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return CustomerHistoryController;
    }());
    App.CustomerHistoryController = CustomerHistoryController;
    angular.module("app").controller("CustomerHistoryController", CustomerHistoryController);
})(App || (App = {}));
//# sourceMappingURL=SupplierHistoryController.js.map