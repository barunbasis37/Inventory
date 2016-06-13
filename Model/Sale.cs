using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Sale : Entity
    {
        public string Memo { get; set; }
        public double ItemTotal { get; set; }
        public double Total { get; set; }
        public double Paid { get; set; }
        public double Return { get; set; }
        public string SaleType { get; set; }
        public string TRXNo { get; set; }
        public string CardName { get; set; }
        public string Remarks { get; set; }
        public double Discount { get; set; }
        public virtual ICollection<SaleDetail> SaleDetails { get; set; }
        public double CostTotal { get; set; }
        public string CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public int PointsEarned { get; set; }
        public int PointsPaid { get; set; }
    }
}