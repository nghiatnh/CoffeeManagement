using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Orderdetail
    {
        public long Id { get; set; }
        public long? Count { get; set; }
        public string Ordertime { get; set; }
        public long? Idorder { get; set; }
        public long? Idproduct { get; set; }
        public long? Idstate { get; set; }

        public virtual Order IdorderNavigation { get; set; }
        public virtual Product IdproductNavigation { get; set; }
        public virtual Orderdetailstate IdstateNavigation { get; set; }
    }
}
