using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using WebApplication1.Permission;

namespace WebApplication1.Controllers
{
    public class SideMenuController : ApiController
    {
        public  IHttpActionResult Get()
        {
            if (User.Identity.IsAuthenticated)
            {
                string id = User.Identity.GetUserId();
                ApplicationUserManager userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                IList<string> roles = userManager.GetRoles(id);
                string role = roles.FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(role))
                {
                    return Ok(RoutesProvider.GetRoutesByRole(role));
                }
            }
            List<string> list =  RoutesProvider.GetPublicRoutes();
            return Ok(list);
        }

        
    }
}
