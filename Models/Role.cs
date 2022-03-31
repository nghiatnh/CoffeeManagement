using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Role
    {
        public Role()
        {
            staff = new HashSet<Staff>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Staff> staff { get; set; }
    }
}
