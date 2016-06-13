namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PurchaseDetailsConnection : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PurchaseDetails", "PurchaseId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.PurchaseDetails", "PurchaseId");
            AddForeignKey("dbo.PurchaseDetails", "PurchaseId", "dbo.Purchases", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PurchaseDetails", "PurchaseId", "dbo.Purchases");
            DropIndex("dbo.PurchaseDetails", new[] { "PurchaseId" });
            DropColumn("dbo.PurchaseDetails", "PurchaseId");
        }
    }
}
