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
    })();
    App.UserInfoViewModel = UserInfoViewModel;
    var ChangePasswordModel = (function (_super) {
        __extends(ChangePasswordModel, _super);
        function ChangePasswordModel() {
            _super.call(this);
        }
        return ChangePasswordModel;
    })(App.Entity);
    App.ChangePasswordModel = ChangePasswordModel;
})(App || (App = {}));
