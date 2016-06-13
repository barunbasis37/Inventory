using Model;
using RepositoryLibrary;
using ServiceLibrary;

namespace WebApplication1.Controllers.CommandControllers
{
    public class PaymentController : BaseCommandController<Payment>
    {
        public PaymentController() : base(new PaymentService(new PaymentRepository(new BusinessDbContext())))
        {

        }
    }
}