using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class SaleController : BaseCommandController<Sale>
    {
        public SaleController() : base(new SaleService(new SaleRepository(new BusinessDbContext())))
        {

        }
    }
}