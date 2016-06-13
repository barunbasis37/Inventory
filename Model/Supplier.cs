using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Supplier : Entity
    {
        [Required]
        [Index("IX_SupName")]
        [StringLength(100)]
        public string Name { get; set; }
        public string Address { get; set; }
        [Required]
        [Index("IX_SupPhone",IsUnique = true)]
        [StringLength(20)]
        public string Phone { get; set; }
        public string CompanyName { get; set; }
        public string Remarks { get; set; }
        public double Due { get; set; }
    }
}