using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Bills = new HashSet<Bill>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Code { get; set; }
        public string Birthday { get; set; }
        public double? Point { get; set; }
        public string Sex { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
