using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class CustomerController : BaseCommandController<Customer>
    {
        public CustomerController() : base(new CustomerService(new CustomerRepository(new BusinessDbContext())))
        {

        }
    }
}