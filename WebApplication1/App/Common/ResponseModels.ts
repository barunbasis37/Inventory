module App {
    "use strict";

    export class BaseResponse {
        IsSuccess: boolean;
        Data: any;
        Message: string;

        constructor(isSuccess: boolean, data: any, message: string) {
            this.IsSuccess = isSuccess;
            this.Data = data;
            this.Message = message == null ? "Success" : message;
        }
    }

    export class PermissionResponse extends BaseResponse {
        IsAllowed: boolean;
    }

    

    export class ErrorResponse extends BaseResponse {
        Exception: string;
    }

    export class SearchResponse extends BaseResponse {
        constructor(data: any) {
            super(true, data, "Success");
            this.Models = data;
        }

        Models: Object[];
    }

     
}