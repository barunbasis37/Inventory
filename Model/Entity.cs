using System;
using System.ComponentModel.DataAnnotations;

namespace Model
{
    public abstract class Entity
    {

        private const string Key = "DbContext";

        [Key]
        public string Id { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime Modified { get; set; }
        [Required]
        public string ModifiedBy { get; set; }

        private static string DbContextKey => Key;

        protected static BusinessDbContext GetDbContext(ValidationContext validationContext)
        {
            var dbContext = validationContext.Items.Count == 0
                ? null
                : validationContext.Items.ContainsKey(DbContextKey) == false
                    ? null
                    : validationContext.Items[DbContextKey] as BusinessDbContext;
            return dbContext;
        }
    }
}