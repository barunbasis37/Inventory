using System;

namespace ViewModel
{
    public class SupplierHistoryDetailViewModel
    {
        public SupplierHistoryDetailViewModel(PurchaseViewModel vm)
        {
            this.Created = vm.Created;
            this.Total = vm.Total;
            this.Memo = vm.Memo;
            this.Type = "Purchase";
        }
        public SupplierHistoryDetailViewModel(PaymentViewModel vm)
        {
            this.Created = vm.Created;
            this.Total = vm.Amount;
            this.Memo = vm.Memo;
            this.Type = "Payment";
        }
        public DateTime Created { get; set; }
        public double Total { get; set; }
        public string Memo { get; set; }
        public string Type { get; set; }
    }
}