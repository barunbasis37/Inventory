using System.ComponentModel.DataAnnotations;
using Model;

namespace ViewModel
{
    public class ProductBookmarkViewModel : BaseViewModel
    {
        public ProductBookmarkViewModel(ProductBookmark x) : base(x)
        {
            Remarks = x.Remarks;
            ProductId = x.ProductId;
            ProductName = x.ProductName;
            SystemOnHand = x.SystemOnHand;
            PhysicalOnHand = x.PhysicalOnHand;
            QuantityDiff = x.QuantityDiff;
            CostPrice = x.CostPrice;
            PriceDiff = x.PriceDiff;
            Remarks = x.Remarks;
        }

        public string ProductName { get; set; }
        public string ProductId { get; set; }    
        public int SystemOnHand { get; set; }
        public int PhysicalOnHand { get; set; }
        public int QuantityDiff { get; set; }
        [DataType(DataType.Currency)]
        public double CostPrice { get; set; }
        [DataType(DataType.Currency)]
        public double PriceDiff { get; set; }
        public string Remarks { get; set; }

    }
}