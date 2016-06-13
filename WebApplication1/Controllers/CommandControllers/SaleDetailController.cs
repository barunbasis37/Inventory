using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class SaleDetailController : BaseCommandController<SaleDetail>
    {
        public SaleDetailController() : base(new SaleDetailService(new SaleDetailRepository(new BusinessDbContext())))
        {

        }
    }
}