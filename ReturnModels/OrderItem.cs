using CoffeeManagement.Models;

namespace CoffeeManagement.ReturnModels{
    public class OrderItem{
        public long table {get; set;}
        public long count {get; set;}
        public long food{get; set;}
    }
}