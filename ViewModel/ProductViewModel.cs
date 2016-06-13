using Model;

namespace ViewModel
{
    public class ProductViewModel: BaseViewModel
    {
        public ProductViewModel()
        {
            
        }
        public ProductViewModel(Product x): base(x)
        {
            Id = x.Id;
            BarCode = x.BarCode;          
            Name = x.Name;
            StartingInventory = x.StartingInventory;
            Received = x.Received;
            Sold = x.Sold;
            OnHand = x.OnHand;
            MinimumRequired = x.MinimumRequired;
            CostPrice = x.CostPrice;
            SalePrice = x.SalePrice;
            Created = x.Created;
            Modified = x.Modified;
            GroupName = x.GroupName;
            Brand = x.Brand;
            Created = x.Created;
            CreatedBy = x.CreatedBy;
            Modified = x.Modified;
            ModifiedBy = x.ModifiedBy;
            BarcodeUrl = @"BarcodeImages/" + x.Id + ".png";
        }

        public string BarcodeUrl { get; set; }

        public string GroupName { get; set; }

        public string Brand { get; set; }

        public string BarCode { get; set; }
        public string ProductCode { get; set; }

        public string Name { get; set; }
        public int StartingInventory { get; set; }
        public int Received { get; set; }
        public int Sold { get; set; }
        public int OnHand { get; set; }

        public int MinimumRequired { get; set; }
        public double CostPrice { get; set; }

        public double SalePrice { get; set; }
        
    }
}
