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
using Service =ServiceLibrary.SaleService;
using Repository = RepositoryLibrary.SaleRepository;
using Rm = RequestModel.SaleRequestModel;
using M= Model.Sale;

namespace WebApplication1.Controllers.QueryControllers
{
    public class SaleQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public SaleQueryController()
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

        [AllowAnonymous]
        [ActionName("Report")]
        [HttpGet]
        public HttpResponseMessage Report()
        {
            try
            {
                string tempPath = ConfigurationManager.AppSettings["TempPath"];
                long ticks = DateTime.Now.Ticks;
                string fileName = $"SalesReport-{ticks}.xls";
                string fullName = $"{tempPath}\\" + fileName;
                List<M> allAsync = service.GetAll();
                string headerValue = "Sale Report \n Printed " + DateTime.Now.ToString("dd-MM-yyyy");
                //List<SaleReportModel> reportdata = allAsync.Select(x => new SaleReportModel (x)).ToList();
                List<SaleReportModel> reportdata = allAsync.Select(x => new SaleReportModel(x)).ToList();
                SaleReportModel item = new SaleReportModel
                {
                    Memo = "Total",
                    BarcodePrice = reportdata.Sum(x => x.BarcodePrice),
                    Discount = reportdata.Sum(x=>x.Discount),
                    Total = reportdata.Sum(x=>x.Total),
                    CostPrice = reportdata.Sum(x => x.CostPrice),
                    CashReceived = reportdata.Where(x=>x.SaleType.Equals("Cash")).Sum(x => x.Total),
                    CardReceived = reportdata.Where(x => x.SaleType.Equals("Card")).Sum(x => x.Total),
                    InvoiceDate = DateTime.Now
                };

                reportdata.Add(item);
                GenericReportGenerator<SaleReportModel>.WriteExcel(reportdata, headerValue, fullName);
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
