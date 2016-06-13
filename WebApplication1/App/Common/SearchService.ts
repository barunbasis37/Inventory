// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    export class SearchService  {
        Q: angular.IQService;
        Url: UrlService;
        Web: WebService;

        static $inject: string[] = ["$q", "UrlService", "WebService"];
        Id: string;
        
        constructor($q: angular.IQService, urlService: UrlService, webService: WebService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.Id = undefined;
        }

        Search(request: SearchRequest, url: string): angular.IPromise<SearchResponse> {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Post(url, request).then((result: any): any => {
                var response = new SearchResponse(result.data);
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }

        
        Get(url: string): angular.IPromise<any> {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Get(url).then((result: any): any => {
                var response = result.data;
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }        

        Download(url: string): angular.IPromise<any> {
            var self = this;
            var deffered = self.Q.defer();
            self.Web.Get(url).then((result: any): any => {                
                deffered.resolve(result);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }        
    }


    angular.module("app").service("SearchService", SearchService);
}