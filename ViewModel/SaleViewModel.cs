using Model;

namespace ViewModel
{
    public class SaleViewModel : BaseViewModel
    {
        public SaleViewModel(Sale x) : base(x)
        {
            this.Id = x.Id;
            this.Memo = x.Memo;
            this.Total = x.Total;
            Paid = x.Paid;
            Return = x.Return;
            SaleType = x.SaleType;
            TRXNo = x.TRXNo;
            Remarks = x.Remarks;
            Discount = x.Discount;
            ItemTotal = x.ItemTotal;
            CostPrice = x.CostTotal==null?0: x.CostTotal;
            CardName = x.CardName;
        }

        public string CardName { get; set; }

        public double CostPrice { get; set; }

        public string Memo { get; set; }
        public double ItemTotal { get; set; }
        public double Total { get; set; }
        public double Paid { get; set; }
        public double Return { get; set; }
        public string SaleType { get; set; }
        public string TRXNo { get; set; }
        public double Discount { get; set; }
        public string Remarks { get; set; }

    }
}