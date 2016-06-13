// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    export class DropdownService {
        Q: angular.IQService;
        Url: UrlService;
        Web: WebService;

        static $inject: string[] = ["$q", "UrlService", "WebService"];
        
        constructor($q: angular.IQService, urlService: UrlService, webService: WebService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;           
        }
        
        Load(name: string): angular.IPromise<SearchResponse> {
            var self = this;
            var deffered = self.Q.defer();
            var url = self.Url.Dropdown + "?name="+name;
            self.Web.Get(url).then((result: any): any => {
                var response = new SearchResponse(result.data);
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }
    }


    angular.module("app").service("DropdownService", DropdownService);

    export class AppModalService{
        static $inject = ["$uibModal"];

        constructor() {
            
        }
    }

}