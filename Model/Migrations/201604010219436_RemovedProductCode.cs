namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedProductCode : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Products", "IX_Productcode");
            DropColumn("dbo.Products", "ProductCode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "ProductCode", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Products", "ProductCode", unique: true, name: "IX_Productcode");
        }
    }
}
