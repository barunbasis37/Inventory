// Install the angularjs.TypeScript.DefinitelyTyped NuGet package

module App {
    "use strict";

    export class ProductsController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        Models: Product[];
        Model: Product;
        ProductPriceViewModel: ProductPriceViewModel;
        BarcodeUrl : string;
        private authService: AuthService;
        User: AccountInfo;
        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService", "AuthService"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, authService: AuthService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;   
            this.authService = authService;        
            this.Activate();
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
        }

        Activate() {           
            this.Models = [];
            this.Model = new Product();
            this.ProductPriceViewModel = new ProductPriceViewModel();
            this.BarcodeUrl = "";
            this.IsUpdateMode = false;
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.Search();
        }
        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
        }
        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
               
                self.Models = <any> response.Models;
                self.ProductPriceViewModel = new ProductPriceViewModel();
                for (var i = 0; i < self.Models.length; i++) {
                    self.ProductPriceViewModel.CostPriceTotal += self.Models[i].CostPrice;
                    self.ProductPriceViewModel.SalePriceTotal += self.Models[i].SalePrice;
                    self.ProductPriceViewModel.Total += self.Models[i].OnHand * self.Models[i].CostPrice;
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(<any>successCallback, errorCallback);

            var countSuccessCallback = (response: SearchResponse): void => {
             
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
                
            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }

        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
              
                self.Model = new Product();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Save(self.Model, self.Url.Product).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;

            var successCallback = (response: BaseResponse): void => {
              
                self.IsUpdateMode = false;
                self.Model = new Product();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };

            self.SaveService.Update(self.Model, self.Url.Product).then(<any>successCallback, errorCallback);
        }

        Edit(p: Product): void {
            this.Model = p;
            this.IsUpdateMode = true;
        }

        Delete(id:string): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
               
                self.IsUpdateMode = false;
                self.Model = new Product();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };
            self.SaveService.Delete(id, self.Url.Product).then(successCallback, errorCallback);
        }

        Generate(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.BarcodeUrl = "/BarcodeImages/"+self.Model.Id+".png";
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            var url = self.Url.BarcodeImage + "?id=" + this.Model.Id;
            window.open(url, "_blank");
            //self.SearchService.GetDetail(url).then(successCallback, errorCallback);
        }

        DeleteImage(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
              
                self.BarcodeUrl = null;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Delete(self.Model.Id,self.Url.BarcodeImage).then(successCallback, errorCallback);
        }

        GetBarcode(): void {
            var self = this;
            var successCallback = (response: any): void => {
                self.Model.BarCode = response;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SearchService.Get(self.Url.ProductQueryBarcode).then(successCallback, errorCallback);
        }

        Report(): void {
            var self = this;           
            window.open(self.Url.ProductQueryReport, "_blank","");
        }

    }

    angular.module("app").controller("ProductsController", ProductsController);



}