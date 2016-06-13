using System.Threading.Tasks;
using System.Web.Http;
using Service =ServiceLibrary.ProductBookmarkService;
using Repository = RepositoryLibrary.ProductBookmarkRepository;
using Rm = RequestModel.ProductBookmarkRequestModel;
using M= Model.ProductBookmark;

namespace WebApplication1.Controllers.QueryControllers
{
    public class ProductBookmarkQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public ProductBookmarkQueryController()
        {
            service = new Service(new Repository(Db));
        }

        public IHttpActionResult Get(string id)
        {
            return Ok(service.GetDetail(id));
        }

       
        [ActionName("Data")]
        [HttpPost]
        public async Task<IHttpActionResult> Data(Rm request)
        {
            return Ok(await service.SearchAsync(request));
        }

        [ActionName("Count")]
        [HttpPost]
        public async Task<IHttpActionResult> Count(Rm request)
        {
            return Ok(await service.CountAsync(request));
        }
    }
}
