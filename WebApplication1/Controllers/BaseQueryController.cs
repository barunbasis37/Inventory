using System.Web.Http;
using Model;

namespace WebApplication1.Controllers
{
    public class BaseQueryController<T> : ApiController
    {
        protected BusinessDbContext Db;
        public BaseQueryController()
        {
            Db = new BusinessDbContext();
        }
    }
}