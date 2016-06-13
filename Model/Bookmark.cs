using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Bookmark : Entity
    {
        public int QuantityDiffTotal { get; set; }
        public double PriceDiffTotal { get; set; }
        public string Remarks { get; set; }
        public virtual ICollection<ProductBookmark> ProductBookmarks { get; set; }
    }
}
