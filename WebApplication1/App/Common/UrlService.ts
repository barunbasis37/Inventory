module App {
    "use strict";

    export class UrlService {
        BaseUrl: string;
        SigninUrl: string;
        PermissionUrl: string;
        RegisterUrl: string;        
        SideMenuUrl: string;
        ProfileUrl:string;
        ChangePasswordUrl: string;

        constructor() {
            var baseUrl = "";
            //baseUrl = "/ShoppersZone";
            var baseApi = baseUrl + "/api";
            this.BaseUrl = baseUrl;

            this.SigninUrl = baseUrl + "/token";
            this.PermissionUrl = baseApi + "/Permission";
            this.RegisterUrl = baseApi + "/Account/Register";
            this.SideMenuUrl = baseApi + "/SideMenu";
            this.ProfileUrl = baseApi + "/Account/GetUserInfo";
            this.ChangePasswordUrl = baseApi + "/Account/ChangePassword";
        
            //business
            this.BarcodeImage = baseApi + "/BarcodeImage";
            this.productQuery = baseApi + "/ProductQuery";
            this.ProductQueryBarcode = this.productQuery + "/Barcode";
            this.ProductQueryData = this.productQuery + "/Data";
            this.ProductQueryCount = this.productQuery + "/Count";
            this.ProductQueryReport = this.productQuery + "/Report";
            this.Product = baseApi + "/Product";
            this.SupplierQuery = baseApi + "/SupplierQuery";
            this.Supplier = baseApi + "/Supplier";
            this.SupplierQueryData = this.SupplierQuery + "/Data";
            this.SupplierQueryCount = this.SupplierQuery + "/Count";
            this.SupplierQueryReport = this.SupplierQuery + "/Report";
            this.SupplierHistoryQuery = baseApi + "/SupplierHistoryQuery";
            this.Purchase = baseApi + "/Purchase";
            this.PurchaseQuery = baseApi + "/PurchaseQuery";
            this.PurchaseQueryData = this.PurchaseQuery + "/Data";
            this.PurchaseQueryCount = this.PurchaseQuery + "/Count";
            this.PurchaseQueryReport = this.PurchaseQuery + "/Report";
            this.PurchaseDetail = baseApi + "/PurchaseDetail";
            this.PurchaseDetailQuery = baseApi + "/PurchaseDetailQuery";
            this.Payment = baseApi + "/Payment";
            this.PaymentQuery = baseApi + "/PaymentQuery";
            this.PaymentQueryData = this.PaymentQuery + "/Data";
            this.PaymentQueryCount = this.PaymentQuery + "/Count";
            this.PaymentQueryReport = this.PaymentQuery + "/Report";
            this.Dropdown = baseApi + "/Dropdown";
            this.Sale = baseApi + "/Sale";
            this.saleQuery = baseApi + "/SaleQuery";
            this.SaleQueryData = this.saleQuery + "/Data";
            this.SaleQueryCount = this.saleQuery + "/Count";
            this.SaleQueryReport = this.saleQuery + "/Report";
            this.SaleDetail = baseApi + "/SaleDetail";
            this.SaleDetailQuery = baseApi + "/SaleDetailQuery";
            this.Bookmark = baseApi + "/Bookmark";
            this.BookmarkQuery = baseApi + "/BookmarkQuery";
            this.BookmarkQueryData = this.BookmarkQuery + "/Data";
            this.BookmarkQueryCount = this.BookmarkQuery + "/Count";
            this.ProductBookmark = baseApi + "/ProductBookmark";
            this.ProductBookmarkQuery = baseApi + "/ProductBookmarkQuery";
            this.ProductBookmarkQueryData = this.ProductBookmarkQuery + "/Data";
            this.ProductBookmarkQueryCount = this.ProductBookmarkQuery + "/Count";
            this.StockQuery = baseApi + "/StockQuery";
            this.StockQueryData = this.StockQuery + "/Data";
            this.StockQueryCount = this.StockQuery + "/Count";
            this.CustomerQuery = baseApi + "/CustomerQuery";
            this.Customer = baseApi + "/Customer";
            this.CustomerQueryBarcode = this.CustomerQuery + "/Barcode";
            this.CustomerQueryData = this.CustomerQuery + "/Data";
            this.CustomerQueryCount = this.CustomerQuery + "/Count";
            this.CustomerQueryReport = this.CustomerQuery + "/Report";
            this.CustomerHistoryQuery = baseApi + "/CustomerHistoryQuery";
        }

        private productQuery: string;
        ProductQueryBarcode: string;
        ProductQueryData: string;
        ProductQueryCount: string;
        ProductQueryReport: string;
        Product: string;
        SupplierQuery: string;
        Supplier: string;
        SupplierHistoryQuery: string;
        SupplierQueryData: string;
        SupplierQueryCount: string;
        SupplierQueryReport: string;
        BarcodeImage: string;
        Purchase: string;
        PurchaseQuery: string;
        PurchaseDetail: string;
        PurchaseDetailQuery: string;
        PurchaseQueryData: string;
        PurchaseQueryCount: string;
        PurchaseQueryReport: string;
        Payment: string;
        PaymentQuery: string;
        PaymentQueryData: string;
        PaymentQueryCount: string;
        PaymentQueryReport: string;
        Dropdown: string;
        Sale: string;
        private saleQuery: string;
        SaleQueryData: string;
        SaleQueryCount: string;
        SaleQueryReport: string;
        SaleDetail: string;
        SaleDetailQuery: string;
        Bookmark: string;
        BookmarkQuery: string;
        BookmarkQueryData: string;
        BookmarkQueryCount: string;
        ProductBookmark: string;
        ProductBookmarkQuery: string;
        ProductBookmarkQueryData: string;
        ProductBookmarkQueryCount: string;
        StockQuery: string;
        StockQueryData: string;
        StockQueryCount: string;
        CustomerQuery: string;
        Customer: string;
        CustomerQueryBarcode: string;
        CustomerHistoryQuery: string;
        CustomerQueryData: string;
        CustomerQueryCount: string;
        CustomerQueryReport: string;
    }

    angular.module("app").service("UrlService", UrlService);
}