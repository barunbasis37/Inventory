var App;
(function (App) {
    var SigninRequest = (function () {
        function SigninRequest(email, password) {
            this.Email = email;
            this.Password = password;
        }
        return SigninRequest;
    })();
    App.SigninRequest = SigninRequest;
    var RegisterRequest = (function () {
        function RegisterRequest(email, password, confirmPassword, firstName, lastName, phone) {
            this.Email = email;
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Phone = phone;
        }
        return RegisterRequest;
    })();
    App.RegisterRequest = RegisterRequest;
    var AccountInfo = (function () {
        function AccountInfo() {
        }
        return AccountInfo;
    })();
    App.AccountInfo = AccountInfo;
    var RegisterResponse = (function () {
        function RegisterResponse(isSuccess, data, message) {
            this.IsSuccess = isSuccess;
            this.data = data;
            this.Message = message == null ? "Success" : message;
        }
        return RegisterResponse;
    })();
    App.RegisterResponse = RegisterResponse;
})(App || (App = {}));
