// Install the angularjs.TypeScript.DefinitelyTyped NuGet package


module App {
    "use strict";
    import M = App.Bookmark;

    export class BookmarkController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        Models: Object[];
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

            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.loadUser();
            }
        }

        Activate() {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Bookmark;
            this.QueryUrl = this.Url.BookmarkQueryData;
            this.Search();
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Models = response.Models;
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
            self.SearchService.Search(self.SearchRequest, self.Url.BookmarkQueryCount).then(<any>countSuccessCallback, countErrorCallback);
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

        History(p: Bookmark): void {
            var self = this;
            self.stateService.go('root.productbookmark', { bookmark: { Id: p.Id } });
        }
    }

    angular.module("app").controller("BookmarkController", BookmarkController);

    export class ProductBookmarkController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        IsUpdateMode: boolean;
        Models: ProductBookmark[];
        Model: ProductBookmark;
        Bookmark: Bookmark;
        

        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.SaveService = save;
            this.Activate();
        }

        Activate() {
        
            this.Bookmark = new Bookmark();
            var bookmark = this.stateParams["bookmark"];
            if (bookmark != undefined) {
                this.Bookmark = bookmark;
                this.SearchRequest = new SearchRequest("", "Modified", "False");
                this.SearchRequest.ParentId = bookmark.Id;
                this.SearchRequest.Page = 1;
            } else {
                alert("Invalid parameter");
                this.stateService.go('root.bookmarks');
            }
            this.Models = [];
            this.Model = new ProductBookmark();
            this.Model.BookmarkId = this.Bookmark.Id;
            this.IsUpdateMode = false;
            this.Search();
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                self.Models = <any>response.Models;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductBookmarkQueryData).then(<any>successCallback, errorCallback);

            var countSuccessCallback = (response: SearchResponse): void => {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductBookmarkQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }

        Save(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {

                self.Model = new ProductBookmark();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Save(self.Model, self.Url.ProductBookmark).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;

            var successCallback = (response: BaseResponse): void => {
                self.IsUpdateMode = false;
                self.Model = new ProductBookmark();
                self.Model.BookmarkId = self.Bookmark.Id;
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };

            self.SaveService.Update(self.Model, self.Url.ProductBookmark).then(<any>successCallback, errorCallback);
        }

        Edit(p: ProductBookmark): void {
            this.Model = p;
            this.IsUpdateMode = true;
        }

        Delete(id: string): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {

                self.IsUpdateMode = false;
                self.Model = new ProductBookmark();
                this.Search();
            };
            var errorCallback = (error: any): void => {
                console.log(error);
                this.Search();
            };
            self.SaveService.Delete(id, self.Url.ProductBookmark).then(successCallback, errorCallback);
        }        
    }

    angular.module("app").controller("ProductBookmarkController", ProductBookmarkController);



}