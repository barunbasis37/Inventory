using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class PurchaseDetail : Entity
    {
        [Required]
        public string ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        [Required]
        public string PurchaseId { get; set; }
        [ForeignKey("PurchaseId")]
        public Purchase Purchase { get; set; }
        [Required]
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double Total { get; set; }
        public string Remarks { get; set; }
    }
}