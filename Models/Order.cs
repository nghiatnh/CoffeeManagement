using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public long Id { get; set; }
        public long? Idtable { get; set; }
        public long? Idstate { get; set; }

        public virtual Orderstate IdstateNavigation { get; set; }
        public virtual Table IdtableNavigation { get; set; }
        public virtual Bill Bill { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
