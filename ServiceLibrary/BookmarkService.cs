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
using Vm = ViewModel.BookmarkViewModel;
using Rm = RequestModel.BookmarkRequestModel;
using Repo = RepositoryLibrary.BookmarkRepository;
using M=Model.Bookmark;

namespace ServiceLibrary
{
    public class BookmarkService : BaseService<M>
    {
        private readonly Repo repository;

        public BookmarkService(Repo repository) : base(repository)
        {
            this.repository = repository;
        }
        
        public async Task<List<Vm>> GetAllAsync()
        {
            return await repository.Get().Select(x => new Vm(x)).ToListAsync();
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
            ProductRepository productRepository = new ProductRepository(Repository.Db);
            var productBookmarks = productRepository.Get().ToList().Select(x => new ProductBookmark()
            {
                Id = Guid.NewGuid().ToString(),
                BookmarkId = m.Id,
                CostPrice = x.CostPrice,
                Created = m.Created,
                Modified = m.Modified,
                CreatedBy = m.CreatedBy,
                ModifiedBy = m.ModifiedBy,
                PhysicalOnHand = x.OnHand,
                PriceDiff = 0,
                ProductId = x.Id,
                QuantityDiff = 0,
                Remarks = "",
                SystemOnHand = x.OnHand,
                ProductName = x.Name
            }).ToList();
            m.ProductBookmarks = productBookmarks;
            bool add = base.Add(m);            
            return add;
        }
    }
}
