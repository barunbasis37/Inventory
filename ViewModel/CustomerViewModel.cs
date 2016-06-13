using Model;

namespace ViewModel
{
    public class CustomerViewModel : BaseViewModel
    {
        public CustomerViewModel(Customer x) : base(x)
        {
            this.Name = x.Name;
            this.Address = x.Address;
            this.Phone = x.Phone;
            this.Email = x.Email;
            this.Remarks = x.Remarks;
            this.Point = x.Point;
            this.MembarshipCardNo = x.MembarshipCardNo;
        }

        public string MembarshipCardNo { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Remarks { get; set; }
        public int Point { get; set; }

    }
}