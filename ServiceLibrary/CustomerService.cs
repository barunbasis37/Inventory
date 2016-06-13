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
using Vm = ViewModel.CustomerViewModel;
using Rm = RequestModel.CustomerRequestModel;
using Repo = RepositoryLibrary.CustomerRepository;
using M=Model.Customer;

namespace ServiceLibrary
{
    public class CustomerService : BaseService<M>
    {
        private readonly Repo repository;

        public CustomerService(Repo repository) : base(repository)
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
            IQueryable<Customer> queryable = request.GetOrderedData(Repository.Get());
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

        //public async Task<CustomerHistoryViewModel> GetHistoryAsync(string supplierId)
        //{
        //    var purchaseRequest = new PurchaseRequestModel("", "Modified", "True") {ParentId = supplierId};
        //    var purchaseService=new PurchaseService(new PurchaseRepository(repository.Db));
        //    var paymentRequest = new PaymentRequestModel("", "Modified", "True") {ParentId = supplierId};
        //    var paymentService = new PaymentService(new PaymentRepository(repository.Db));
        //    List<PurchaseViewModel> purchases = await purchaseService.SearchAsync(purchaseRequest);
        //    List<PaymentViewModel> payments = await paymentService.SearchAsync(paymentRequest);
        //    List<CustomerHistoryDetailViewModel> histories = new List<CustomerHistoryDetailViewModel>();
        //    histories.AddRange(purchases.ConvertAll(x=>new CustomerHistoryDetailViewModel(x)));
        //    histories.AddRange(payments.ConvertAll(x=>new CustomerHistoryDetailViewModel(x)));

        //    CustomerHistoryViewModel history = new CustomerHistoryViewModel
        //    {
        //        Payments = payments,
        //        Purchases = purchases,
        //        PurchaseTotal = purchases.Sum(x => x.Total),
        //        PaymentTotal = payments.Sum(x => x.Amount),
        //        Histories = histories.OrderBy(x=>x.Created).ToList()
        //    };
        //    return history;
        //}

       

        public bool UpdatePoint(string customerId)
        {
            IQueryable<Sale> sales = repository.Db.Sales.Where(x => x.CustomerId == customerId);
            int pointsEarned = 0;
            int pointsPaid = 0;

            if (sales.Any())
            {
                pointsEarned = sales.Select(x => x.PointsEarned).Sum(x => x != null ? x : 0);
                pointsPaid = sales.Select(x => x.PointsPaid).Sum(x => x != null ? x : 0);
            }
            
            var entity = repository.Db.Customers.Find(customerId);
            entity.Point = pointsEarned - pointsPaid;
            repository.Db.Entry(entity).State = EntityState.Modified;
            repository.Db.SaveChanges();
            return true;
        }

        public string GetBarcode()
        {
            int count = Repository.Get().Count() + 1;
            var now = DateTime.Now;
            String s = ""+now.Year+now.Month+now.Day;
            var queryable = repository.Get();
            do
            {
                var barcode = s + count.ToString().PadLeft(5, '1');
                var prod = queryable.FirstOrDefault(x => x.MembarshipCardNo == barcode) == null;
                if (prod)
                {
                    return barcode;
                }
                count = count + 1;
            } while (true);
        }
    }
}
