using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Product :Entity
    {
        [Required]
        [StringLength(100, ErrorMessage = "Product BarCode can be maximum 100 length", MinimumLength = 1)]
        [DataType(DataType.Text)]
        [Index("IX_Barcode", IsUnique = true)]
        public string BarCode { get; set; }
        
        [Required]
        [StringLength(100,ErrorMessage = "Product name can be maximum 100 length", MinimumLength = 1)]
        [DataType(DataType.Text)]
        [Index("IX_Name",IsUnique = true)]
        public string Name { get; set; }

        [StringLength(100, ErrorMessage = "Product GroupName can be maximum 100 length", MinimumLength = 1)]
        [DataType(DataType.Text)]
        public string GroupName { get; set; }

        [StringLength(100, ErrorMessage = "Product Brand can be maximum 100 length", MinimumLength = 1)]
        [DataType(DataType.Text)]
        public string Brand { get; set; }

        [Required]
        public int StartingInventory { get; set; }

        [Required]
        public int Received { get; set; }

        [Required]
        public int Sold { get; set; }

        [Required]
        [Index("IX_OnHand")]
        public int OnHand { get; set; }

        public int MinimumRequired { get; set; }

        [DataType(DataType.Currency)]
        public double CostPrice { get; set; }

        [DataType(DataType.Currency)]
        public double SalePrice { get; set; } 
    }
}
