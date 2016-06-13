namespace Model.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Model.BusinessDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Model.BusinessDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            const string by = "foyzulkarim@gmail.com";
            var annonmousCustomer = new Customer()
            {
                Address = "Dhaka",
                Id = new Guid().ToString(),
                Created = DateTime.Now,
                Modified = DateTime.Now,
                CreatedBy = by,
                ModifiedBy = by,
                Point = 0,
                Email = "",
                MembarshipCardNo = "0",
                Name = "Annonymous",
                Remarks = "",
                Phone = "0"
            };
            Customer customer = context.Customers.FirstOrDefault(x => x.Name == annonmousCustomer.Name);
            if (customer==null)
            {
                context.Customers.Add(annonmousCustomer);
                context.SaveChanges();
            }
        }
    }
}
