namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SupplierDue : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Suppliers", "Due", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Suppliers", "Due");
        }
    }
}
