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
using Vm = ViewModel.ProductBookmarkViewModel;
using Rm = RequestModel.ProductBookmarkRequestModel;
using Repo = RepositoryLibrary.ProductBookmarkRepository;
using M=Model.ProductBookmark;

namespace ServiceLibrary
{
    public class ProductBookmarkService : BaseService<M>
    {
        private readonly Repo repository;

        public ProductBookmarkService(Repo repository) : base(repository)
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
    }
}
