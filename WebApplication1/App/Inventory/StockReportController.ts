module App {
    export class StockReportController {
        SearchService: SearchService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        Models: StockDetailViewModel[];
        Model: StockViewModel;
        private modal: angular.ui.bootstrap.IModalService;

        static $inject: string[] = ["$location", "$uibModal", "UrlService", "SearchService"];

        constructor(private $location: angular.ILocationService, $uibModal: angular.ui.bootstrap.IModalService, url: UrlService, search: SearchService) {
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.Activate();
        }

        Activate() {
            this.Models = [];
            this.Model = new StockViewModel();
            this.SearchRequest = new SearchRequest("", "Modified", "False", ""); this.Search();
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Model = response.Data;
                self.Models = self.Model.StockDetailViewModels;
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryData).then(<any>successCallback, errorCallback);


            var countSuccessCallback = (response: SearchResponse): void => {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.StockQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }
        UpdateDate(): void {
            var object = this.SearchRequest['Start'];
            if (object) {
                this.SearchRequest.StartDate = object.toDateString();
            }
            var object1 = this.SearchRequest['End'];
            if (object1) {
                this.SearchRequest.EndDate = object1.toDateString();
            }
            console.log(this.SearchRequest);
        }
    }

    angular.module("app").controller("StockReportController", StockReportController);
}