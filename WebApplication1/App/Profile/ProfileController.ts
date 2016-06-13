module App {
    export class ProfileController {
        SearchService: SearchService;
        SaveService: SaveService;
        Url: UrlService;
        User: UserInfoViewModel;
        ChangePasswordModel: ChangePasswordModel;

        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService) {
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.Activate();
        }

        Activate() {
            this.User = new UserInfoViewModel();
            this.ChangePasswordModel = new ChangePasswordModel();
            this.GetUserInfo();
        }

        GetUserInfo(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.User = <any>response;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Get(self.Url.ProfileUrl).then(<any>successCallback, errorCallback);
        }

        Update(): void {
            var self = this;
            var successCallback = (response: BaseResponse): void => {
                self.Activate();
                alert("Password changed successfully.");
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };

            self.SaveService.Save(self.ChangePasswordModel, self.Url.ChangePasswordUrl).then(<any>successCallback, errorCallback);
        }


    }
    angular.module("app").controller("ProfileController", ProfileController);
}
