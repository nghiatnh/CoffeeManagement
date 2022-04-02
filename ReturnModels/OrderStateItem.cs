using System.Collections.Generic;
using CoffeeManagement.Models;

namespace CoffeeManagement.ReturnModels{
    public class OrderStateItem{
        public List<long> orders {get; set;}
        public long state {get; set;}
    }
}