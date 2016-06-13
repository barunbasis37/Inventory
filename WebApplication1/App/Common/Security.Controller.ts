module App {
    export class SigninController {

        private authService: AuthService;
        User: SigninRequest;
        private stateService: angular.ui.IStateService;
        private rootScopeService: angular.IRootScopeService;
        ShowErrorMessage: boolean;

        static $inject = ["AuthService", "$state", "$rootScope"];

        constructor(
            authService: AuthService,
            $state: angular.ui.IStateService,
            $rootScope: angular.IRootScopeService
        ) {
            //console.log('i m in signincontroller');
            this.authService = authService;
            this.stateService = $state;
            this.rootScopeService = $rootScope;
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.stateService.go("root.home");
            }
        }

        Signin(): void {
            var self = this;
            var signinSuccess = (response: AccountInfo): void => {
                self.stateService.go("root.home");
                self.rootScopeService.$broadcast("SignedIn");
            };
            var signinError = (error: any): void => {
                console.log(error);
                if (error.data.error_description) {
                    alert(error.data.error_description);    
                } else {
                    alert('Unknown error occurred. Please contact support. Thanks.');
                }
                
                self.ShowErrorMessage = true;
            };
            self.authService.Signin(new SigninRequest(self.User.Email, self.User.Password)).then(signinSuccess, signinError);
        }

    }
    angular.module("app").controller("SigninController", SigninController);

    export class NavController {
        //   private chatService: ChatService;
        private authService: AuthService;
        User: AccountInfo;
        private stateService: angular.ui.IStateService;
        IsSignedIn: boolean;
        private rootScopeService: angular.IRootScopeService;

        static $inject = ["AuthService", "$state", "$rootScope"];

        constructor(authService: AuthService, $state: angular.ui.IStateService, $rootScope: angular.IRootScopeService) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
            } else {
                self.IsSignedIn = false;
            }
            self.rootScopeService.$on("SignedIn", (event, args) => {
                self.loadUser();
            });
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        }

        Signout(): void {
            var self = this;
            self.authService.Signout();
            self.loadUser();
            self.stateService.go("root.signin");
            self.rootScopeService.$broadcast("SignedOut");
        }
    }
    angular.module("app").controller("NavController", NavController);

    export class RegisterController {

        private authService: AuthService;
        User: RegisterRequest;
        private stateService: angular.ui.IStateService;
        Notification: Notification;
        IsDisabled: boolean;

        static $inject = ["AuthService", "$state"];

        constructor(
            authService: AuthService, $state: angular.ui.IStateService) {
            this.authService = authService;
            this.stateService = $state;
            var acc = this.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                this.stateService.go("root.home");
            }
            this.Notification = new Notification();
            this.Notification.IsError = false;
            this.Notification.IsInfo = false;
            this.IsDisabled = false;
        }

        Register(): void {

            var self = this;
            self.IsDisabled = true;
            var successCallback = (response: RegisterResponse): any => {
                self.stateService.go("root.signin");
                // console.log(response);
                self.IsDisabled = false;
                return response;
            };
            var errorCallback = (errorResponse: any): any => {
                self.IsDisabled = false;
                console.log(errorResponse);
                self.Notification.IsError = true;
                if (errorResponse.status === 500) {
                    self.Notification.Message = errorResponse.data.ExceptionMessage;
                } else {
                    if (errorResponse.status === 400 && errorResponse.data.ModelState["model.Password"]) {
                        self.Notification.Message = errorResponse.data.ModelState["model.Password"][0];
                    } else {
                        if (errorResponse.status === 400 && errorResponse.data.ModelState["model.Phone"]) {
                            self.Notification.Message = errorResponse.data.ModelState["model.Phone"][0];    
                        } else {

                            if (errorResponse.status === 400 && errorResponse.data.ModelState[""]) {
                                if (errorResponse.data.ModelState[""].length > 1) {
                                    self.Notification.Message = errorResponse.data.ModelState[""][1];
                                } else
                                    self.Notification.Message = errorResponse.data.ModelState[""][0];
                            }
                            else self.Notification.Message = errorResponse.data.Message;
                        }
                    }


                  
                }

            };
            self.authService.Register(self.User).then(successCallback, errorCallback);
        }


    }
    angular.module("app").controller("RegisterController", RegisterController);
}