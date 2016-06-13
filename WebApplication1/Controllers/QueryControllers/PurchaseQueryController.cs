using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using ReportGenerator;
using ViewModel;
using Service = ServiceLibrary.PurchaseService;
using Repository = RepositoryLibrary.PurchaseRepository;
using Rm = RequestModel.PurchaseRequestModel;
using M = Model.Purchase;

namespace WebApplication1.Controllers.QueryControllers
{
    public class PurchaseQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public PurchaseQueryController()
        {
            service = new Service(new Repository(Db));
        }

        public IHttpActionResult Get(string id)
        {
            return Ok(service.GetDetail(id));
        }

        public async Task<IHttpActionResult> Get(string keyword, string orderBy, string isAsc)
        {
            var request = new Rm(keyword, orderBy, isAsc);
            var products = await service.SearchAsync(request);
            return Ok(products);
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

        [AllowAnonymous]
        [ActionName("Report")]
        [HttpGet]
        public HttpResponseMessage Report()
        {
            try
            {
                string tempPath = ConfigurationManager.AppSettings["TempPath"];
                long ticks = DateTime.Now.Ticks;
                string fileName = $"PurchasesReport-{ticks}.xls";
                string fullName = $"{tempPath}\\" + fileName;
                List<PurchaseViewModel> allAsync = service.GetAll();
                string headerValue = "Purchase Report \n Printed " + DateTime.Now.ToString("dd-MM-yyyy");
                List<PurchaseReportModel> reportdata = allAsync.Select(x => new PurchaseReportModel { Created= x.Created,Supplier = x.Supplier.Name,Memo = x.Memo,Total = x.Total, Modified = x.Modified }).ToList();
                PurchaseReportModel item = new PurchaseReportModel
                {
                    Supplier = "Total",
                    Total = reportdata.Sum(x => x.Total),
                    Modified = DateTime.Now,
                    Created = DateTime.Now
                };

                reportdata.Add(item);
                GenericReportGenerator<PurchaseReportModel>.WriteExcel(reportdata, headerValue, fullName);
                HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                var stream = new FileStream(fullName, FileMode.Open);
                result.Content = new StreamContent(stream);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileName
                };
                return result;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
    }
}
