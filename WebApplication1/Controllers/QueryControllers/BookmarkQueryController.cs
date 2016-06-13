using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Model;
using RepositoryLibrary;
using RequestModel;
using ServiceLibrary;
using Service = ServiceLibrary.BookmarkService;
using Repository = RepositoryLibrary.BookmarkRepository;
using Rm = RequestModel.BookmarkRequestModel;
using M = Model.Bookmark;


namespace WebApplication1.Controllers.QueryControllers
{
    public class BookmarkQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public BookmarkQueryController()
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
