using System.Threading.Tasks;
using System.Web.Http;
using Service = ServiceLibrary.PurchaseDetailService;
using Repository = RepositoryLibrary.PurchaseDetailRepository;
using Rm = RequestModel.PurchaseDetailRequestModel;
using M = Model.PurchaseDetail;

namespace WebApplication1.Controllers.QueryControllers
{
    public class PurchaseDetailQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public PurchaseDetailQueryController()
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
