namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SaleItemTotalAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "ItemTotal", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sales", "ItemTotal");
        }
    }
}
