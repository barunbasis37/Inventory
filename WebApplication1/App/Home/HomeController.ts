module App {
    export class HomeController {
        IsSignedIn: boolean = false;
        private rootScopeService: angular.IRootScopeService;
        private authService: AuthService;
        User: AccountInfo;

        private stateService: angular.ui.IStateService;
        static $inject: string[] = ["$state", "$rootScope","AuthService"];
        constructor($state: angular.ui.IStateService, $rootScope: angular.IRootScopeService, authService: AuthService) {
            var self = this;
            self.authService = authService;
            self.stateService = $state;
            self.rootScopeService = $rootScope;
            
            self.rootScopeService.$on("SignedIn", (event, args) => {
                self.Activate();
            });     
            self.rootScopeService.$on("SignedOut", (event, args) => {
                self.Activate();
                self.loadUser();
            });     
            self.Activate();
        }

        Activate() {
            var self = this;
            
            var acc = self.authService.AccountInfo;
            if (acc && acc.IsAuth) {
                self.loadUser();
            } else {
                self.IsSignedIn = false;
            }
        }

        private loadUser(): void {
            var self = this;
            self.User = this.authService.AccountInfo;
            self.IsSignedIn = this.authService.IsSignedIn();
        }
    }

    angular.module('app').controller('HomeController', HomeController);
}