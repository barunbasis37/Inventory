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
    })(App.Entity);
    App.Customer = Customer;
    var CustomerHistory = (function () {
        function CustomerHistory() {
            this.Purchase = [];
            this.Payments = [];
        }
        return CustomerHistory;
    })();
    App.CustomerHistory = CustomerHistory;
})(App || (App = {}));
