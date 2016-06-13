namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InventotyModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Payments",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        SupplierId = c.String(nullable: false, maxLength: 128),
                        Amount = c.Double(nullable: false),
                        Memo = c.String(),
                        PayBy = c.String(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Suppliers", t => t.SupplierId, cascadeDelete: true)
                .Index(t => t.SupplierId);
            
            CreateTable(
                "dbo.Suppliers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 100),
                        Address = c.String(),
                        Phone = c.String(nullable: false, maxLength: 20),
                        CompanyName = c.String(),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, name: "IX_SupName")
                .Index(t => t.Phone, unique: true, name: "IX_SupPhone");
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        BarCode = c.String(nullable: false, maxLength: 100),
                        ProductCode = c.String(nullable: false, maxLength: 100),
                        Name = c.String(nullable: false, maxLength: 100),
                        GroupName = c.String(maxLength: 100),
                        Brand = c.String(maxLength: 100),
                        StartingInventory = c.Int(nullable: false),
                        Received = c.Int(nullable: false),
                        Sold = c.Int(nullable: false),
                        OnHand = c.Int(nullable: false),
                        MinimumRequired = c.Int(nullable: false),
                        CostPrice = c.Double(nullable: false),
                        SalePrice = c.Double(nullable: false),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.BarCode, unique: true, name: "IX_Barcode")
                .Index(t => t.ProductCode, unique: true, name: "IX_Productcode")
                .Index(t => t.Name, unique: true)
                .Index(t => t.OnHand);
            
            CreateTable(
                "dbo.PurchaseDetails",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        ProductId = c.String(nullable: false, maxLength: 128),
                        Quantity = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        Total = c.Double(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Purchases",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Memo = c.String(),
                        SupplierId = c.String(nullable: false, maxLength: 128),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Suppliers", t => t.SupplierId, cascadeDelete: true)
                .Index(t => t.SupplierId);
            
            CreateTable(
                "dbo.SaleDetails",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        SaleId = c.String(maxLength: 128),
                        ProductId = c.String(maxLength: 128),
                        Quantity = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        Total = c.Double(nullable: false),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.ProductId)
                .ForeignKey("dbo.Sales", t => t.SaleId)
                .Index(t => t.SaleId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Sales",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Memo = c.String(),
                        Total = c.Double(nullable: false),
                        Paid = c.Double(nullable: false),
                        Return = c.Double(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SaleDetails", "SaleId", "dbo.Sales");
            DropForeignKey("dbo.SaleDetails", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Purchases", "SupplierId", "dbo.Suppliers");
            DropForeignKey("dbo.PurchaseDetails", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Payments", "SupplierId", "dbo.Suppliers");
            DropIndex("dbo.SaleDetails", new[] { "ProductId" });
            DropIndex("dbo.SaleDetails", new[] { "SaleId" });
            DropIndex("dbo.Purchases", new[] { "SupplierId" });
            DropIndex("dbo.PurchaseDetails", new[] { "ProductId" });
            DropIndex("dbo.Products", new[] { "OnHand" });
            DropIndex("dbo.Products", new[] { "Name" });
            DropIndex("dbo.Products", "IX_Productcode");
            DropIndex("dbo.Products", "IX_Barcode");
            DropIndex("dbo.Suppliers", "IX_SupPhone");
            DropIndex("dbo.Suppliers", "IX_SupName");
            DropIndex("dbo.Payments", new[] { "SupplierId" });
            DropTable("dbo.Sales");
            DropTable("dbo.SaleDetails");
            DropTable("dbo.Purchases");
            DropTable("dbo.PurchaseDetails");
            DropTable("dbo.Products");
            DropTable("dbo.Suppliers");
            DropTable("dbo.Payments");
        }
    }
}
