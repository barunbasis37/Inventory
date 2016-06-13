using System;
using Model;

namespace ViewModel
{
    public class ProductsNameViewModel
    {
        public ProductsNameViewModel(Product product)
        {
            Id = product.Id;
            Name = product.Name;
            
        }

        public string Id { get; set; }
        public string ProductCode { get; set; }
        public string Name { get; set; }
    }
}
