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
    })(App.Entity);
    App.Product = Product;
    var Bookmark = (function (_super) {
        __extends(Bookmark, _super);
        function Bookmark() {
            _super.apply(this, arguments);
        }
        return Bookmark;
    })(App.Entity);
    App.Bookmark = Bookmark;
    var ProductBookmark = (function (_super) {
        __extends(ProductBookmark, _super);
        function ProductBookmark() {
            _super.apply(this, arguments);
        }
        return ProductBookmark;
    })(App.Entity);
    App.ProductBookmark = ProductBookmark;
    var StockDetailViewModel = (function () {
        function StockDetailViewModel() {
        }
        return StockDetailViewModel;
    })();
    App.StockDetailViewModel = StockDetailViewModel;
    var StockViewModel = (function () {
        function StockViewModel() {
            this.StockDetailViewModels = [];
        }
        return StockViewModel;
    })();
    App.StockViewModel = StockViewModel;
    var ProductPriceViewModel = (function () {
        function ProductPriceViewModel() {
            this.CostPriceTotal = 0;
            this.SalePriceTotal = 0;
            this.Total = 0;
        }
        return ProductPriceViewModel;
    })();
    App.ProductPriceViewModel = ProductPriceViewModel;
})(App || (App = {}));
