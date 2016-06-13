using System;
using System.Collections.Generic;

namespace ViewModel
{
    public class StockViewModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime BookmarkDate { get; set; }
        public double CostTotal { get; set; }
        public List<StockDetailViewModel> StockDetailViewModels { get; set; }
    }
}