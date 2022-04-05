using CoffeeManagement.Models;

namespace CoffeeManagement.ReturnModels{
    public class PaymentItem{
        public long table {get; set;}
        public long customer {get; set;}
        public long? discountCode {get; set;}
        public string staffName {get; set;}
    }
}