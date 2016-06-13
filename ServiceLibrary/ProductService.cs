using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aspose.BarCode;
using Model;
using RepositoryLibrary;
using RequestModel;
using ViewModel;
using Vm = ViewModel.ProductViewModel;
using Rm = RequestModel.ProductRequestModel;
using Repo = RepositoryLibrary.ProductRepository;
using M = Model.Product;

namespace ServiceLibrary
{
    public class ProductService : BaseService<M>
    {
        private readonly Repo repository;

        public ProductService(Repo repository) : base(repository)
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
            if (model == null)
            {
                return null;
            }
            return new Vm(model);
        }

        public bool Purchase(PurchaseDetail detail)
        {
            var p = GetById(detail.ProductId);
            p.Received = p.Received + detail.Quantity;
            p.OnHand = p.OnHand + detail.Quantity;
            return base.Edit(p);
        }

        public bool Sale(SaleDetail detail)
        {
            var p = GetById(detail.ProductId);
            p.Sold = p.Sold + detail.Quantity;
            p.OnHand = p.OnHand - detail.Quantity;
            return base.Edit(p);
        }

        public string GetBarcode()
        {
            int count = Repository.Get().Count() + 1;
            String s = "010101";
            IQueryable<Product> queryable = repository.Get();
            do
            {
                var barcode = s + count.ToString().PadLeft(6, '1');
                var prod = queryable.FirstOrDefault(x => x.BarCode == barcode) == null;
                if (prod)
                {
                    return barcode;
                }
                count = count + 1;
            } while (true);            
        }
    }
}
