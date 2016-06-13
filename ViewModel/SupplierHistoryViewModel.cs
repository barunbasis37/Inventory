using System.Collections.Generic;

namespace ViewModel
{
    public class SupplierHistoryViewModel
    {
        public double PurchaseTotal { get; set; }
        public double PaymentTotal { get; set; }
        public List<PurchaseViewModel> Purchases { get; set; }
        public List<PaymentViewModel> Payments { get; set; }
        public List<SupplierHistoryDetailViewModel> Histories { get; set; }
    }
}