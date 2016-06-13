using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using Aspose.BarCode;
using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers
{
    public class BarcodeImageController : ApiController
    {
        [AllowAnonymous]
        public HttpResponseMessage Get(string id)
        {
            string uploadPath="";
            //uploadPath = HttpContext.Current.Server.MapPath("~/BarcodeImages");
            uploadPath = ConfigurationManager.AppSettings["BarcodeImages"];
            string filename = uploadPath + "/" + id + ".png";
            if (!File.Exists(filename))
            {
                ProductRepository repository = new ProductRepository(new BusinessDbContext());
                ProductService service = new ProductService(repository);
                Product model = service.GetById(id);                           
                BarCodeBuilder builder = new BarCodeBuilder(model.BarCode);
                string text = $"{model.Name} \n MRP: {model.SalePrice} Tk";
                Caption captionBelow = new Caption(text)
                {
                    TextAlign = StringAlignment.Center,
                    Font = new Font(FontFamily.GenericSansSerif, 10, FontStyle.Bold)
                };
                builder.CaptionBelow = captionBelow;

                builder.Save(filename, ImageFormat.Png);
                
            }

            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new System.IO.FileStream(filename, System.IO.FileMode.Open);
            response.Content = new StreamContent(stream);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");
            return response;
        }

        public IHttpActionResult Delete(string id)
        {
            string uploadPath = "";
            //uploadPath = HttpContext.Current.Server.MapPath("~/BarcodeImages");
            uploadPath = ConfigurationManager.AppSettings["BarcodeImages"];
            string filename = uploadPath + "/" + id + ".png";
            if (File.Exists(filename))
            {
                File.Delete(filename);
            }
            return Ok();
        }


    }
}
