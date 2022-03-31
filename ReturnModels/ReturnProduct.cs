namespace CoffeeManagement.Models {
    public class ReturnProduct
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public long Idcategory { get; set; }
        public double? Price { get; set; }

        public ReturnProduct(Product product){
            this.Id = product.Id;
            this.Name = product.Name;
            this.ImageUrl = product.ImageUrl;
            this.Idcategory = product.Idcategory;
            this.Price = product.Price;
        }

        public ReturnProduct(){}
    }
}