namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedProductFromPBookmark : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductBookmarks", "ProductId", "dbo.Products");
            DropIndex("dbo.ProductBookmarks", new[] { "ProductId" });
            AddColumn("dbo.ProductBookmarks", "ProductName", c => c.String());
            AlterColumn("dbo.ProductBookmarks", "ProductId", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ProductBookmarks", "ProductId", c => c.String(maxLength: 128));
            DropColumn("dbo.ProductBookmarks", "ProductName");
            CreateIndex("dbo.ProductBookmarks", "ProductId");
            AddForeignKey("dbo.ProductBookmarks", "ProductId", "dbo.Products", "Id");
        }
    }
}
