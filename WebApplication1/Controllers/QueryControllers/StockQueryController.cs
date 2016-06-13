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
using ViewModel;


namespace WebApplication1.Controllers.QueryControllers
{
    public class StockQueryController : BaseQueryController<Bookmark>
    {
        private readonly StockService service;

        public StockQueryController()
        {
            service = new StockService(Db);
        }
        
        [ActionName("Data")]
        [HttpPost]
        public IHttpActionResult Data(StockRequestModel request)
        {
            StockViewModel stockViewModel = service.Search(request);
            return Ok(stockViewModel);
        }

        [ActionName("Count")]
        [HttpPost]
        public IHttpActionResult Count(StockRequestModel request)
        {
            return Ok(service.Count(request));
        }
    }
}
