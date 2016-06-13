// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'sale', function ($scope, $uibModalInstance, sale) {
        // console.log(sale);
        function LoadSalesData() {
            $scope.sale = sale;
        }
        LoadSalesData();
        $scope.Ok = function () {
            $uibModalInstance.close(sale);
            $scope.Print();
        };
        $scope.Cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        function PrintElem(elem) {
            //Popup2($(elem).html());
            Popup2(elem);
        }
        function Popup(name) {
            var data = document.getElementById(name).innerHTML;
            var mywindow = window.open('', 'mydiv');
            mywindow.document.write('<!DOCTYPE html><html><head><title>Shoppers Zone</title>');
            /*optional stylesheet*/
            mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');
            mywindow.document.write('</head><body>');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
            mywindow.print();
            mywindow.close();
            return true;
        }
        function Popup2(name) {
            var printContents = document.getElementById(name).innerHTML;
            var popupWin;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                popupWin = window.open('', '_blank', 'width=400,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWin.window.focus();
                popupWin.document.write('<!DOCTYPE html><html><head>' + '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">' + '</head><body onload="window.print()"><div style="width: auto; height:auto;">' + printContents + '</div></html>');
                popupWin.onbeforeunload = function (event) {
                    popupWin.close();
                    //return '';
                };
                popupWin.onabort = function (event) {
                    popupWin.document.close();
                    popupWin.close();
                };
            }
            else {
                popupWin = window.open('', '_blank', 'width=750,height=600');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></head><body onload="window.print()">' + printContents + '</html>');
                popupWin.document.close();
            }
            return true;
        }
        $scope.Print = function () {
            var elementId = "receipt";
            //var elementById = document.getElementById(elementId);
            //PrintElem(elementById);
            //window.print();
            Popup2(elementId);
        };
    }]);
var App;
(function (App) {
    "use strict";
    var SalesController = (function () {
        function SalesController($location, $uibModal, url, search, save, auth) {
            var _this = this;
            this.$location = $location;
            this.productExistsInCart = function (product) {
                return _this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; }).length > 0;
            };
            this.Url = url;
            this.SearchService = search;
            this.SaveService = save;
            this.AuthService = auth;
            this.modal = $uibModal;
            this.Activate();
        }
        SalesController.prototype.Activate = function () {
            console.log('i m in SalesController');
            this.Models = [];
            this.Model = new App.Product();
            this.ProductCartModel = new App.ProductCartModel(this.Model, 1);
            // this.SaleModel = new Sale();
            // this.SaleModel.Memo = "";
            this.CustomerModels = [];
            this.CustomerModel = new App.Customer();
            this.Cart = new App.CartViewModel();
            this.IsUpdateMode = false;
            this.SearchRequest = new App.SearchRequest("", "Modified", "False", "");
        };
        SalesController.prototype.Search = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.Models = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(successCallback, errorCallback);
        };
        SalesController.prototype.Detail = function (p) {
            this.Model = p;
        };
        SalesController.prototype.Edit = function (p) {
            this.Model = p.Product;
            this.ProductCartModel.Quantity = p.Quantity;
            //this.ProductCartModel.Quantity = p.Quantity;
        };
        SalesController.prototype.AddToCart = function (product, quantity) {
            if (product.Name) {
                if (this.productExistsInCart(product)) {
                    this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; })[0].Quantity = quantity;
                }
                else {
                    this.Cart.Products.push(new App.ProductCartModel(product, quantity));
                }
                this.updateCartTotal();
                this.Model = new App.Product();
                this.ProductCartModel = new App.ProductCartModel(this.Model, 1);
            }
            else {
                alert('Select a product first.');
            }
        };
        SalesController.prototype.RemoveFromCart = function (product) {
            var cartItem = this.Cart.Products.filter(function (x) { return x.Product.Name === product.Name; })[0];
            var indexOfProduct = this.Cart.Products.indexOf(cartItem);
            this.Cart.Products.splice(indexOfProduct, 1);
            this.updateCartTotal();
        };
        SalesController.prototype.updateCartTotal = function () {
            var _this = this;
            var self = this;
            self.Cart.ItemTotal = 0;
            self.Cart.Products.forEach(function (p) { return _this.Cart.ItemTotal += p.Total(); });
            console.log(self.Cart);
        };
        SalesController.prototype.GetReturn = function () {
            var self = this;
            self.Cart.Return = 0;
            self.Cart.Return = self.Cart.Paid - self.Cart.Total;
        };
        SalesController.prototype.ApplyDiscount = function () {
            var self = this;
            self.Cart.Total = self.Cart.ItemTotal - self.Cart.Discount;
        };
        SalesController.prototype.Save = function () {
            var _this = this;
            var self = this;
            var successCallback = function (response) {
                //  alert("Saved");
                self.Activate();
            };
            var errorCallback = function (error) {
                console.log(error);
                alert('Couldnt save the sale. Error occurred.');
            };
            //prepare sale,saledetails
            var saleModel = new App.Sale();
            saleModel.SaleType = self.Cart.SaleType;
            saleModel.TrxNo = self.Cart.Card != undefined ? (self.Cart.Card + " - " + self.Cart.TrxNo) : 'N/A';
            saleModel.CardName = self.Cart.Card != undefined ? self.Cart.Card : 'N/A';
            saleModel.Total = self.Cart.Total;
            saleModel.Paid = self.Cart.Paid;
            saleModel.Return = self.Cart.Return;
            saleModel.Remarks = self.Cart.Remarks;
            saleModel.Memo = self.Cart.Memo;
            saleModel.ItemTotal = self.Cart.ItemTotal;
            saleModel.Discount = self.Cart.Discount;
            saleModel.CustomerId = self.CustomerModel.Id;
            saleModel.PointsEarned = 0;
            saleModel.PointsPaid = 0;
            self.Cart.Products.forEach(function (p) {
                var saleDetail = new App.SaleDetail();
                saleDetail.Quantity = p.Quantity;
                saleDetail.Price = p.Product.SalePrice;
                saleDetail.CostTotal = p.Product.CostPrice * p.Quantity;
                saleDetail.Total = p.Total();
                saleDetail.ProductId = p.Product.Id;
                saleDetail.ProductName = p.Product.Name;
                saleDetail.Created = new Date().toDateString();
                saleDetail.Modified = new Date().toDateString();
                saleDetail.CreatedBy = self.AuthService.AccountInfo.UserName;
                saleDetail.ModifiedBy = self.AuthService.AccountInfo.UserName;
                saleModel.SaleDetails.push(saleDetail);
            });
            saleModel.CostTotal = 0;
            for (var i = 0; i < saleModel.SaleDetails.length; i++) {
                saleModel.CostTotal += saleModel.SaleDetails[i].CostTotal;
            }
            //console.log(sale);
            var $uibModal = this.modal;
            var modalInstance = $uibModal.open({
                templateUrl: self.Url.BaseUrl + '/partials/sale/receipt.tpl.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'app-modal-window',
                size: 'lg',
                resolve: {
                    sale: saleModel
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result);
                _this.SaveService.Save(saleModel, _this.Url.Sale).then(successCallback, errorCallback);
            }, function (cancel) {
                console.log(cancel);
            });
        };
        SalesController.prototype.CustomerSearch = function () {
            var self = this;
            var successCallback = function (response) {
                console.log(response);
                self.CustomerModels = (response.Models);
            };
            var errorCallback = function (error) {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.CustomerQueryData).then(successCallback, errorCallback);
        };
        SalesController.prototype.CustomerDetail = function (p) {
            this.CustomerModel = p;
        };
        SalesController.prototype.SetAnnonymous = function () {
            this.CustomerModel = new App.Customer();
        };
        SalesController.$inject = ["$location", "$uibModal", "UrlService", "SearchService", "SaveService", "AuthService"];
        return SalesController;
    })();
    App.SalesController = SalesController;
    angular.module("app").controller("SalesController", SalesController);
})(App || (App = {}));
