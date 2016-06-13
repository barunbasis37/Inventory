using System;
using Model;

namespace ViewModel
{
    public class SaleReportModel 
    {
        public SaleReportModel()
        {
            
        }
        public SaleReportModel(Sale x)
        {
            InvoiceDate = x.Created;
            Memo = x.Memo;
            BarcodePrice = x.ItemTotal;
            Discount = x.Discount;
            Total = x.Total;
           // Paid = x.Paid;
            SaleType = x.SaleType;
            CardName = x.CardName;
            CostPrice = x.CostTotal;
            CashReceived = x.SaleType.Equals("Cash") ? x.Total : 0;
            CardReceived = x.SaleType.Equals("Card") ? x.Total : 0;
        }
        public string Memo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public double BarcodePrice { get; set; }
        public double Discount { get; set; }    
        public double Total { get; set; }
        public double CashReceived { get; set; }
        public double CardReceived { get; set; }
        public double CostPrice { get; set; }
        public string CardName { get; set; }
      //  public double Paid { get; set; }      
        public string SaleType { get; set; }       
    }
}