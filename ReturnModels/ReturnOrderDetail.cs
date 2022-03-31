using CoffeeManagement.Models;

namespace CoffeeManagement.ReturnModels{
    public class ReturnOrderDetail{
        public long Id {get; set;}
        public ReturnTable Table {get; set;}
        public string Time {get; set;}
        public ReturnProduct Food {get; set;}
        public string State {get; set;}
        public long? Count {get; set;}
    }
}