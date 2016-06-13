using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Model;
using ServiceLibrary;

namespace WebApplication1.Controllers
{
    public class BaseCommandController<T> : ApiController where T:Entity
    {
       
        protected BaseService<T> Service;
        
        protected BaseCommandController(BaseService<T> service)
        {
            Service = service;
        }


        public async Task<IHttpActionResult> Post(T model)
        {
            model.Id = Guid.NewGuid().ToString();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var add = Service.Add(model);
            return Ok(model.Id);
        }
        public async Task<IHttpActionResult> Put(T model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var edit = Service.Edit(model);

            return Ok(model);
        }

        public async Task<IHttpActionResult> Delete(string id)
        {
            var delete = Service.Delete(id);
            return Ok(delete);
        }
    }
}
