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
using Vm = ViewModel.SaleDetailViewModel;
using Rm = RequestModel.SaleDetailRequestModel;
using Repo = RepositoryLibrary.SaleDetailRepository;
using M=Model.SaleDetail;

namespace ServiceLibrary
{
    public class SaleDetailService : BaseService<M>
    {
        private readonly Repo repository;

        public SaleDetailService(Repo repository) : base(repository)
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
    }
}
