using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Orderdetailstate
    {
        public Orderdetailstate()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
