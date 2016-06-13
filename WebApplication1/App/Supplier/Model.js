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
    })(App.Entity);
    App.Supplier = Supplier;
    var SupplierHistory = (function () {
        function SupplierHistory() {
            this.Purchase = [];
            this.Payments = [];
        }
        return SupplierHistory;
    })();
    App.SupplierHistory = SupplierHistory;
})(App || (App = {}));
