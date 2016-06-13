namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PurchaseTotalAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Purchases", "Total", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Purchases", "Total");
        }
    }
}
