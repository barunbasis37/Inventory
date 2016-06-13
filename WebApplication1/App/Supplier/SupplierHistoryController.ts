module App{
    export class SupplierHistoryController {

        SearchService: SearchService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        Model: SupplierHistory;
        Dropdown: Object;
        DropdownService: DropdownService;
        QueryUrl: string;
        Supplier: Supplier;

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
            this.Model = new SupplierHistory();
            this.Supplier = new Supplier();
            var supplier = this.stateParams["supplier"];
            if (supplier != undefined) {
                this.Supplier = supplier;
                this.SearchRequest = new SearchRequest("", "Modified", "False");
                this.SearchRequest.Id = supplier.Id;
            } else {
                alert("Invalid supplier");
                this.stateService.go('root.suppliers');
            }
            this.QueryUrl = this.Url.SupplierHistoryQuery;
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
    angular.module("app").controller("SupplierHistoryController", SupplierHistoryController);

}