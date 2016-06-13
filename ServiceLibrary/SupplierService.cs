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
using Vm = ViewModel.SupplierViewModel;
using Rm = RequestModel.SupplierRequestModel;
using Repo = RepositoryLibrary.SupplierRepository;
using M=Model.Supplier;

namespace ServiceLibrary
{
    public class SupplierService : BaseService<M>
    {
        private readonly Repo repository;

        public SupplierService(Repo repository) : base(repository)
        {
            this.repository = repository;
        }
        
        public async Task<List<Vm>> GetAllAsync()
        {
            return await repository.Get().Select(x => new Vm(x)).ToListAsync();
        }
        public List<Vm> GetAll()
        {
            return repository.Get().ToList().ConvertAll(x => new Vm(x)).ToList();
        }

        public async Task<List<Vm>> SearchAsync(Rm request)
        {
            IQueryable<Supplier> queryable = request.GetOrderedData(Repository.Get());
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

        public async Task<SupplierHistoryViewModel> GetHistoryAsync(string supplierId)
        {
            var purchaseRequest = new PurchaseRequestModel("", "Modified", "True") {ParentId = supplierId};
            var purchaseService=new PurchaseService(new PurchaseRepository(repository.Db));
            var paymentRequest = new PaymentRequestModel("", "Modified", "True") {ParentId = supplierId};
            var paymentService = new PaymentService(new PaymentRepository(repository.Db));
            List<PurchaseViewModel> purchases = await purchaseService.SearchAsync(purchaseRequest);
            List<PaymentViewModel> payments = await paymentService.SearchAsync(paymentRequest);
            List<SupplierHistoryDetailViewModel> histories = new List<SupplierHistoryDetailViewModel>();
            histories.AddRange(purchases.ConvertAll(x=>new SupplierHistoryDetailViewModel(x)));
            histories.AddRange(payments.ConvertAll(x=>new SupplierHistoryDetailViewModel(x)));

            SupplierHistoryViewModel history = new SupplierHistoryViewModel
            {
                Payments = payments,
                Purchases = purchases,
                PurchaseTotal = purchases.Sum(x => x.Total),
                PaymentTotal = payments.Sum(x => x.Amount),
                Histories = histories.OrderBy(x=>x.Created).ToList()
            };
            return history;
        }

       

        public bool UpdateDue(string supplierId)
        {
            IQueryable<Purchase> supplierPurchases = repository.Db.Purchases.Where(x => x.SupplierId == supplierId);
            double purchaseTotal = 0;
            if (supplierPurchases.Any())
            {
                purchaseTotal = supplierPurchases
                    .Select(x => x.Total)
                    .Sum(x => x != null ? x : 0);
            }
            

            IQueryable<Payment> supplierPayments = repository.Db.Payments.Where(x => x.SupplierId == supplierId);
            double paymentTotal=0;
            if (supplierPayments.Any())
            {
                paymentTotal = supplierPayments
                    .Select(x => x.Amount)
                    .Sum(x => x != null ? x : 0);
            }

            var entity = repository.Db.Suppliers.Find(supplierId);
            entity.Due = purchaseTotal - paymentTotal;
            repository.Db.Entry(entity).State = EntityState.Modified;
            repository.Db.SaveChanges();
            return true;
        }
    }
}
