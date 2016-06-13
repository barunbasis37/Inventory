module App{
    export class CustomerHistoryController {

        SearchService: SearchService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        Model: CustomerHistory;
        Dropdown: Object;
        DropdownService: DropdownService;
        QueryUrl: string;
        Customer: Customer;

        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, dropdownService: DropdownService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }

        Activate() {
            this.Model = new CustomerHistory();
            this.Customer = new Customer();
            var customer = this.stateParams["customer"];
            if (customer != undefined) {
                this.Customer = customer;
                this.SearchRequest = new SearchRequest("", "Modified", "False");
                this.SearchRequest.Id = customer.Id;
            } else {
                alert("Invalid customer");
                this.stateService.go('root.customers');
            }
            this.QueryUrl = this.Url.CustomerHistoryQuery;
            this.Search();       
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                this.Model = (response.Data);
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(<any>successCallback, errorCallback);
        }           

        LoadDropdown(name: string): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Dropdown[name] = response.Models;
                console.log(self.Dropdown);
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.DropdownService.Load(name).then(<any>successCallback, errorCallback);
        }
    }
    angular.module("app").controller("CustomerHistoryController", CustomerHistoryController);

}