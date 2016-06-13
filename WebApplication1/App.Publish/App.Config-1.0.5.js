var App;
(function (App) {
    "use strict";
    var AppConfig = (function () {
        function AppConfig($stateProvider, $urlRouterProvider) {
            console.log("I am in config constructor.");
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("root", {
                abstract: true,
                url: "",
                template: "<div ui-view class=\"container-fluid slide\"></div>"
            })
                .state("root.home", {
                url: "/",
                templateUrl: "partials/home/home.tpl.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
                .state("root.signin", {
                url: "/signin",
                templateUrl: "partials/account/signin.tpl.html",
                controller: "SigninController",
                controllerAs: "vm"
            })
                .state("root.register", {
                url: "/register",
                templateUrl: "partials/account/register.tpl.html",
                controller: "RegisterController",
                controllerAs: "vm"
            })
                .state("root.profile", {
                url: "/profile",
                templateUrl: "partials/account/profile.tpl.html",
                controller: "ProfileController",
                controllerAs: "vm"
            })
                .state("root.denied", {
                url: "/denied",
                template: '<h1>Access Denied <a ui-sref="root.home"> back to home </a></h1>'
            })
                .state("root.products", {
                url: "/products",
                templateUrl: "partials/inventory/products.tpl.html",
                controller: "ProductsController",
                controllerAs: "vm"
            })
                .state("root.stockoutreport", {
                url: "/stockout-report",
                templateUrl: "partials/inventory/stockout-report.tpl.html",
                controller: "StockoutReportController",
                controllerAs: "vm"
            })
                .state("root.suppliers", {
                url: "/suppliers",
                templateUrl: "partials/supplier/suppliers.tpl.html",
                controller: "SuppliersController",
                controllerAs: "vm"
            })
                .state("root.supplierhistory", {
                url: "/supplier-history",
                params: { supplier: null },
                templateUrl: "partials/supplier/supplier-history.tpl.html",
                controller: "SupplierHistoryController",
                controllerAs: "vm"
            })
                .state("root.purchases", {
                url: "/purchases",
                templateUrl: "partials/purchase/purchases.tpl.html",
                controller: "PurchasesController",
                controllerAs: "vm"
            })
                .state("root.purchasedetails", {
                url: "/purchase-details",
                params: { purchase: null },
                templateUrl: "partials/purchase/purchase-details.tpl.html",
                controller: "PurchaseDetailsController",
                controllerAs: "vm"
            })
                .state("root.payments", {
                url: "/payments",
                templateUrl: "partials/payment/payments.tpl.html",
                controller: "PaymentsController",
                controllerAs: "vm"
            })
                .state("root.sales", {
                url: "/sales",
                templateUrl: "partials/sale/sales.tpl.html",
                controller: "SalesController",
                controllerAs: "vm"
            })
                .state("root.saledetails", {
                url: "/sale-details",
                params: { sale: null },
                templateUrl: "partials/sale/sale-details.tpl.html",
                controller: "SaleDetailsController",
                controllerAs: "vm"
            })
                .state("root.salesreport", {
                url: "/sales-report",
                templateUrl: "partials/sale/sales-report.tpl.html",
                controller: "SalesReportController",
                controllerAs: "vm"
            })
                .state("root.bookmarks", {
                url: "/bookmarks",
                templateUrl: "partials/inventory/bookmarks.tpl.html",
                controller: "BookmarkController",
                controllerAs: "vm"
            })
                .state("root.productbookmark", {
                url: "/product-bookmark",
                params: { bookmark: null },
                templateUrl: "partials/inventory/product-bookmark.tpl.html",
                controller: "ProductBookmarkController",
                controllerAs: "vm"
            })
                .state("root.stockreport", {
                url: "/stock-report",
                templateUrl: "partials/inventory/stock-report.tpl.html",
                controller: "StockReportController",
                controllerAs: "vm"
            })
                .state("root.customers", {
                url: "/customers",
                templateUrl: "partials/customer/customers.tpl.html",
                controller: "CustomersController",
                controllerAs: "vm"
            })
                .state("root.customerhistory", {
                url: "/customer-history",
                params: { customer: null },
                templateUrl: "partials/customer/customer-history.tpl.html",
                controller: "CustomerHistoryController",
                controllerAs: "vm"
            });
            $urlRouterProvider.otherwise("/");
        }
        AppConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
        return AppConfig;
    }());
    App.AppConfig = AppConfig;
    angular.module("app", ["ngResource", "ngAnimate", "ui.router", "ui.bootstrap", "LocalStorageModule"]);
    angular.module("app").config(AppConfig);
})(App || (App = {}));