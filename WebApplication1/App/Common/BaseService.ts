module App {
    "use strict";

    export class BaseService {
        Q: angular.IQService;
        Url: UrlService;
        Web: WebService;

        constructor($q: angular.IQService, urlService: UrlService, webService: WebService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
        }

    }
}