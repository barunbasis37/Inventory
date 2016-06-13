using Model;

namespace ViewModel
{
    public class SupplierViewModel : BaseViewModel
    {
        public SupplierViewModel(Supplier x) : base(x)
        {
            this.Id = x.Id;
            this.Name = x.Name;
            this.Address = x.Address;
            this.Phone = x.Phone;
            this.CompanyName = x.CompanyName;
            this.Remarks = x.Remarks;
            this.Due = x.Due;
        }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CompanyName { get; set; }
        public string Remarks { get; set; }
        public double Due { get; set; }

    }
}