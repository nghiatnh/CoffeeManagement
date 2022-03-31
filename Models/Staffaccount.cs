using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Staffaccount
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public virtual Staff IdNavigation { get; set; }
    }
}
