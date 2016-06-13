using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class PurchaseDetailController : BaseCommandController<PurchaseDetail>
    {
        public PurchaseDetailController() : base(new PurchaseDetailService(new PurchaseDetailRepository(new BusinessDbContext())))
        {

        }
    }
}