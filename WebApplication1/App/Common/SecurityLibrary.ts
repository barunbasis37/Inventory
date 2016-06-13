module App {

    export class SigninRequest {
        Email: string;
        Password: string;

        constructor(email: string, password: string) {
            this.Email = email;
            this.Password = password;
        }
    }

    export class RegisterRequest {
        Email: string;
        Password: string;
        ConfirmPassword: string;
        FirstName: string;
        LastName: string;
        Phone: string;

        constructor(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, phone: string) {

            this.Email = email;
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Phone = phone;
        }
    }

    export class AccountInfo {
        UserName: string;
        AuthToken: string;
        AccessToken: string;
        IsAuth: boolean;
        Routes: string[];
        RoleName:string;
    }

    export class RegisterResponse {
        constructor(isSuccess: boolean, data: any, message: string) {
            this.IsSuccess = isSuccess;
            this.data = data;
            this.Message = message == null ? "Success" : message;
        }

        IsSuccess: boolean;
        private data: any;
        Message: string;
        IsRegistered: boolean;
        UserName: string;
    }

}