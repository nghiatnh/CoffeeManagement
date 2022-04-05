using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Discountcode
    {
        public Discountcode()
        {
            Bills = new HashSet<Bill>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public double? Count { get; set; }
        public double? Minprice { get; set; }
        public double? Limitprice { get; set; }
        public string Duetime { get; set; }
        public long? Idcustomer { get; set; }
        public long? Used { get; set; }

        public virtual Customer IdcustomerNavigation { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
    }
}
