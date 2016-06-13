using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace WebApplication1.Models
{
    public enum ApplicationRoles
    {
        SuperAdmin = 1,
        Admin = 2,
        GeneralUser=3,
        Public
    }


    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }

        [Index("UniquePhone",IsUnique = true)]  
        [MaxLength(20)]       
        public override string PhoneNumber { get; set; }
    }

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole(string name) : base(name)
        {

        }

        public ApplicationRole()
        {

        }
        [StringLength(50)]
        public string Description { get; set; }

    }


    [Table("AspNetResources")]
    public class ApplicationResource
    {
        public ApplicationResource()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public virtual ICollection<ApplicationPermission> Permissions { get; set; }
    }

    [Table("AspNetPermissions")]
    public class ApplicationPermission
    {
        public ApplicationPermission()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Key]
        public string Id { get; set; }
        public string ResourceId { get; set; }
        public string RoleId { get; set; }
        public bool IsAllowed { get; set; }
        [ForeignKey("ResourceId")]
        public virtual ApplicationResource Resource { get; set; }
        [ForeignKey("RoleId")]
        public virtual ApplicationRole Role { get; set; }
    }


    public class SecurityDbContext : IdentityDbContext<ApplicationUser>
    {
        public SecurityDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static SecurityDbContext Create()
        {
            return new SecurityDbContext();
        }

        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<IdentityUserRole> ApplicationUserRoles { get; set; }

        public DbSet<ApplicationPermission> Permissions { get; set; }
        public DbSet<ApplicationResource> Resources { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}