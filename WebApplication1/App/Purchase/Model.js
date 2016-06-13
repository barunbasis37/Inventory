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
    })(App.Entity);
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
    })(App.Entity);
    App.PurchaseDetail = PurchaseDetail;
})(App || (App = {}));
