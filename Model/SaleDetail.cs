using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class SaleDetail : Entity
    {
        public string SaleId { get; set; }
        [ForeignKey("SaleId")]
        public virtual Sale Sale { get; set; }

        public string ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        public double CostTotal { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double Total { get; set; }        
    }
}