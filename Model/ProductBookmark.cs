using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class ProductBookmark : Entity
    {
        public string BookmarkId { get; set; }
        [ForeignKey("BookmarkId")]
        public Bookmark Bookmark { get; set; }
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int SystemOnHand { get; set; }
        public int PhysicalOnHand { get; set; }
        public int QuantityDiff { get; set; }
        [DataType(DataType.Currency)]
        public double CostPrice { get; set; }
        [DataType(DataType.Currency)]
        public double PriceDiff { get; set; }
        public string Remarks { get; set; }

    }
}