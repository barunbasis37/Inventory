using Model;

namespace ViewModel
{
    public class PurchaseViewModel : BaseViewModel
    {
        public PurchaseViewModel(Purchase x) : base(x)
        {
            this.Id = x.Id;
            this.Memo = x.Memo;
            this.SupplierId = x.SupplierId;
            this.Supplier = x.Supplier;
            this.Remarks = x.Remarks;
            this.Total = x.Total;
        }

        public double Total { get; set; }

        public string Memo { get; set; }
        public string SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public string Remarks { get; set; }


    }
}