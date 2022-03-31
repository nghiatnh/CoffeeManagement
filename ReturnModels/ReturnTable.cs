using CoffeeManagement.Models;

namespace CoffeeManagement.Models {
    public class ReturnTable
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public int CountOrder {get; set; }
    }
}