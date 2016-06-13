namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomerAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        MembarshipCardNo = c.String(nullable: false),
                        Name = c.String(nullable: false, maxLength: 100),
                        Address = c.String(),
                        Phone = c.String(nullable: false, maxLength: 20),
                        Email = c.String(maxLength: 30),
                        Point = c.Int(nullable: false),
                        Remarks = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        ModifiedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, name: "IX_CustName")
                .Index(t => t.Phone, unique: true, name: "IX_CustPhone");
            
            AddColumn("dbo.Sales", "CustomerId", c => c.String(maxLength: 128));
            AddColumn("dbo.Sales", "PointsEarned", c => c.Int(nullable: false));
            AddColumn("dbo.Sales", "PointsPaid", c => c.Int(nullable: false));
            CreateIndex("dbo.Sales", "CustomerId");
            AddForeignKey("dbo.Sales", "CustomerId", "dbo.Customers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sales", "CustomerId", "dbo.Customers");
            DropIndex("dbo.Sales", new[] { "CustomerId" });
            DropIndex("dbo.Customers", "IX_CustPhone");
            DropIndex("dbo.Customers", "IX_CustName");
            DropColumn("dbo.Sales", "PointsPaid");
            DropColumn("dbo.Sales", "PointsEarned");
            DropColumn("dbo.Sales", "CustomerId");
            DropTable("dbo.Customers");
        }
    }
}
