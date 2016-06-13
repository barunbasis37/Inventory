using Model;

namespace ViewModel
{
    public class PaymentViewModel : BaseViewModel
    {
        public PaymentViewModel(Payment x) : base(x)
        {        
            this.SupplierId = x.SupplierId;
            this.Supplier = x.Supplier;
            this.Amount = x.Amount;
            this.Memo = x.Memo;
            this.PayBy = x.PayBy;
            this.Remarks = x.Remarks;
        }
        public string SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public double Amount { get; set; }
        public string Memo { get; set; }
        public string PayBy { get; set; }
        public string Remarks { get; set; }
    }
}