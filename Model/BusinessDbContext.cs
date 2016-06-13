using System;
using System.Data.Entity;
using System.Linq;

namespace Model
{
    public class BusinessDbContext : DbContext
    {
        public BusinessDbContext() : base("DefaultConnection")
        {
        }


        public override int SaveChanges()
        {
            var dbEntityEntries = ChangeTracker.Entries().Where(x => x.Entity is Entity);
            foreach (var entry in dbEntityEntries)
            {
                var entity = (Entity)entry.Entity;
                entity.Modified = DateTime.Now;
            }

            return base.SaveChanges();
        }

        public static BusinessDbContext Create()
        {
            return new BusinessDbContext();
        } 

        //tables 
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseDetail> PurchaseDetails { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SaleDetails { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<ProductBookmark> ProductBookmarks { get; set; }
    }
}