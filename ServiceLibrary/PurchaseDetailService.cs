using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using RepositoryLibrary;
using RequestModel;
using ViewModel;
using Vm = ViewModel.PurchaseDetailViewModel;
using Rm = RequestModel.PurchaseDetailRequestModel;
using Repo = RepositoryLibrary.PurchaseDetailRepository;
using M=Model.PurchaseDetail;

namespace ServiceLibrary
{
    public class PurchaseDetailService : BaseService<M>
    {
        private readonly Repo repository;

        public PurchaseDetailService(Repo repository) : base(repository)
        {
            this.repository = repository;
        }
        
        public async Task<List<Vm>> GetAllAsync()
        {
            return await repository.Get().Select(x => new Vm(x)).ToListAsync();
        }
        
        public async Task<List<Vm>> SearchAsync(Rm request)
        {
            var list = await request.GetOrderedData(Repository.Get()).Include("Product").ToListAsync();
            return list.ConvertAll(x => new Vm(x));
        }

        public Vm GetDetail(string id)
        {
            var model = Repository.GetById(id);
            if (model==null)
            {
                return null;
            }
            return new Vm(model);
        }

        public override bool Add(M m)
        {
            bool added = base.Add(m);
            if (added)
            {
                ProductService productService = new ProductService(new ProductRepository(Repository.Db));
                productService.Purchase(m);
               // PurchaseService purchaseService=new PurchaseService(new PurchaseRepository(Repository.Db));
              //  purchaseService.UpdateTotal(m.PurchaseId);                
            }
            return added;
        }
    }
}
