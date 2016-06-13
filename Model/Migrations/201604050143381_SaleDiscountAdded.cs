namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SaleDiscountAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "Discount", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sales", "Discount");
        }
    }
}
