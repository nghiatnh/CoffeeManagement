using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Bill
    {
        public long Id { get; set; }
        public string Paytime { get; set; }
        public long? Idstaff { get; set; }
        public long? Idcustomer { get; set; }
        public long? Iddiscount { get; set; }

        public virtual Order IdNavigation { get; set; }
        public virtual Customer IdcustomerNavigation { get; set; }
        public virtual Discountcode IddiscountNavigation { get; set; }
        public virtual Staff IdstaffNavigation { get; set; }
    }
}
