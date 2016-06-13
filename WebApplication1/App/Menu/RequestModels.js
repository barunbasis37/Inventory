var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    "use strict";
    var SigninRequest = (function () {
        function SigninRequest(email, password) {
            this.Email = email;
            this.Password = password;
        }
        return SigninRequest;
    })();
    App.SigninRequest = SigninRequest;
    var RegisterRequest = (function () {
        function RegisterRequest(email, password, confirmPassword) {
            this.Email = email;
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
        }
        return RegisterRequest;
    })();
    App.RegisterRequest = RegisterRequest;
    var AccountInfo = (function () {
        function AccountInfo() {
        }
        return AccountInfo;
    })();
    App.AccountInfo = AccountInfo;
    var PermissionRequest = (function () {
        function PermissionRequest(name) {
            this.Name = name;
        }
        return PermissionRequest;
    })();
    App.PermissionRequest = PermissionRequest;
    var Notification = (function () {
        function Notification() {
        }
        return Notification;
    })();
    App.Notification = Notification;
    var DataRequest = (function () {
        function DataRequest() {
        }
        DataRequest.prototype.getBaseQueryString = function () {
            if (this.Page == null)
                this.Page = 1;
            var queryString = "?keyword=" + this.Keyword + "&orderBy=" + this.OrderBy + "&page=" + this.Page;
            return queryString;
        };
        return DataRequest;
    })();
    App.DataRequest = DataRequest;
    var SearchRequest = (function (_super) {
        __extends(SearchRequest, _super);
        function SearchRequest(keyword, orderBy, isAsc, parentId) {
            _super.call(this);
            this.Keyword = keyword;
            this.OrderBy = orderBy;
            this.IsAscending = isAsc;
            this.ParentId = parentId;
        }
        return SearchRequest;
    })(DataRequest);
    App.SearchRequest = SearchRequest;
    var PoSearchRequest = (function (_super) {
        __extends(PoSearchRequest, _super);
        function PoSearchRequest(keyword, stateId, buyerId, orderBy, isAsc, parentId) {
            _super.call(this, keyword, orderBy, isAsc, parentId);
            this.StateId = stateId;
            this.BuyerId = buyerId;
        }
        return PoSearchRequest;
    })(SearchRequest);
    App.PoSearchRequest = PoSearchRequest;
    var DetailRequest = (function (_super) {
        __extends(DetailRequest, _super);
        function DetailRequest(id) {
            this.Id = id;
            _super.call(this);
        }
        DetailRequest.prototype.GetQueryString = function () {
            return "?id=" + this.Id;
        };
        return DetailRequest;
    })(DataRequest);
    App.DetailRequest = DetailRequest;
})(App || (App = {}));
