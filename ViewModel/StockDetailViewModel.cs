namespace ViewModel
{
    public class StockDetailViewModel
    {
        public string ProductName { get; set; }
        public int BookmarkStartingOnHand { get; set; }
        public int StartingOnHand { get; set; }
        public int StockIn { get; set; }
        public int StockOut { get; set; }
        public int CurrentOnHand { get; set; }
        public int EndOnHand { get; set; }
        public double CostTotal { get; set; }
    }
}