using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using RequestModel;
using ViewModel;

namespace ServiceLibrary
{
    public class StockService
    {
        private BusinessDbContext db;
        public StockService(BusinessDbContext db)
        {
            this.db = db;
        }

        public StockViewModel Search(StockRequestModel request)
        {
            request.StartDate = request.StartDate.Date;
            request.EndDate = request.EndDate.Date.AddDays(1).AddMinutes(-1);
            
            Bookmark bookmark = db.Bookmarks.OrderByDescending(x => x.Created).FirstOrDefault(x => x.Created < request.StartDate);

            if (bookmark==null)
            {
                return null;
            }
            IQueryable<ProductBookmark> queryablePBookmarks = bookmark.ProductBookmarks.AsQueryable();

            ProductBookmarkRequestModel pbRequestModel=new ProductBookmarkRequestModel(request.Keyword, "Modified","False");
            queryablePBookmarks = pbRequestModel.GetOrderedData(queryablePBookmarks);
            queryablePBookmarks = pbRequestModel.SkipAndTake(queryablePBookmarks);
            List<ProductBookmarkViewModel> productBookmarks = queryablePBookmarks.ToList().ConvertAll(x=>new ProductBookmarkViewModel(x)).ToList();
            
            var bookmarkDate = bookmark.Created.Date;
            List<SaleDetailViewModel> saleDetails = db.SaleDetails.Include(x=>x.Product).Where(x => x.Created >= bookmarkDate && x.Created <= request.EndDate).ToList().ConvertAll(x=>new SaleDetailViewModel(x)).ToList();
            var purchaseDetails = db.PurchaseDetails.Include(x=>x.Product).Where(x => x.Created >= bookmarkDate && x.Created <= request.EndDate).ToList().ConvertAll(x=>new PurchaseDetailViewModel(x));
            var stockDetailViewModels = new List<StockDetailViewModel>();
            foreach (var pb in productBookmarks)
            {
                var purchaseDqBefore = purchaseDetails.Where(x => x.Created < request.StartDate && x.ProductId == pb.ProductId).ToList();
                int purchasedBefore = purchaseDqBefore.Any() ? purchaseDqBefore.Sum(x => x.Quantity) : 0;
                var purchaseDqAfter = purchaseDetails.Where(x => x.Created >= request.StartDate && x.ProductId == pb.ProductId).ToList();
                int purchasedAfter = purchaseDqAfter.Any() ? purchaseDqAfter.Sum(x => x.Quantity) : 0;
                var saleDqBefore = saleDetails.Where(x => x.Created < request.StartDate && x.ProductId == pb.ProductId).ToList();
                int soldBefore = saleDqBefore.Any() ? saleDqBefore.Sum(x => x.Quantity) : 0;
                var saleDqAfter = saleDetails.Where(x => x.Created >= request.StartDate && x.ProductId == pb.ProductId).ToList();
                int soldAfter = saleDqAfter.Any() ? saleDqAfter.Sum(x => x.Quantity) : 0;

                StockDetailViewModel sdetail = new StockDetailViewModel
                {
                    StartingOnHand = pb.PhysicalOnHand + purchasedBefore - soldBefore,
                    StockIn = purchasedAfter,
                    ProductName = pb.ProductName,
                    StockOut = soldAfter,
                    BookmarkStartingOnHand = pb.PhysicalOnHand
                };
                sdetail.EndOnHand = sdetail.StartingOnHand + sdetail.StockIn - sdetail.StockOut;
                sdetail.CostTotal = pb.CostPrice * sdetail.EndOnHand;
                stockDetailViewModels.Add(sdetail);
            }

            StockViewModel stockViewModel = new StockViewModel()
            {
                BookmarkDate = bookmarkDate,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                CostTotal = stockDetailViewModels.Sum(x => x.CostTotal),
                StockDetailViewModels = stockDetailViewModels
            };
            // get purchase detail by productid & date range
            // get sale detail by productid & date range
            // prepare view model & return
            return stockViewModel;
        }

        public int Count(StockRequestModel request)
        {
            request.StartDate = request.StartDate.Date;
            request.EndDate = request.EndDate.Date.AddDays(1).AddMinutes(-1);

            Bookmark bookmark = db.Bookmarks.OrderByDescending(x => x.Created).FirstOrDefault(x => x.Created < request.StartDate);

            if (bookmark == null)
            {
                return 0;
            }
            IQueryable<ProductBookmark> queryablePBookmarks = bookmark.ProductBookmarks.AsQueryable();

            ProductBookmarkRequestModel pbRequestModel = new ProductBookmarkRequestModel(request.Keyword, "Modified", "False");
            queryablePBookmarks = pbRequestModel.GetOrderedData(queryablePBookmarks);
            queryablePBookmarks = pbRequestModel.SkipAndTake(queryablePBookmarks);
            return queryablePBookmarks.Count();
        }


    }
}
