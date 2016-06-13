using System;

namespace ViewModel
{
    public class PurchaseReportModel
    {
        public string Supplier { get; set; }
        public string Memo { get; set; }       
        public double Total { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}