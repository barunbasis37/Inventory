// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    export class SaveService {
        Q: angular.IQService;
        Url: UrlService;
        Web: WebService;
        Auth: AuthService;

        static $inject: string[] = ["$q", "UrlService", "WebService","AuthService"];

        constructor($q: angular.IQService, urlService: UrlService, webService: WebService, auth: AuthService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.Auth = auth;
        }

        Save(data: Entity, url: string): angular.IPromise<BaseResponse> {
            var self = this;
            var deferred = self.Q.defer();
            data.Created = new Date().toDateString();
            data.Modified = new Date().toDateString();
            data.CreatedBy = self.Auth.AccountInfo.UserName;
            data.ModifiedBy = self.Auth.AccountInfo.UserName;

            self.Web.Post(url, data).then((result: any): any => {
                var response = new BaseResponse(true, result.data, "Success");
                deferred.resolve(response);
            }, error => {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        
        Update(data: Entity, url: string): angular.IPromise<BaseResponse> {
            var self = this;
            var deffered = self.Q.defer();
            data.Modified = new Date().toDateString();
            data.ModifiedBy = self.Auth.AccountInfo.UserName;

            self.Web.Put(url, data).then((result: any): any => {
                var response = new BaseResponse(true, result.data, "Success");
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }

        Delete(id: string, url: string): angular.IPromise<BaseResponse> {
            var self = this;
            var deffered = self.Q.defer();
            
            self.Web.Delete(url+"?id="+id).then((result: any): any => {
                var response = new BaseResponse(true, result.data, "Success");
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }


    }


    angular.module("app").service("SaveService", SaveService);
}