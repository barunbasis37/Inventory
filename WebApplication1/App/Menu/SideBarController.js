// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SideBarController = (function () {
        function SideBarController($location) {
            this.$location = $location;
            this.IsLoggedIn = false;
            this.Activate();
        }
        SideBarController.prototype.Activate = function () {
        };
        SideBarController.$inject = ["$location"];
        return SideBarController;
    })();
    App.SideBarController = SideBarController;
    angular.module("app").controller("SideBarController", SideBarController);
})(App || (App = {}));
