using System;

namespace ViewModel
{
    public class ProductReportModel
    {
        public string BarCode { get; set; }
        public string Name { get; set; }
        public string GroupName { get; set; }
        public string Brand { get; set; }
        public int OnHand { get; set; }
        public double CostPrice { get; set; }
        public double SalePrice { get; set; }
        public double CostTotal { get; set; }
        public DateTime Modified { get; set; }
    }
}