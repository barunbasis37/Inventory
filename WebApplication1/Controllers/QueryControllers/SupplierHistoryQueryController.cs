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
using Service = ServiceLibrary.SupplierService;
using Repository = RepositoryLibrary.SupplierRepository;
using Rm = RequestModel.SupplierRequestModel;
using M = Model.Supplier;


namespace WebApplication1.Controllers.QueryControllers
{
    public class SupplierHistoryQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public SupplierHistoryQueryController()
        {
            service = new Service(new Repository(Db));
        }
         
        public async Task<IHttpActionResult> Post(Rm request)
        {
            return Ok(await service.GetHistoryAsync(request.Id));
        }
    }
}
