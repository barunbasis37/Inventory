using System.Linq;
using Model;

namespace RepositoryLibrary
{
    public class ProductRepository: BaseRepository<Product>
    {
        public ProductRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class PaymentRepository : BaseRepository<Payment>
    {
        public PaymentRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class PurchaseRepository : BaseRepository<Purchase>
    {
        public PurchaseRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class PurchaseDetailRepository : BaseRepository<PurchaseDetail>
    {
        public PurchaseDetailRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class SaleDetailRepository : BaseRepository<SaleDetail>
    {
        public SaleDetailRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class SaleRepository : BaseRepository<Sale>
    {
        public SaleRepository(BusinessDbContext db) : base(db)
        {
        }
    }
    public class SupplierRepository : BaseRepository<Supplier>
    {
        public SupplierRepository(BusinessDbContext db) : base(db)
        {
        }
    }

    public class CustomerRepository : BaseRepository<Customer>
    {
        public CustomerRepository(BusinessDbContext db) : base(db)
        {
        }
    }

    public class BookmarkRepository : BaseRepository<Bookmark>
    {
        public BookmarkRepository(BusinessDbContext db) : base(db)
        {
        }
    }

    public class ProductBookmarkRepository : BaseRepository<ProductBookmark>
    {
        public ProductBookmarkRepository(BusinessDbContext db) : base(db)
        {
        }
    }
}
