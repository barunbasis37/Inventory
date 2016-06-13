// Install the angularjs.TypeScript.DefinitelyTyped NuGet package

module App {
    "use strict";

    export class PurchasesController {
        SearchService: SearchService;
        SaveService: SaveService;
        DropdownService: DropdownService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        TotalPurchase:number;
        Models: Purchase[];
        Model: Purchase;
        Dropdown: Object;
        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;
        private authService: AuthService;
        User: AccountInfo;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "DropdownService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, authService: AuthService, dropdown: DropdownService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService;
            this.DropdownService = dropdown;
            this.IsUpdateMode = false;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();

            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
        }

        Activate() {
            console.log('i m in PurchasesController');
            this.Models = [];
           // this.Suppliers = [];
            this.Dropdown = new Object();
            this.Model = new Purchase();
            this.TotalPurchase = 0;
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            
            this.Search();
            this.LoadDropdown("supplier");
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
        }

        LoadDropdown(name:string): void {
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

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Models = <any>response.Models;
                self.TotalPurchase = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalPurchase += self.Models[i].Total;
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PurchaseQueryData).then(<any>successCallback, errorCallback);

            var countSuccessCallback = (response: SearchResponse): void => {

                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);

            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PurchaseQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }
        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }
        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.Model = new Purchase();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Purchase).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;

            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new Purchase();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };

            self.SaveService.Update(self.Model, self.Url.Purchase).then(<any>successCallback, errorCallback);
        }

        Edit(p: Purchase): void {
            this.Model = p;
            this.IsUpdateMode = true;
        }

        Delete(id: string): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new Purchase();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };
            self.SaveService.Delete(id, self.Url.Purchase).then(successCallback, errorCallback);
        }

        AddDetail(p: Purchase): void {
            var self = this;

            self.stateService.go('root.purchasedetails', { purchase: {Id: p.Id, Memo: p.Memo, Total: p.Total} });
        }
        UpdateDate(): void {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        }

        Report(): void {
            var self = this;
            window.open(self.Url.PurchaseQueryReport, "_blank", "");
        }
    }

    angular.module("app").controller("PurchasesController", PurchasesController);
}