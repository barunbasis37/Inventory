using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using System.Web.Http;
using ReportGenerator;
using ViewModel;
using Service =ServiceLibrary.ProductService;
using Repository = RepositoryLibrary.ProductRepository;
using Rm = RequestModel.ProductRequestModel;
using M= Model.Product;

namespace WebApplication1.Controllers.QueryControllers
{
    public class ProductQueryController : BaseQueryController<M>
    {
        private readonly Service service;

        public ProductQueryController()
        {
            service = new Service(new Repository(Db));
        }

        public IHttpActionResult Get(string id)
        {
            return Ok(service.GetDetail(id));
        }
        [ActionName("Barcode")]
        [HttpGet]
        public IHttpActionResult GetBarcode()
        {
            string barcode = service.GetBarcode();
            return Ok(barcode);
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
                string fileName = $"ProductsReport-{ticks}.xls";
                string fullName = $"{tempPath}\\" + fileName;
                List<ProductViewModel> allAsync = service.GetAll();
                string headerValue = "Product Report \n Printed "+DateTime.Now.ToString("dd-MM-yyyy");
                List<ProductReportModel> reportdata = allAsync.Select(x => new ProductReportModel{ BarCode = x.BarCode, Name =x.Name, GroupName =x.GroupName,Brand = x.Brand,OnHand = x.OnHand, CostPrice = x.CostPrice, SalePrice = x.SalePrice, CostTotal=x.OnHand*x.CostPrice, Modified =x.Modified}).ToList();
                ProductReportModel item = new ProductReportModel
                {
                    BarCode = "Total",
                    CostTotal = reportdata.Sum(x => x.CostTotal), Modified = DateTime.Now
                };

                reportdata.Add(item);
                GenericReportGenerator<ProductReportModel>.WriteExcel(reportdata,headerValue,fullName);
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
