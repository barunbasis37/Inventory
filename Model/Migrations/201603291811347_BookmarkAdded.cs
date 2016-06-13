namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BookmarkAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bookmarks",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        QuantityDiffTotal = c.Int(nullable: false),
                        PriceDiffTotal = c.Double(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductBookmarks",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        BookmarkId = c.String(maxLength: 128),
                        ProductId = c.String(maxLength: 128),
                        SystemOnHand = c.Int(nullable: false),
                        PhysicalOnHand = c.Int(nullable: false),
                        QuantityDiff = c.Int(nullable: false),
                        CostPrice = c.Double(nullable: false),
                        PriceDiff = c.Double(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Bookmarks", t => t.BookmarkId)
                .ForeignKey("dbo.Products", t => t.ProductId)
                .Index(t => t.BookmarkId)
                .Index(t => t.ProductId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductBookmarks", "ProductId", "dbo.Products");
            DropForeignKey("dbo.ProductBookmarks", "BookmarkId", "dbo.Bookmarks");
            DropIndex("dbo.ProductBookmarks", new[] { "ProductId" });
            DropIndex("dbo.ProductBookmarks", new[] { "BookmarkId" });
            DropTable("dbo.ProductBookmarks");
            DropTable("dbo.Bookmarks");
        }
    }
}
