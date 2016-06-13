using System;

namespace ViewModel
{
    public class PaymentReportModel
    {
        public string Supplier { get; set; }
        public double Amount { get; set; }
        public string Memo { get; set; }
        public string PayBy { get; set; }
        public DateTime Date { get; set; }
        public DateTime Modified { get; set; }
    }
}