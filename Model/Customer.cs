using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Customer : Entity
    {
        [Required]
        public string MembarshipCardNo { get; set; }
        [Required]
        [Index("IX_CustName")]
        [StringLength(100)]
        public string Name { get; set; }
        public string Address { get; set; }
        [Required]
        [Index("IX_CustPhone", IsUnique = true)]
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(30)]
        public string Email { get; set; }
        public int Point { get; set; }
        public string Remarks { get; set; }       
    }
}