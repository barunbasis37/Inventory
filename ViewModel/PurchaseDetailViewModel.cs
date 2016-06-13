using Model;

namespace ViewModel
{
    public class PurchaseDetailViewModel: BaseViewModel
    {
        public PurchaseDetailViewModel(PurchaseDetail x):base(x)
        {
            this.Product =  new ProductViewModel(x.Product);
            this.Price = x.Price;
            this.ProductId = x.ProductId;
            this.PurchaseId = x.PurchaseId;
            this.Quantity = x.Quantity;
            this.Remarks = x.Remarks;
            this.Total = x.Total;
        }

        public ProductViewModel Product { get; set; }

        public double Price { get; set; }

        public string ProductId { get; set; }

        public string PurchaseId { get; set; }

        public int Quantity { get; set; }

        public string Remarks { get; set; }

        public double Total { get; set; }
    }
}