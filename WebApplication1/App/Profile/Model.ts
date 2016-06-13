module App {
    export class UserInfoViewModel  {
        FirstName: string;
        LastName: string;
        Phone: string;
        Email: string;
        Password: string;
        ConfirmPassword: number;
    }

    export class ChangePasswordModel extends Entity{
        constructor() {
            super();
        }
        OldPassword: string;
        NewPassword: string;
        ConfirmPassword: number;
    }

   
}