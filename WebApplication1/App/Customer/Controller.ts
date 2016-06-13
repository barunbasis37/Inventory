// Install the angularjs.TypeScript.DefinitelyTyped NuGet package


module App {
    "use strict";
    import M = App.Customer;

    export class CustomersController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        TotalDue:number;
        Models: M[];
        Model: M;
        CommandUrl: string;
        QueryUrl: string;
        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;
        private authService: AuthService;
        User: AccountInfo;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService","AuthService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, authService: AuthService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.authService = authService; 
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();

            // Arif Added Code - Start
            var acc = this.authService.AccountInfo;
            console.log(acc);
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
            // Arif Added Code - End
        }

        Activate() {            
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.TotalDue = 0;
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Customer;
            this.QueryUrl = this.Url.CustomerQueryData;
            this.Search();
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
               // console.log(response);
                self.Models = <any>response.Models;
                self.TotalDue = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalDue += self.Models[i].Point;
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(<any>successCallback, errorCallback);

            var countSuccessCallback = (response: SearchResponse): void => {

                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);

            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.CustomerQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }
        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }
        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.Activate();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                alert('Could not save customer info. Please check the values carefully.');
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

        Edit(p: M): void {
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

        History(p: Customer): void {
            var self = this;
            self.stateService.go('root.customerhistory', { customer: { Id: p.Id, Name: p.Name, Address: p.Address, Phone: p.Phone, MembarshipCardNo: p.MembarshipCardNo } });
       }

        Report(): void {
            var self = this;           
            window.open(self.Url.CustomerQueryReport, "_blank", "");
        }

        GetBarcode(): void {
            var self = this;
            var successCallback = (response: any): void => {
                self.Model.MembarshipCardNo = response;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SearchService.Get(self.Url.CustomerQueryBarcode).then(successCallback, errorCallback);
        }
    }

    angular.module("app").controller("CustomersController", CustomersController);


  

}