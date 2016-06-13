var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Product = (function (_super) {
        __extends(Product, _super);
        function Product() {
            _super.call(this);
            this.Received = 0;
            this.Sold = 0;
            this.OnHand = 0;
            this.BarCode = "";
        }
        return Product;
    }(App.Entity));
    App.Product = Product;
    var Bookmark = (function (_super) {
        __extends(Bookmark, _super);
        function Bookmark() {
            _super.apply(this, arguments);
        }
        return Bookmark;
    }(App.Entity));
    App.Bookmark = Bookmark;
    var ProductBookmark = (function (_super) {
        __extends(ProductBookmark, _super);
        function ProductBookmark() {
            _super.apply(this, arguments);
        }
        return ProductBookmark;
    }(App.Entity));
    App.ProductBookmark = ProductBookmark;
    var StockDetailViewModel = (function () {
        function StockDetailViewModel() {
        }
        return StockDetailViewModel;
    }());
    App.StockDetailViewModel = StockDetailViewModel;
    var StockViewModel = (function () {
        function StockViewModel() {
            this.StockDetailViewModels = [];
        }
        return StockViewModel;
    }());
    App.StockViewModel = StockViewModel;
    var ProductPriceViewModel = (function () {
        function ProductPriceViewModel() {
            this.CostPriceTotal = 0;
            this.SalePriceTotal = 0;
            this.Total = 0;
        }
        return ProductPriceViewModel;
    }());
    App.ProductPriceViewModel = ProductPriceViewModel;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Supplier = (function (_super) {
        __extends(Supplier, _super);
        function Supplier() {
            _super.call(this);
        }
        return Supplier;
    }(App.Entity));
    App.Supplier = Supplier;
    var SupplierHistory = (function () {
        function SupplierHistory() {
            this.Purchase = [];
            this.Payments = [];
        }
        return SupplierHistory;
    }());
    App.SupplierHistory = SupplierHistory;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Purchase = (function (_super) {
        __extends(Purchase, _super);
        function Purchase() {
            _super.call(this);
        }
        return Purchase;
    }(App.Entity));
    App.Purchase = Purchase;
    var PurchaseDetail = (function (_super) {
        __extends(PurchaseDetail, _super);
        function PurchaseDetail() {
            _super.call(this);
            this.Total = 0;
            this.Quantity = 0;
            this.Price = 0;
        }
        return PurchaseDetail;
    }(App.Entity));
    App.PurchaseDetail = PurchaseDetail;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Payment = (function (_super) {
        __extends(Payment, _super);
        function Payment() {
            _super.call(this);
            this.PayBy = "Cash";
        }
        return Payment;
    }(App.Entity));
    App.Payment = Payment;
})(App || (App = {}));

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
    }());
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
    }(BaseViewModel));
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
    }());
    App.CartViewModel = CartViewModel;
    var Sale = (function (_super) {
        __extends(Sale, _super);
        function Sale() {
            _super.call(this);
            this.SaleDetails = [];
        }
        return Sale;
    }(App.Entity));
    App.Sale = Sale;
    var SaleDetail = (function (_super) {
        __extends(SaleDetail, _super);
        function SaleDetail() {
            _super.call(this);
        }
        return SaleDetail;
    }(App.Entity));
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
    }());
    App.SaleReport = SaleReport;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var UserInfoViewModel = (function () {
        function UserInfoViewModel() {
        }
        return UserInfoViewModel;
    }());
    App.UserInfoViewModel = UserInfoViewModel;
    var ChangePasswordModel = (function (_super) {
        __extends(ChangePasswordModel, _super);
        function ChangePasswordModel() {
            _super.call(this);
        }
        return ChangePasswordModel;
    }(App.Entity));
    App.ChangePasswordModel = ChangePasswordModel;
})(App || (App = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Customer = (function (_super) {
        __extends(Customer, _super);
        function Customer() {
            _super.call(this);
            this.Name = "Annonymous";
            this.Id = "00000000-0000-0000-0000-000000000000";
            this.Point = 0;
            this.MembarshipCardNo = "0";
        }
        return Customer;
    }(App.Entity));
    App.Customer = Customer;
    var CustomerHistory = (function () {
        function CustomerHistory() {
            this.Purchase = [];
            this.Payments = [];
        }
        return CustomerHistory;
    }());
    App.CustomerHistory = CustomerHistory;
})(App || (App = {}));