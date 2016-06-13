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
    })(App.Entity);
    App.Payment = Payment;
})(App || (App = {}));
