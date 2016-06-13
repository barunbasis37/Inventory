using Model;

namespace ViewModel
{
    public class BookmarkViewModel : BaseViewModel
    {
        public BookmarkViewModel(Bookmark x) : base(x)
        {
            Remarks = x.Remarks;
            QuantityDiffTotal = x.QuantityDiffTotal;
            PriceDiffTotal = x.PriceDiffTotal;
        }
        public int QuantityDiffTotal { get; set; }
        public double PriceDiffTotal { get; set; }
        public string Remarks { get; set; }

    }
}