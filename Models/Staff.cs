using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Staff
    {
        public Staff()
        {
            Bills = new HashSet<Bill>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Code { get; set; }
        public byte[] Birthday { get; set; }
        public string Sex { get; set; }
        public long Idrole { get; set; }

        public virtual Role IdroleNavigation { get; set; }
        public virtual Staffaccount Staffaccount { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
    }
}
