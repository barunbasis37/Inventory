module App {
    export class SalesReportController {
        SearchService: SearchService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        Models: Sale[];
        Model: SaleReport;
        private modal: angular.ui.bootstrap.IModalService;
        private stateService: angular.ui.IStateService;
        private stateParams: angular.ui.IStateParamsService;
        static $inject: string[] = ["$location", "$uibModal", "UrlService", "SearchService", "$state", "$stateParams"];

        constructor(private $location: angular.ILocationService, $uibModal: angular.ui.bootstrap.IModalService, url: UrlService, search: SearchService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
            this.Url = url;
            this.SearchService = search;
            this.modal = $uibModal;
            this.stateService = $state;
            this.stateParams = $stateParams;
            this.Activate();
        }

        Activate() {
            this.Models = [];
            this.Model = new SaleReport();
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");         
            this.Search();
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                console.log(response);
                self.Models = <any>(response.Models);
                self.Model = new SaleReport();
                for (var i = 0; i < self.Models.length; i++) {
                    if (self.Models[i].SaleType==='Cash') {
                        self.Model.CashTotal += self.Models[i].Total;
                    } else {
                        self.Model.CardTotal += self.Models[i].Total;
                    }
                    self.Model.ItemTotal += self.Models[i].ItemTotal;
                    self.Model.DiscountTotal += self.Models[i].Discount;
                    self.Model.Total += self.Models[i].Total;
                    self.Model.CostPrice += self.Models[i]["CostPrice"];
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryData).then(<any>successCallback, errorCallback);


            var countSuccessCallback = (response: SearchResponse): void => {

                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);

            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.SaleQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }
        AddDetail(p: Sale): void {
            var self = this;

            self.stateService.go('root.saledetails', { sale: { Id: p.Id, Memo: p.Memo, Total: p.Total } });
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
        Report(): void {
            var self = this;
            window.open(self.Url.SaleQueryReport, "_blank", "");
        }
    }

    angular.module("app").controller("SalesReportController", SalesReportController);
}