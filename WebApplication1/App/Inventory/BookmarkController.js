// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var M = App.Bookmark;
    var BookmarkController = (function () {
        function BookmarkController($location, url, search, save, authService, $state, $stateParams) {
            this.$location = $location;
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
        BookmarkController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Bookmark;
            this.QueryUrl = this.Url.BookmarkQueryData;
            this.Search();
        };
        BookmarkController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        BookmarkController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.BookmarkQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        BookmarkController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        BookmarkController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        BookmarkController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        BookmarkController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        BookmarkController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        BookmarkController.prototype.History = function (p) {
            var self = this;
            self.stateService.go('root.productbookmark', { bookmark: { Id: p.Id } });
        };
        BookmarkController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "$state", "$stateParams"];
        return BookmarkController;
    })();
    App.BookmarkController = BookmarkController;
    angular.module("app").controller("BookmarkController", BookmarkController);
    var ProductBookmarkController = (function () {
        function ProductBookmarkController($location, url, search, save, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.SaveService = save;
            this.Activate();
        }
        ProductBookmarkController.prototype.Activate = function () {
            this.Bookmark = new App.Bookmark();
            var bookmark = this.stateParams["bookmark"];
            if (bookmark != undefined) {
                this.Bookmark = bookmark;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False");
                this.SearchRequest.ParentId = bookmark.Id;
                this.SearchRequest.Page = 1;
            }
            else {
                alert("Invalid parameter");
                this.stateService.go('root.bookmarks');
            }
            this.Models = [];
            this.Model = new App.ProductBookmark();
            this.Model.BookmarkId = this.Bookmark.Id;
            this.IsUpdateMode = false;
            this.Search();
        };
        ProductBookmarkController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                self.Models = response.Models;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductBookmarkQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductBookmarkQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        ProductBookmarkController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        ProductBookmarkController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.Model = new App.ProductBookmark();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.ProductBookmark).then(successCallback, errorCallback);
        };
        ProductBookmarkController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.ProductBookmark();
                self.Model.BookmarkId = self.Bookmark.Id;
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.ProductBookmark).then(successCallback, errorCallback);
        };
        ProductBookmarkController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        ProductBookmarkController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.ProductBookmark();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.ProductBookmark).then(successCallback, errorCallback);
        };
        ProductBookmarkController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "$state", "$stateParams"];
        return ProductBookmarkController;
    })();
    App.ProductBookmarkController = ProductBookmarkController;
    angular.module("app").controller("ProductBookmarkController", ProductBookmarkController);
})(App || (App = {}));
