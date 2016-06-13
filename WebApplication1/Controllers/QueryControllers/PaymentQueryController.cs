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
using Model;
using ReportGenerator;
using RepositoryLibrary;
using RequestModel;
using ServiceLibrary;
using ViewModel;
using Service = ServiceLibrary.PaymentService;
using Repository = RepositoryLibrary.PaymentRepository;
using Rm = RequestModel.PaymentRequestModel;
using M = Model.Payment;


namespace WebApplication1.Controllers.QueryControllers
{
    public class PaymentQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public PaymentQueryController()
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
                string fileName = $"PaymentsReport-{ticks}.xls";
                string fullName = $"{tempPath}\\" + fileName;
                List<PaymentViewModel> allAsync = service.GetAll();
                string headerValue = "Payment Report \n Printed " + DateTime.Now.ToString("dd-MM-yyyy");
                List<PaymentReportModel> reportdata = allAsync.Select(x => new PaymentReportModel { Date = x.Created, Supplier = x.Supplier.Name, Memo = x.Memo, Amount = x.Amount,PayBy = x.PayBy, Modified = x.Modified }).ToList();
                PaymentReportModel item = new PaymentReportModel
                {
                    Supplier = "Total",
                    Amount = reportdata.Sum(x => x.Amount),
                    Modified = DateTime.Now,
                    Date = DateTime.Now
                };

                reportdata.Add(item);
                GenericReportGenerator<PaymentReportModel>.WriteExcel(reportdata, headerValue, fullName);
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
