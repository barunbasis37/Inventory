var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    "use strict";
    var BaseViewModel = (function () {
        function BaseViewModel() {
        }
        return BaseViewModel;
    })();
    App.BaseViewModel = BaseViewModel;
    var ProductCartModel = (function (_super) {
        __extends(ProductCartModel, _super);
        function ProductCartModel(p, qty) {
            _super.call(this);
            this.Product = p;
            this.Quantity = qty;
        }
        ProductCartModel.prototype.Total = function () {
            return this.Product.SalePrice * this.Quantity;
        };
        return ProductCartModel;
    })(BaseViewModel);
    App.ProductCartModel = ProductCartModel;
    var CartViewModel = (function () {
        function CartViewModel() {
            this.Products = [];
            this.Total = 0;
            this.ItemTotal = 0;
            this.Discount = 0;
            this.Paid = 0;
            this.Return = 0;
            this.SaleType = 'Cash';
            this.Memo = new Date().getTime().toString();
        }
        return CartViewModel;
    })();
    App.CartViewModel = CartViewModel;
    var Sale = (function (_super) {
        __extends(Sale, _super);
        function Sale() {
            _super.call(this);
            this.SaleDetails = [];
        }
        return Sale;
    })(App.Entity);
    App.Sale = Sale;
    var SaleDetail = (function (_super) {
        __extends(SaleDetail, _super);
        function SaleDetail() {
            _super.call(this);
        }
        return SaleDetail;
    })(App.Entity);
    App.SaleDetail = SaleDetail;
    var SaleReport = (function () {
        function SaleReport() {
            this.DiscountTotal = 0;
            this.ItemTotal = 0;
            this.CostPrice = 0;
            this.CashTotal = 0;
            this.CardTotal = 0;
            this.Total = 0;
        }
        return SaleReport;
    })();
    App.SaleReport = SaleReport;
})(App || (App = {}));
