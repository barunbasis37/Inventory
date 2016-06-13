using System.Collections.Generic;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApplication1.Models;
using WebApplication1.Permission;

namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SecurityDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SecurityDbContext context)
        {
            AddRoles(context);
            AddUser(context, ApplicationRoles.SuperAdmin.ToString(), "foyzulkarim@gmail.com","01789117984");
            AddUser(context, ApplicationRoles.Admin.ToString(), "admin@project.com","01835555601");
            AddUser(context,
               ApplicationRoles.GeneralUser.ToString(), "sales@shopperszone.com", "01841612234");
            
            AddResources(context);
            AddPermissions(context);
        }

        private void AddUser(SecurityDbContext db, string role, string email, string phone)
        {
            ApplicationUserManager manager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));
            ApplicationUser user = manager.FindByEmail(email);
            if (user == null)
            {
                user = new ApplicationUser() { Email = email, UserName = email, EmailConfirmed = true, PhoneNumber = phone};
                IdentityResult result = manager.Create(user, "Pass@123");
                if (result.Succeeded)
                {
                    manager.AddToRole(user.Id, role);
                }
            }
        }

        private void AddPermissions(SecurityDbContext db)
        {

            var roles = db.ApplicationRoles.ToList();

            //add superadmin & admin permissions
            ApplicationRole admin = roles.First(x => x.Name == ApplicationRoles.Admin.ToString());
            AddRolePermissions(db, admin.Id);
            ApplicationRole superAdmin = roles.First(x => x.Name == ApplicationRoles.SuperAdmin.ToString());
            AddRolePermissions(db, superAdmin.Id);

        }

        private static void AddRolePermissions(SecurityDbContext db, string roleId)
        {
            var resources = db.Resources.ToList();
            foreach (var resource in resources)
            {
                var permission = db.Permissions.FirstOrDefault(x => x.ResourceId == resource.Id && x.RoleId == roleId);
                if (permission == null || permission.Id == new Guid().ToString())
                {
                    permission = new ApplicationPermission()
                    {
                        Id = Guid.NewGuid().ToString(),
                        ResourceId = resource.Id,
                        IsAllowed = true,
                        RoleId = roleId,
                    };
                    db.Permissions.Add(permission);
                }
                db.SaveChanges();
            }
        }

        private void AddRoles(SecurityDbContext context)
        {
            List<string> list = Enum.GetNames(typeof(ApplicationRoles)).ToList();
            foreach (string r in list)
            {
                ApplicationRole role = context.ApplicationRoles.FirstOrDefault(x => x.Name == r);
                if (role == null)
                {
                    context.Roles.Add(new ApplicationRole(r) { Description = r });
                    context.SaveChanges();
                }
            }
        }

        private static void AddResources(SecurityDbContext context)
        {
            List<string> names = RoutesProvider.GetAllRoutes();
            foreach (var name in names)
            {
                var resource = context.Resources.FirstOrDefault(x => x.Name == name);
                if (resource == null)
                {
                    var r = new ApplicationResource
                    {
                        IsPublic = false,
                        Name = name,
                    };
                    context.Resources.Add(r);
                }
            }
        }
    }
}
