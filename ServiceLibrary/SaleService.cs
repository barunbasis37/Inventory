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
using Vm = ViewModel.SaleViewModel;
using Rm = RequestModel.SaleRequestModel;
using Repo = RepositoryLibrary.SaleRepository;
using M=Model.Sale;

namespace ServiceLibrary
{
    public class SaleService : BaseService<M>
    {
        private readonly Repo repository;

        public SaleService(Repo repository) : base(repository)
        {
            this.repository = repository;
        }
        
        public async Task<List<Vm>> GetAllAsync()
        {
            return await repository.Get().Select(x => new Vm(x)).ToListAsync();
        }
        public List<M> GetAll()
        {
            return repository.Get().ToList();
        }
        public async Task<List<Vm>> SearchAsync(Rm request)
        {
            var queryable = request.GetOrderedData(Repository.Get());
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
           foreach (var saleDetail in m.SaleDetails)
           {
               saleDetail.Id = Guid.NewGuid().ToString();                              
           }
            if (m.PointsPaid==0)
            {
                int pointsEarned = (int) Math.Floor(m.Total / 50);
                m.PointsEarned = pointsEarned;
            }
            bool add = base.Add(m);
            if (add)
            {
                ProductService productService=new ProductService(new ProductRepository(Repository.Db));
                foreach (SaleDetail detail in m.SaleDetails)
                {
                    productService.Sale(detail);
                }    
                
                CustomerService customerService=new CustomerService(new CustomerRepository(repository.Db));
                bool updatePoint = customerService.UpdatePoint(m.CustomerId);
            }
            return true;
        }
    }
}
