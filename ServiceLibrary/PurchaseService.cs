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
using Vm = ViewModel.PurchaseViewModel;
using Rm = RequestModel.PurchaseRequestModel;
using Repo = RepositoryLibrary.PurchaseRepository;
using M=Model.Purchase;

namespace ServiceLibrary
{
    public class PurchaseService : BaseService<M>
    {
        private readonly Repo repository;

        public PurchaseService(Repo repository) : base(repository)
        {
            this.repository = repository;
        }
        
        public async Task<List<Vm>> GetAllAsync()
        {
            return await repository.Get().Select(x => new Vm(x)).ToListAsync();
        }
        public List<Vm> GetAll()
        {
            return repository.Get().Include(y => y.Supplier).ToList().ConvertAll(x => new Vm(x)).ToList();
        }

        public async Task<List<Vm>> SearchAsync(Rm request)
        {
            IQueryable<Purchase> queryable = request.GetOrderedData(Repository.Get()).Include(y=> y.Supplier);
            queryable = request.SkipAndTake(queryable);
            var list = await queryable.ToListAsync();
            return list.ConvertAll(x => new Vm(x));
        }
        public async Task<int> CountAsync(Rm request)
        {
            var queryable = request.GetOrderedData(Repository.Get());
            var count = await queryable.CountAsync();
            return count;
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
                UpdateTotal(m.Id);
            }
            return added;
        }

        public override bool Edit(M m)
        {
            bool added = base.Edit(m);
            if (added)
            {
                UpdateTotal(m.Id);
            }
            return added;
        }


        public bool UpdateTotal(string purchaseId)
        {
            var purchase = GetById(purchaseId);
          //  purchase.Total = purchase.PurchaseDetails.Sum(x => x.Total);
         //   bool updateTotal = Edit(purchase);
            SupplierService supplierService=new SupplierService(new SupplierRepository(Repository.Db));
            bool updated = supplierService.UpdateDue(purchase.SupplierId);
            return updated;
        }
    }
}
