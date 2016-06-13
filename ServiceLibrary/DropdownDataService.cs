using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Model;
using RepositoryLibrary;
using ViewModel;

namespace ServiceLibrary
{
 
    public class DropdownDataService
    {
        private BusinessDbContext db;
        public DropdownDataService(BusinessDbContext db)
        {
            this.db = db;
        }
      

        public async Task<List<DropdownViewModel>> GetList(string name)
        {

            switch (name)
            {
                case "product":
                    return await db.Products.Select(x => new DropdownViewModel() {Id = x.Id, Name = x.Name}).ToListAsync();
                case "supplier":
                    return await db.Suppliers.Select(x => new DropdownViewModel() { Id = x.Id, Name = x.Name }).ToListAsync();
                default:
                    return null;
            }
        }
    }

  

}
