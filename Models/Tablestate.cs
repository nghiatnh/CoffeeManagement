using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Tablestate
    {
        public Tablestate()
        {
            Tables = new HashSet<Table>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Table> Tables { get; set; }
    }
}
