using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class ProductController : BaseCommandController<Product>
    {
        public ProductController() : base(new ProductService(new ProductRepository(new BusinessDbContext())))
        {
            
        }
    }
}