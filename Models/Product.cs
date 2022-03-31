using System;
using System.Collections.Generic;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class Product
    {
        public Product()
        {
            Orderdetails = new HashSet<Orderdetail>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public long Idcategory { get; set; }
        public double? Price { get; set; }

        public virtual Category IdcategoryNavigation { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
