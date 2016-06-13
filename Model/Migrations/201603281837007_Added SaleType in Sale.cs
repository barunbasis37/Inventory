namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSaleTypeinSale : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "SaleType", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sales", "SaleType");
        }
    }
}
