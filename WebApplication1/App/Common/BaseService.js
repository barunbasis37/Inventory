var App;
(function (App) {
    "use strict";
    var BaseService = (function () {
        function BaseService($q, urlService, webService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
        }
        return BaseService;
    })();
    App.BaseService = BaseService;
})(App || (App = {}));
