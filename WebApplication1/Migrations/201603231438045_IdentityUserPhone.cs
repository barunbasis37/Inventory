namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IdentityUserPhone : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AspNetUsers", "PhoneNumber", c => c.String(maxLength: 20));
            CreateIndex("dbo.AspNetUsers", "PhoneNumber", unique: true, name: "UniquePhone");
        }
        
        public override void Down()
        {
            DropIndex("dbo.AspNetUsers", "UniquePhone");
            AlterColumn("dbo.AspNetUsers", "PhoneNumber", c => c.String());
        }
    }
}
