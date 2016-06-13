namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Added_TRX_in_Sale : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sales", "TRXNo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sales", "TRXNo");
        }
    }
}
