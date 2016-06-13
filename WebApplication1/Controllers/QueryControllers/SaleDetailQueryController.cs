using System.Threading.Tasks;
using System.Web.Http;
using Service = ServiceLibrary.SaleDetailService;
using Repository = RepositoryLibrary.SaleDetailRepository;
using Rm = RequestModel.SaleDetailRequestModel;
using M = Model.SaleDetail;

namespace WebApplication1.Controllers.QueryControllers
{
    public class SaleDetailQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public SaleDetailQueryController()
        {
            service = new Service(new Repository(Db));
        }

        public IHttpActionResult Get(string id)
        {
            return Ok(service.GetDetail(id));
        }
        
        public async Task<IHttpActionResult> Post(Rm request)
        {
            return Ok(await service.SearchAsync(request));
        }
    }
}
