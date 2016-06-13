// Install the angularjs.TypeScript.DefinitelyTyped NuGet package

module App {
    "use strict";

    export class PaymentsController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        Models: Payment[];
        Model: Payment;
        TotalAmount:number;
        DropdownService: DropdownService;
        Dropdown: Object;
        private authService: AuthService;
        User: AccountInfo;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService", "AuthService","DropdownService"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, authService: AuthService, dropdown: DropdownService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService; 
            this.DropdownService = dropdown;
            this.IsUpdateMode = false;
            this.Activate();

            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }

        }

        Activate() {
            console.log('i m in PaymentsController');
            this.Models = [];
            this.Model = new Payment();
            this.TotalAmount = 0;
            this.Dropdown = new Object();
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            
            this.Search();
            this.LoadDropdown("supplier");
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
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

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Models = <any>response.Models;
                self.TotalAmount = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalAmount += self.Models[i].Amount;
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryData).then(<any>successCallback, errorCallback);


            var countSuccessCallback = (response: SearchResponse): void => {

                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);

            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }

        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.Model = new Payment();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            
            self.SaveService.Save(self.Model, self.Url.Payment).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;

            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new Payment();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };

            self.SaveService.Update(self.Model, self.Url.Payment).then(<any>successCallback, errorCallback);
        }

        Edit(p: Payment): void {
            this.Model = p;
            this.IsUpdateMode = true;
        }

        Delete(id: string): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new Payment();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };
            self.SaveService.Delete(id, self.Url.Payment).then(successCallback, errorCallback);
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
            window.open(self.Url.PaymentQueryReport, "_blank", "");
        }
    }

    angular.module("app").controller("PaymentsController", PaymentsController);
}