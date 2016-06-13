namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SalesPropertyAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleDetails", "CostTotal", c => c.Double(nullable: false));
            AddColumn("dbo.Sales", "CardName", c => c.String());
            AddColumn("dbo.Sales", "CostPrice", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sales", "CostPrice");
            DropColumn("dbo.Sales", "CardName");
            DropColumn("dbo.SaleDetails", "CostTotal");
        }
    }
}
