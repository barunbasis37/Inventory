using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class PurchaseController : BaseCommandController<Purchase>
    {
        public PurchaseController() : base(new PurchaseService(new PurchaseRepository(new BusinessDbContext())))
        {

        }
    }
}