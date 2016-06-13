using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class SupplierController : BaseCommandController<Supplier>
    {
        public SupplierController() : base(new SupplierService(new SupplierRepository(new BusinessDbContext())))
        {

        }
    }
}