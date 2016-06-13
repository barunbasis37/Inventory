var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    "use strict";
    var BaseResponse = (function () {
        function BaseResponse(isSuccess, data, message) {
            this.IsSuccess = isSuccess;
            this.Data = data;
            this.Message = message == null ? "Success" : message;
        }
        return BaseResponse;
    })();
    App.BaseResponse = BaseResponse;
    var PermissionResponse = (function (_super) {
        __extends(PermissionResponse, _super);
        function PermissionResponse() {
            _super.apply(this, arguments);
        }
        return PermissionResponse;
    })(BaseResponse);
    App.PermissionResponse = PermissionResponse;
    var ErrorResponse = (function (_super) {
        __extends(ErrorResponse, _super);
        function ErrorResponse() {
            _super.apply(this, arguments);
        }
        return ErrorResponse;
    })(BaseResponse);
    App.ErrorResponse = ErrorResponse;
    var SearchResponse = (function (_super) {
        __extends(SearchResponse, _super);
        function SearchResponse(data) {
            _super.call(this, true, data, "Success");
            this.Models = data;
        }
        return SearchResponse;
    })(BaseResponse);
    App.SearchResponse = SearchResponse;
})(App || (App = {}));
