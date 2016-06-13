var App;
(function (App) {
    var ProfileController = (function () {
        function ProfileController($location, url, search, save) {
            this.$location = $location;
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.Activate();
        }
        ProfileController.prototype.Activate = function () {
            this.User = new App.UserInfoViewModel();
            this.ChangePasswordModel = new App.ChangePasswordModel();
            this.GetUserInfo();
        };
        ProfileController.prototype.GetUserInfo = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.User = response;
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Get(self.Url.ProfileUrl).then(successCallback, errorCallback);
        };
        ProfileController.prototype.Update = function () {
            var self = this;
            var successCallback = function (response) {
                self.Activate();
                alert("Password changed successfully.");
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SaveService.Save(self.ChangePasswordModel, self.Url.ChangePasswordUrl).then(successCallback, errorCallback);
        };
        ProfileController.$inject = ["$location", "UrlService", "SearchService", "SaveService"];
        return ProfileController;
    })();
    App.ProfileController = ProfileController;
    angular.module("app").controller("ProfileController", ProfileController);
})(App || (App = {}));
