namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedPropName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "CostTotal", c => c.Double(nullable: false));
            DropColumn("dbo.Sales", "CostPrice");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Sales", "CostPrice", c => c.Double(nullable: false));
            DropColumn("dbo.Sales", "CostTotal");
        }
    }
}
