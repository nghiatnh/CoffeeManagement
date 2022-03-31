using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Table
    {
        public Table()
        {
            Orders = new HashSet<Order>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long? Idstate { get; set; }

        public virtual Tablestate IdstateNavigation { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
