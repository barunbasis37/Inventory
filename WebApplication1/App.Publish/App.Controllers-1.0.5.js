var App;
(function (App) {
    var HomeController = (function () {
        function HomeController($state, $rootScope, authService) {
            this.IsSignedIn = false;
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.Activate();
            });
            self.rootScopeService.$on("SignedOut", function (event, args) {
                self.Activate();
                self.loadUser();
            });
            self.Activate();
        }
        HomeController.prototype.Activate = function () {
            var self = this;
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
            }
            else {
                self.IsSignedIn = false;
            }
        };
        HomeController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        };
        HomeController.$inject = ["$state", "$rootScope", "AuthService"];
        return HomeController;
    }());
    App.HomeController = HomeController;
    angular.module('app').controller('HomeController', HomeController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SideMenuController = (function () {
        function SideMenuController($location, $rootScope, authService, $state) {
            this.$location = $location;
            this.IsSignedIn = false;
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            self.rootScopeService.$on("SignedIn", function (event, args) {
                self.Activate();
            });
            self.rootScopeService.$on("SignedOut", function (event, args) {
                self.Activate();
                self.loadUser();
            });
            self.Activate();
        }
        SideMenuController.prototype.Activate = function () {
            var self = this;
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
                self.Routes = self.User.Routes;
            }
            else {
                self.IsSignedIn = false;
                self.Routes = [];
            }
        };
        SideMenuController.prototype.LoadSideMenu = function (s) {
            var self = this;
            if (self.Routes) {
                for (var i = 0; i < self.Routes.length; i++) {
                    if (self.Routes[i] === s) {
                        return true;
                    }
                }
            }
            return false;
        };
        SideMenuController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        };
        SideMenuController.$inject = ["$location", "$rootScope", "AuthService", "$state"];
        return SideMenuController;
    }());
    App.SideMenuController = SideMenuController;
    angular.module("app").controller("SideMenuController", SideMenuController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var ProductsController = (function () {
        function ProductsController($location, url, search, save, authService) {
            this.$location = $location;
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
        ProductsController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.Product();
            this.ProductPriceViewModel = new App.ProductPriceViewModel();
            this.BarcodeUrl = "";
            this.IsUpdateMode = false;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.Search();
        };
        ProductsController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        ProductsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                self.Models = response.Models;
                self.ProductPriceViewModel = new App.ProductPriceViewModel();
                for (var i = 0; i < self.Models.length; i++) {
                    self.ProductPriceViewModel.CostPriceTotal += self.Models[i].CostPrice;
                    self.ProductPriceViewModel.SalePriceTotal += self.Models[i].SalePrice;
                    self.ProductPriceViewModel.Total += self.Models[i].OnHand * self.Models[i].CostPrice;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        ProductsController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        ProductsController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        ProductsController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                self.IsUpdateMode = false;
                self.Model = new App.Product();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.Product).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Generate = function () {
            var self = this;
            var successCallback = function (response) {
                self.BarcodeUrl = "/BarcodeImages/" + self.Model.Id + ".png";
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            var url = self.Url.BarcodeImage + "?id=" + this.Model.Id;
            window.open(url, "_blank");
            //self.SearchService.GetDetail(url).then(successCallback, errorCallback);
        };
        ProductsController.prototype.DeleteImage = function () {
            var self = this;
            var successCallback = function (response) {
                self.BarcodeUrl = null;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(self.Model.Id, self.Url.BarcodeImage).then(successCallback, errorCallback);
        };
        ProductsController.prototype.GetBarcode = function () {
            var self = this;
            var successCallback = function (response) {
                self.Model.BarCode = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.ProductQueryBarcode).then(successCallback, errorCallback);
        };
        ProductsController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.ProductQueryReport, "_blank", "");
        };
        ProductsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService"];
        return ProductsController;
    }());
    App.ProductsController = ProductsController;
    angular.module("app").controller("ProductsController", ProductsController);
})(App || (App = {}));

var App;
(function (App) {
    var StockoutReportController = (function () {
        function StockoutReportController($location, url, search, save) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.Activate();
        }
        StockoutReportController.prototype.Activate = function () {
            this.Models = [];
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.SearchRequest["MaxQuantity"] = 10;
            this.Search();
            this.ProductPriceViewModel = new App.ProductPriceViewModel();
        };
        StockoutReportController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                self.Models = response.Models;
                self.ProductPriceViewModel = new App.ProductPriceViewModel();
                for (var i = 0; i < self.Models.length; i++) {
                    self.ProductPriceViewModel.CostPriceTotal += self.Models[i].CostPrice;
                    self.ProductPriceViewModel.SalePriceTotal += self.Models[i].SalePrice;
                    self.ProductPriceViewModel.Total += self.Models[i].OnHand * self.Models[i].CostPrice;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        StockoutReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        StockoutReportController.$inject = ["$location", "UrlService", "SearchService", "SaveService"];
        return StockoutReportController;
    }());
    App.StockoutReportController = StockoutReportController;
    angular.module("app").controller("StockoutReportController", StockoutReportController);
})(App || (App = {}));

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
    }());
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
    }());
    App.ProductBookmarkController = ProductBookmarkController;
    angular.module("app").controller("ProductBookmarkController", ProductBookmarkController);
})(App || (App = {}));

var App;
(function (App) {
    var StockReportController = (function () {
        function StockReportController($location, $uibModal, url, search) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.Activate();
        }
        StockReportController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.StockViewModel();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
        };
        StockReportController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Model = response.Data;
                self.Models = self.Model.StockDetailViewModels;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        StockReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        StockReportController.prototype.UpdateDate = function () {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        };
        StockReportController.$inject = ["$location", "$uibModal", "UrlService", "SearchService"];
        return StockReportController;
    }());
    App.StockReportController = StockReportController;
    angular.module("app").controller("StockReportController", StockReportController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var M = App.Supplier;
    var SuppliersController = (function () {
        function SuppliersController($location, url, search, save, authService, $state, $stateParams) {
            this.$location = $location;
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
        SuppliersController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.TotalDue = 0;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Supplier;
            this.QueryUrl = this.Url.SupplierQueryData;
            this.Search();
        };
        SuppliersController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        SuppliersController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.TotalDue = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalDue += self.Models[i].Due;
                }
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
            self.SearchService.Search(self.SearchRequest, self.Url.SupplierQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        SuppliersController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        SuppliersController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        SuppliersController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        SuppliersController.prototype.History = function (p) {
            var self = this;
            self.stateService.go('root.supplierhistory', { supplier: { Id: p.Id, Name: p.Name, Address: p.Address, Phone: p.Phone, Company: p.CompanyName } });
        };
        SuppliersController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.SupplierQueryReport, "_blank", "");
        };
        SuppliersController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "$state", "$stateParams"];
        return SuppliersController;
    }());
    App.SuppliersController = SuppliersController;
    angular.module("app").controller("SuppliersController", SuppliersController);
})(App || (App = {}));

var App;
(function (App) {
    var SupplierHistoryController = (function () {
        function SupplierHistoryController($location, url, search, save, dropdownService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }
        SupplierHistoryController.prototype.Activate = function () {
            this.Model = new App.SupplierHistory();
            this.Supplier = new App.Supplier();
            var supplier = this.stateParams["supplier"];
            if (supplier != undefined) {
                this.Supplier = supplier;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False");
                this.SearchRequest.Id = supplier.Id;
            }
            else {
                alert("Invalid supplier");
                this.stateService.go('root.suppliers');
            }
            this.QueryUrl = this.Url.SupplierHistoryQuery;
            this.Search();
        };
        SupplierHistoryController.prototype.Search = function () {
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
        SupplierHistoryController.prototype.LoadDropdown = function (name) {
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
        SupplierHistoryController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return SupplierHistoryController;
    }());
    App.SupplierHistoryController = SupplierHistoryController;
    angular.module("app").controller("SupplierHistoryController", SupplierHistoryController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var PurchasesController = (function () {
        function PurchasesController($location, url, search, save, authService, dropdown, $state, $stateParams) {
            this.$location = $location;
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
        PurchasesController.prototype.Activate = function () {
            console.log('i m in PurchasesController');
            this.Models = [];
            // this.Suppliers = [];
            this.Dropdown = new Object();
            this.Model = new App.Purchase();
            this.TotalPurchase = 0;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
            this.LoadDropdown("supplier");
        };
        PurchasesController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        PurchasesController.prototype.LoadDropdown = function (name) {
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
        PurchasesController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.TotalPurchase = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalPurchase += self.Models[i].Total;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PurchaseQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PurchaseQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        PurchasesController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        PurchasesController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Model = new App.Purchase();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Purchase).then(successCallback, errorCallback);
        };
        PurchasesController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Purchase();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.Purchase).then(successCallback, errorCallback);
        };
        PurchasesController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        PurchasesController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Purchase();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.Purchase).then(successCallback, errorCallback);
        };
        PurchasesController.prototype.AddDetail = function (p) {
            var self = this;
            self.stateService.go('root.purchasedetails', { purchase: { Id: p.Id, Memo: p.Memo, Total: p.Total } });
        };
        PurchasesController.prototype.UpdateDate = function () {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        };
        PurchasesController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.PurchaseQueryReport, "_blank", "");
        };
        PurchasesController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "DropdownService", "$state", "$stateParams"];
        return PurchasesController;
    }());
    App.PurchasesController = PurchasesController;
    angular.module("app").controller("PurchasesController", PurchasesController);
})(App || (App = {}));

var App;
(function (App) {
    var PurchaseDetailsController = (function () {
        function PurchaseDetailsController($location, url, search, save, dropdownService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }
        PurchaseDetailsController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new App.PurchaseDetail();
            this.Products = [];
            this.Product = new App.Product();
            this.CommandUrl = this.Url.PurchaseDetail;
            this.QueryUrl = this.Url.PurchaseDetailQuery;
            var purchase = this.stateParams["purchase"];
            if (purchase != undefined) {
                this.Parent = purchase;
                this.Model.PurchaseId = purchase.Id;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False", this.Model.PurchaseId);
            }
            else {
                alert("Invalid purchase");
                this.stateService.go('root.purchases');
            }
            this.Search();
            this.LoadDropdown("product");
            this.LoadDropdown('supplier');
        };
        PurchaseDetailsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.Parent.Total = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    var m = self.Models[i];
                    self.Parent.Total += parseFloat(m["Total"]);
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.SearchProduct = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Products = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        PurchaseDetailsController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        PurchaseDetailsController.prototype.LoadDropdown = function (name) {
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
        PurchaseDetailsController.prototype.Select = function (p) {
            console.log(p);
            this.Model.ProductId = p.Id;
            this.Product = p;
            this.Model.Price = p.CostPrice;
            console.log(this.Model);
        };
        PurchaseDetailsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return PurchaseDetailsController;
    }());
    App.PurchaseDetailsController = PurchaseDetailsController;
    angular.module("app").controller("PurchaseDetailsController", PurchaseDetailsController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var PaymentsController = (function () {
        function PaymentsController($location, url, search, save, authService, dropdown) {
            this.$location = $location;
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
        PaymentsController.prototype.Activate = function () {
            console.log('i m in PaymentsController');
            this.Models = [];
            this.Model = new App.Payment();
            this.TotalAmount = 0;
            this.Dropdown = new Object();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
            this.LoadDropdown("supplier");
        };
        PaymentsController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        PaymentsController.prototype.LoadDropdown = function (name) {
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
        PaymentsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.TotalAmount = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalAmount += self.Models[i].Amount;
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.PaymentQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        PaymentsController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        PaymentsController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.Update = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Update(self.Model, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        PaymentsController.prototype.Delete = function (id) {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.IsUpdateMode = false;
                self.Model = new App.Payment();
                _this.Search();
            };
            var errorCallback = function (error) {
                console.log(error);
                _this.Search();
            };
            self.SaveService.Delete(id, self.Url.Payment).then(successCallback, errorCallback);
        };
        PaymentsController.prototype.UpdateDate = function () {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        };
        PaymentsController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.PaymentQueryReport, "_blank", "");
        };
        PaymentsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "DropdownService"];
        return PaymentsController;
    }());
    App.PaymentsController = PaymentsController;
    angular.module("app").controller("PaymentsController", PaymentsController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'sale', function ($scope, $uibModalInstance, sale) {
        // console.log(sale);
        function LoadSalesData() {
            $scope.sale = sale;
        }
        LoadSalesData();
        $scope.Ok = function () {
            $uibModalInstance.close(sale);
            $scope.Print();
        };
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        function PrintElem(elem) {
            //Popup2($(elem).html());
            Popup2(elem);
        }
        function Popup(name) {
            var data = document.getElementById(name).innerHTML;
            var mywindow = window.open('', 'mydiv');
            mywindow.document.write('<!DOCTYPE html><html><head><title>Shoppers Zone</title>');
            /*optional stylesheet*/
            mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');
            mywindow.document.write('</head><body>');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
            mywindow.print();
            mywindow.close();
            return true;
        }
        function Popup2(name) {
            var printContents = document.getElementById(name).innerHTML;
            var popupWin;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                popupWin = window.open('', '_blank', 'width=400,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWin.window.focus();
                popupWin.document.write('<!DOCTYPE html><html><head>' + '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">' + '</head><body onload="window.print()"><div style="width: auto; height:auto;">' + printContents + '</div></html>');
                popupWin.onbeforeunload = function (event) {
                    popupWin.close();
                    //return '';
                };
                popupWin.onabort = function (event) {
                    popupWin.document.close();
                    popupWin.close();
                };
            }
            else {
                popupWin = window.open('', '_blank', 'width=750,height=600');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></head><body onload="window.print()">' + printContents + '</html>');
                popupWin.document.close();
            }
            return true;
        }
        $scope.Print = function () {
            var elementId = "receipt";
            //var elementById = document.getElementById(elementId);
            //PrintElem(elementById);
            //window.print();
            Popup2(elementId);
        };
    }]);
var App;
(function (App) {
    "use strict";
    var SalesController = (function () {
        function SalesController($location, $uibModal, url, search, save, auth) {
            var _this = this;
            this.$location = $location;
            this.productExistsInCart = function (product) {
                return _this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; }).length > 0;
            };
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.AuthService = auth;
            this.modal = $uibModal;
            this.Activate();
        }
        SalesController.prototype.Activate = function () {
            console.log('i m in SalesController');
            this.Models = [];
            this.Model = new App.Product();
            this.ProductCartModel = new App.ProductCartModel(this.Model, 1);
            // this.SaleModel = new Sale();
            // this.SaleModel.Memo = "";
            this.CustomerModels = [];
            this.CustomerModel = new App.Customer();
            this.Cart = new App.CartViewModel();
            this.IsUpdateMode = false;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
        };
        SalesController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
        };
        SalesController.prototype.Detail = function (p) {
            this.Model = p;
        };
        SalesController.prototype.Edit = function (p) {
            this.Model = p.Product;
            this.ProductCartModel.Quantity = p.Quantity;
            //this.ProductCartModel.Quantity = p.Quantity;
        };
        SalesController.prototype.AddToCart = function (product, quantity) {
            if (product.Name) {
                if (this.productExistsInCart(product)) {
                    this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; })[0].Quantity = quantity;
                }
                else {
                    this.Cart.Products.push(new App.ProductCartModel(product, quantity));
                }
                this.updateCartTotal();
                this.Model = new App.Product();
                this.ProductCartModel = new App.ProductCartModel(this.Model, 1);
            }
            else {
                alert('Select a product first.');
            }
        };
        SalesController.prototype.RemoveFromCart = function (product) {
            var cartItem = this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; })[0];
            var indexOfProduct = this.Cart.Products.indexOf(cartItem);
            this.Cart.Products.splice(indexOfProduct, 1);
            this.updateCartTotal();
        };
        SalesController.prototype.updateCartTotal = function () {
            var _this = this;
            var self = this;
            self.Cart.ItemTotal = 0;
            self.Cart.Products.forEach(function (p) { return _this.Cart.ItemTotal += p.Total(); });
            console.log(self.Cart);
        };
        SalesController.prototype.GetReturn = function () {
            var self = this;
            self.Cart.Return = 0;
            self.Cart.Return = self.Cart.Paid - self.Cart.Total;
        };
        SalesController.prototype.ApplyDiscount = function () {
            var self = this;
            self.Cart.Total = self.Cart.ItemTotal - self.Cart.Discount;
        };
        SalesController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                //  alert("Saved");
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
                alert('Couldnt save the sale. Error occurred.');
            };
            //prepare sale,saledetails
            var saleModel = new App.Sale();
            saleModel.SaleType = self.Cart.SaleType;
            saleModel.TrxNo = self.Cart.Card != undefined ? (self.Cart.Card + " - " + self.Cart.TrxNo) : 'N/A';
            saleModel.CardName = self.Cart.Card != undefined ? self.Cart.Card : 'N/A';
            saleModel.Total = self.Cart.Total;
            saleModel.Paid = self.Cart.Paid;
            saleModel.Return = self.Cart.Return;
            saleModel.Remarks = self.Cart.Remarks;
            saleModel.Memo = self.Cart.Memo;
            saleModel.ItemTotal = self.Cart.ItemTotal;
            saleModel.Discount = self.Cart.Discount;
            saleModel.CustomerId = self.CustomerModel.Id;
            saleModel.PointsEarned = 0;
            saleModel.PointsPaid = 0;
            self.Cart.Products.forEach(function (p) {
                var saleDetail = new App.SaleDetail();
                saleDetail.Quantity = p.Quantity;
                saleDetail.Price = p.Product.SalePrice;
                saleDetail.CostTotal = p.Product.CostPrice * p.Quantity;
                saleDetail.Total = p.Total();
                saleDetail.ProductId = p.Product.Id;
                saleDetail.ProductName = p.Product.Name;
                saleDetail.Created = new Date().toDateString();
                saleDetail.Modified = new Date().toDateString();
                saleDetail.CreatedBy = self.AuthService.AccountInfo.UserName;
                saleDetail.ModifiedBy = self.AuthService.AccountInfo.UserName;
                saleModel.SaleDetails.push(saleDetail);
            });
            saleModel.CostTotal = 0;
            for (var i = 0; i < saleModel.SaleDetails.length; i++) {
                saleModel.CostTotal += saleModel.SaleDetails[i].CostTotal;
            }
            //console.log(sale);
            var $uibModal = this.modal;
            var modalInstance = $uibModal.open({
                templateUrl: self.Url.BaseUrl + '/partials/sale/receipt.tpl.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'app-modal-window',
                size: 'lg',
                resolve: {
                    sale: saleModel
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result);
                _this.SaveService.Save(saleModel, _this.Url.Sale).then(successCallback, errorCallback);
            }, function (cancel) {
                console.log(cancel);
            });
        };
        SalesController.prototype.CustomerSearch = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.CustomerModels = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.CustomerQueryData).then(successCallback, errorCallback);
        };
        SalesController.prototype.CustomerDetail = function (p) {
            this.CustomerModel = p;
        };
        SalesController.prototype.SetAnnonymous = function () {
            this.CustomerModel = new App.Customer();
        };
        SalesController.$inject = ["$location", "$uibModal", "UrlService", "SearchService", "SaveService", "AuthService"];
        return SalesController;
    }());
    App.SalesController = SalesController;
    angular.module("app").controller("SalesController", SalesController);
})(App || (App = {}));

var App;
(function (App) {
    var SalesReportController = (function () {
        function SalesReportController($location, $uibModal, url, search, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();
        }
        SalesReportController.prototype.Activate = function () {
            this.Models = [];
            this.Model = new App.SaleReport();
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.Search();
        };
        SalesReportController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = (response.Models);
                self.Model = new App.SaleReport();
                for (var i = 0; i < self.Models.length; i++) {
                    if (self.Models[i].SaleType === 'Cash') {
                        self.Model.CashTotal += self.Models[i].Total;
                    }
                    else {
                        self.Model.CardTotal += self.Models[i].Total;
                    }
                    self.Model.ItemTotal += self.Models[i].ItemTotal;
                    self.Model.DiscountTotal += self.Models[i].Discount;
                    self.Model.Total += self.Models[i].Total;
                    self.Model.CostPrice += self.Models[i]["CostPrice"];
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryData).then(successCallback, errorCallback);
            var countSuccessCallback = function (response) {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        SalesReportController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        SalesReportController.prototype.AddDetail = function (p) {
            var self = this;
            self.stateService.go('root.saledetails', { sale: { Id: p.Id, Memo: p.Memo, Total: p.Total } });
        };
        SalesReportController.prototype.UpdateDate = function () {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        };
        SalesReportController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.SaleQueryReport, "_blank", "");
        };
        SalesReportController.$inject = ["$location", "$uibModal", "UrlService", "SearchService", "$state", "$stateParams"];
        return SalesReportController;
    }());
    App.SalesReportController = SalesReportController;
    angular.module("app").controller("SalesReportController", SalesReportController);
})(App || (App = {}));

var App;
(function (App) {
    var SaleDetailsController = (function () {
        function SaleDetailsController($location, url, search, save, dropdownService, $state, $stateParams) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Dropdown = new Object();
            this.DropdownService = dropdownService;
            this.Activate();
        }
        SaleDetailsController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new App.SaleDetail();
            this.Products = [];
            this.Product = new App.Product();
            this.CommandUrl = this.Url.SaleDetail;
            this.QueryUrl = this.Url.SaleDetailQuery;
            var sale = this.stateParams["sale"];
            if (sale != undefined) {
                this.Parent = sale;
                this.Model.SaleId = sale.Id;
                this.SearchRequest = new App.SearchRequest("", "Modified", "False", this.Model.SaleId);
            }
            else {
                alert("Invalid selection");
                this.stateService.go('root.sales-report');
            }
            this.Search();
        };
        SaleDetailsController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = response.Models;
                self.Parent.Total = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    var m = self.Models[i];
                    self.Parent.Total += parseFloat(m["Total"]);
                }
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.QueryUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.SearchProduct = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Products = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        SaleDetailsController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        SaleDetailsController.prototype.LoadDropdown = function (name) {
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
        SaleDetailsController.prototype.Select = function (p) {
            console.log(p);
            this.Model.ProductId = p.Id;
            this.Product = p;
            this.Model.Price = p.CostPrice;
            console.log(this.Model);
        };
        SaleDetailsController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "DropdownService", "$state", "$stateParams"];
        return SaleDetailsController;
    }());
    App.SaleDetailsController = SaleDetailsController;
    angular.module("app").controller("SaleDetailsController", SaleDetailsController);
})(App || (App = {}));

var App;
(function (App) {
    var ProfileController = (function () {
        function ProfileController($location, url, search, save) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.Activate();
        }
        ProfileController.prototype.Activate = function () {
            this.User = new App.UserInfoViewModel();
            this.ChangePasswordModel = new App.ChangePasswordModel();
            this.GetUserInfo();
        };
        ProfileController.prototype.GetUserInfo = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.User = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.ProfileUrl).then(successCallback, errorCallback);
        };
        ProfileController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
                alert("Password changed successfully.");
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.ChangePasswordModel, self.Url.ChangePasswordUrl).then(successCallback, errorCallback);
        };
        ProfileController.$inject = ["$location", "UrlService", "SearchService", "SaveService"];
        return ProfileController;
    }());
    App.ProfileController = ProfileController;
    angular.module("app").controller("ProfileController", ProfileController);
})(App || (App = {}));

// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var M = App.Customer;
    var CustomersController = (function () {
        function CustomersController($location, url, search, save, authService, $state, $stateParams) {
            this.$location = $location;
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
        CustomersController.prototype.Activate = function () {
            this.IsUpdateMode = false;
            this.Models = [];
            this.Model = new M();
            this.TotalDue = 0;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
            this.CommandUrl = this.Url.Customer;
            this.QueryUrl = this.Url.CustomerQueryData;
            this.Search();
        };
        CustomersController.prototype.loadUser = function () {
            var self = this;
            self.User = this.authService.AccountInfo;
        };
        CustomersController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                // console.log(response);
                self.Models = response.Models;
                self.TotalDue = 0;
                for (var i = 0; i < self.Models.length; i++) {
                    self.TotalDue += self.Models[i].Point;
                }
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
            self.SearchService.Search(self.SearchRequest, self.Url.CustomerQueryCount).then(countSuccessCallback, countErrorCallback);
        };
        CustomersController.prototype.Goto = function (page) {
            this.SearchRequest.Page = page;
            this.Search();
        };
        CustomersController.prototype.Save = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
                alert('Could not save customer info. Please check the values carefully.');
            };
            self.SaveService.Save(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Update(self.Model, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.Edit = function (p) {
            this.Model = p;
            this.IsUpdateMode = true;
        };
        CustomersController.prototype.Delete = function (id) {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Delete(id, self.CommandUrl).then(successCallback, errorCallback);
        };
        CustomersController.prototype.History = function (p) {
            var self = this;
            self.stateService.go('root.customerhistory', { customer: { Id: p.Id, Name: p.Name, Address: p.Address, Phone: p.Phone, MembarshipCardNo: p.MembarshipCardNo } });
        };
        CustomersController.prototype.Report = function () {
            var self = this;
            window.open(self.Url.CustomerQueryReport, "_blank", "");
        };
        CustomersController.prototype.GetBarcode = function () {
            var self = this;
            var successCallback = function (response) {
                self.Model.MembarshipCardNo = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.CustomerQueryBarcode).then(successCallback, errorCallback);
        };
        CustomersController.$inject = ["$location", "UrlService", "SearchService", "SaveService", "AuthService", "$state", "$stateParams"];
        return CustomersController;
    }());
    App.CustomersController = CustomersController;
    angular.module("app").controller("CustomersController", CustomersController);
})(App || (App = {}));

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