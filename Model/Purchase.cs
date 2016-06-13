using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Purchase : Entity
    {
        public string Memo { get; set; }
        public double Total { get; set; }
        [Required]
        public string SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }
        public string Remarks { get; set; }
        public virtual ICollection<PurchaseDetail> PurchaseDetails { get; set; }
        
    }
}
