using CoffeeManagement.Models;

namespace CoffeeManagement.ReturnModels{
    public class PaymentItem{
        public long table {get; set;}
        public long customer {get; set;}
        public string staffName {get; set;}
        public string customerName {get; set;}
    }
}