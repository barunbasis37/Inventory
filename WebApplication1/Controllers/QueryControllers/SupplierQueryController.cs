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
using Service = ServiceLibrary.SupplierService;
using Repository = RepositoryLibrary.SupplierRepository;
using Rm = RequestModel.SupplierRequestModel;
using M = Model.Supplier;


namespace WebApplication1.Controllers.QueryControllers
{
    public class SupplierQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public SupplierQueryController()
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

        [AllowAnonymous]
        [ActionName("Report")]
        [HttpGet]
        public HttpResponseMessage Report()
        {
            try
            {
                string tempPath = ConfigurationManager.AppSettings["TempPath"];
                long ticks = DateTime.Now.Ticks;
                string fileName = $"SuppliersReport-{ticks}.xls";
                string fullName = $"{tempPath}\\" + fileName;
                List<SupplierViewModel> allAsync = service.GetAll();
                string headerValue = "Supplier Report \n Printed " + DateTime.Now.ToString("dd-MM-yyyy");
                List<SupplierReportModel> reportdata = allAsync.Select(x => new SupplierReportModel {  Name = x.Name, Address = x.Address, Phone = x.Phone, Due = x.Due, Modified = x.Modified }).ToList();
                SupplierReportModel item = new SupplierReportModel
                {
                    Name = "Total",
                    Due = reportdata.Sum(x => x.Due),
                    Modified = DateTime.Now
                };

                reportdata.Add(item);
                GenericReportGenerator<SupplierReportModel>.WriteExcel(reportdata, headerValue, fullName);
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
