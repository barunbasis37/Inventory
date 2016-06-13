module App {
   
    export class AuthService {
        Q: angular.IQService;
        Url: UrlService;
        Web: WebService;

        private localStorageService: angular.local.storage.ILocalStorageService;
        AccountInfo: AccountInfo;

        static $inject = ["$q", "localStorageService", "UrlService", "WebService"];

        constructor($q: angular.IQService, localStorageService: angular.local.storage.ILocalStorageService, urlService: UrlService, webService: WebService) {
            this.Q = $q;
            this.Url = urlService;
            this.Web = webService;
            this.localStorageService = localStorageService;
        }

        Signin(request: SigninRequest): angular.IPromise<AccountInfo> {
            var self = this;
            self.Signout();
            var deffered = self.Q.defer();
            var data = `username=${request.Email}&password=${request.Password}&grant_type=password`;
            self.Web.PostUrlencodedForm(self.Url.SigninUrl, data).then((result: any): any => {
                self.AccountInfo = new AccountInfo();
                self.AccountInfo.UserName = result.data.userName;
                self.AccountInfo.RoleName = result.data.roleName;
                self.AccountInfo.AuthToken = result.data.AuthToken;
                self.AccountInfo.AccessToken = result.data.access_token;
                self.AccountInfo.IsAuth = true;                
               // self.localStorageService.set("authorizationData", self.AccountInfo);
                self.Web.Get(self.Url.SideMenuUrl).then(result => {
                    console.log(result);
                    self.AccountInfo.Routes = result.data;
                    deffered.resolve(self.AccountInfo);
                }, error => {
                    console.log(error);
                });               
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }

        Signout(): void {
            this.localStorageService.remove("authorizationData");
            this.AccountInfo = null;
        }

        FillAuthData(): void {
            var authData = this.localStorageService.get("authorizationData");
            if (authData) {
                this.AccountInfo = ((authData) as AccountInfo);
            }

        }

        IsSignedIn(): boolean {
            if (this.AccountInfo == null) {
                return false;
            }
            return this.AccountInfo.IsAuth;
        }

        LoadMenu(): void {
            var self = this;
            //self.AccountInfo.Routes = result.data.Routes;
            self.Web.Get(self.Url.SideMenuUrl).then(result => {
                console.log(result);
                self.AccountInfo.Routes = result.data;
            }, error => {
                console.log(error);
            });
        }

        Register(request: RegisterRequest): angular.IPromise<RegisterResponse> {
            var self = this;
            self.Signout();
            var deffered = self.Q.defer();
            
            self.Web.Post(self.Url.RegisterUrl, request).then((result: any): any => {
                var response = new RegisterResponse(true, result.data, "Success");
                response.UserName = result.data.userName;
                response.IsRegistered = true;
                deffered.resolve(response);
            }, error => {
                deffered.reject(error);
            });
            return deffered.promise;
        }
    }
    angular.module("app").service("AuthService", AuthService);

    export class PermissionService {
        private q: ng.IQService;
        private securityUrlService: UrlService;
        private web: WebService;

        static $inject = ["$q", "UrlService", "WebService"];

        constructor($q: ng.IQService, securityUrlService: UrlService, webService: WebService) {
            this.q = $q;
            this.securityUrlService = securityUrlService;
            this.web = webService;
        }

        IsAllowed(request: string): angular.IPromise<PermissionResponse> {
            var self = this;
            var deffered = self.q.defer();
            self.web.Post(self.securityUrlService.PermissionUrl, new PermissionRequest(request))
                .then((result: any): any => {
                    var response = new PermissionResponse(true, result.data, "Success");
                    response.IsAllowed = true;
                    deffered.resolve(response);
                }, error => {
                    deffered.reject(error);
                });
            return deffered.promise;
        }
    }

    angular.module("app").service("permissionService", PermissionService);     
}