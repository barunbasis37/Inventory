using Model;

namespace ViewModel
{
    public class SaleDetailViewModel : BaseViewModel
    {
        public SaleDetailViewModel(SaleDetail x) : base(x)
        {
            this.Product = new ProductViewModel(x.Product);
            ProductId = x.ProductId;
            Total= x.Total;
            Quantity= x.Quantity;
             
        }

        public ProductViewModel Product { get; set; }
        public string ProductId { get; set; }

        public double Total { get; set; }

        public int Quantity { get; set; }
    }
}