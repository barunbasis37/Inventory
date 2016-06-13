module App {

    export class PurchaseDetailsController {

        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        Models: Object[];
        Model: PurchaseDetail;
        Parent: Purchase;
        Products:Product[];
        Product: Product;
        Dropdown: Object;
        DropdownService: DropdownService;
        CommandUrl: string;
        QueryUrl: string;
        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService","DropdownService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, dropdownService: DropdownService, $state: angular.ui.IStateService,  $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }

        Activate() {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new PurchaseDetail();
            this.Products = [];
            this.Product = new Product();
            this.CommandUrl = this.Url.PurchaseDetail;
            this.QueryUrl = this.Url.PurchaseDetailQuery;
            var purchase = this.stateParams["purchase"];
            if (purchase != undefined) {
                this.Parent = purchase;
                this.Model.PurchaseId = purchase.Id;
                this.SearchRequest = new SearchRequest("", "Modified", "False", this.Model.PurchaseId);
            } else {
                alert("Invalid purchase");
                this.stateService.go('root.purchases');
            }
            this.Search();
            this.LoadDropdown("product");
            this.LoadDropdown('supplier');
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Models = response.Models;
                self.Parent.Total = 0;

                for (var i = 0; i < self.Models.length; i++) {
                    var m = self.Models[i];
                    self.Parent.Total += parseFloat(m["Total"]);
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(<any>successCallback, errorCallback);
        }

        SearchProduct(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Products = <any>(response.Models);                
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(<any>successCallback, errorCallback);
        }

        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.Activate();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Save(self.Model, self.CommandUrl).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.Activate();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Update(self.Model, self.CommandUrl).then(<any>successCallback, errorCallback);
        }

        Edit(p: PurchaseDetail): void {
            this.Model = p;
            this.IsUpdateMode = true;
        }

        Delete(id: string): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.Activate();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
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

        Select(p : Product): void {
            console.log(p);
            this.Model.ProductId = p.Id;
            this.Product = p;
            this.Model.Price = p.CostPrice;
            console.log(this.Model);
        }
    }
    angular.module("app").controller("PurchaseDetailsController", PurchaseDetailsController);

}