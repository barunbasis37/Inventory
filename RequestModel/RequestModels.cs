using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace RequestModel
{
   
    public class ProductRequestModel : RequestModel<Product>
    {
        public int MaxQuantity { get; set; }

        public ProductRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }



        protected override Expression<Func<Product, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Name.ToLower().Contains(Keyword) ||  x.BarCode.ToLower().Contains(Keyword);
            }
            if (MaxQuantity > 0)
            {
                ExpressionObj = ExpressionObj.And(x => x.OnHand < MaxQuantity);
            }

            return ExpressionObj;
        }
    }

    public class PaymentRequestModel : RequestModel<Payment>
    {
        public PaymentRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<Payment, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Supplier.Name.ToLower().Contains(Keyword) || x.Supplier.CompanyName.ToLower().Contains(Keyword) || x.Memo.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(ParentId))
            {
                ExpressionObj = ExpressionObj.And(x => x.SupplierId == ParentId);
            }
            if (StartDate != new DateTime() && EndDate != new DateTime())
            {
                StartDate = StartDate.Date;
                EndDate = EndDate.Date.AddDays(1).AddMinutes(-1);
                ExpressionObj = ExpressionObj.And(x => x.Created >= StartDate && x.Created <= EndDate);
            }
            return ExpressionObj;
        }
    }

    public class PurchaseRequestModel : RequestModel<Purchase>
    {
        public PurchaseRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<Purchase, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Supplier.Name.ToLower().Contains(Keyword) || x.Supplier.CompanyName.ToLower().Contains(Keyword) || x.Memo.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(ParentId))
            {
                  ExpressionObj =  ExpressionObj.And(x => x.SupplierId == ParentId);
            }
            if (StartDate != new DateTime() && EndDate != new DateTime())
            {
                StartDate = StartDate.Date;
                EndDate = EndDate.Date.AddDays(1).AddMinutes(-1);
                ExpressionObj = ExpressionObj.And(x => x.Created >= StartDate && x.Created <= EndDate);
            }
            return ExpressionObj;
        }
    }

    public class PurchaseDetailRequestModel : RequestModel<PurchaseDetail>
    {
        public PurchaseDetailRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<PurchaseDetail, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Product.Name.ToLower().Contains(Keyword) || x.Product.BarCode.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(ParentId))
            {
                ExpressionObj = ExpressionObj.And(x => x.PurchaseId == ParentId);
            }
            return ExpressionObj;
        }
    }

    public class SaleRequestModel : RequestModel<Sale>
    {
        
        public SaleRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<Sale, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Memo.ToLower().Contains(Keyword);
            }
            if (StartDate!=new DateTime() && EndDate != new DateTime())
            {
                StartDate = StartDate.Date;
                EndDate = EndDate.Date.AddDays(1).AddMinutes(-1);
                ExpressionObj = ExpressionObj.And(x => x.Created >= StartDate && x.Created <= EndDate);
            }

            return ExpressionObj;
        }
    }

    public class SaleDetailRequestModel : RequestModel<SaleDetail>
    {
        public SaleDetailRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<SaleDetail, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Product.Name.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(ParentId))
            {
                ExpressionObj = ExpressionObj.And(x => x.SaleId == ParentId);
            }

            return ExpressionObj;
        }
    }

    public class SupplierRequestModel : RequestModel<Supplier>
    {
        public SupplierRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<Supplier, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Name.ToLower().Contains(Keyword) || x.CompanyName.ToLower().Contains(Keyword) || x.Phone.ToLower().Contains(Keyword) || x.Address.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(Id))
            {
                ExpressionObj.And(x => x.Id == Id);
            }
            return ExpressionObj;
        }
    }

    public class CustomerRequestModel : RequestModel<Customer>
    {
        public CustomerRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }


        protected override Expression<Func<Customer, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Name.ToLower().Contains(Keyword) || x.MembarshipCardNo.ToLower().Contains(Keyword) || x.Phone.ToLower().Contains(Keyword) || x.Address.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(Id))
            {
                ExpressionObj.And(x => x.Id == Id);
            }
            return ExpressionObj;
        }
    }

    public class BookmarkRequestModel : RequestModel<Bookmark>
    {
        public BookmarkRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }

   
        protected override Expression<Func<Bookmark, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Remarks.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(Id))
            {
                ExpressionObj = ExpressionObj.And(x => x.Id == Id);
            }
            if (StartDate!=new DateTime() && EndDate != new DateTime())
            {
                StartDate = StartDate.Date;
                EndDate = EndDate.Date.AddDays(1).AddMinutes(-1);
                ExpressionObj = ExpressionObj.And(x => x.Created >= StartDate && x.Created <= EndDate);
            }
            return ExpressionObj;
        }
    }


    public class ProductBookmarkRequestModel : RequestModel<ProductBookmark>
    {
        public ProductBookmarkRequestModel(string keyword, string orderBy, string isAscending) : base(keyword, orderBy, isAscending)
        {
        }
         
        protected override Expression<Func<ProductBookmark, bool>> GetExpression()
        {
            if (!string.IsNullOrWhiteSpace(Keyword))
            {
                ExpressionObj = x => x.Remarks.ToLower().Contains(Keyword) && x.ProductName.ToLower().Contains(Keyword);
            }
            if (!string.IsNullOrWhiteSpace(Id))
            {
                ExpressionObj = ExpressionObj.And(x => x.Id == Id);
            }
            if (!string.IsNullOrWhiteSpace(ParentId))
            {
                ExpressionObj = ExpressionObj.And(x => x.BookmarkId == ParentId);
            }
            return ExpressionObj;
        }
    }


    public class StockRequestModel  
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int PerPageCount => 10;
        public int Page { get; set; }
        public string Keyword { get; set; }
    }   
}
