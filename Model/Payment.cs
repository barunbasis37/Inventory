using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Payment : Entity
    {
        [Required]
        public string SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }
        [DataType(DataType.Currency)]
        [Required]
        public double Amount { get; set; }
        public string Memo { get; set; }
        [Required]
        public string PayBy { get; set; }
        public string Remarks { get; set; }
    }
}