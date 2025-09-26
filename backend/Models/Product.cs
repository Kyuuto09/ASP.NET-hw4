namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string Image { get; set; } = null!;
        public string? Color { get; set; } // added Color property because why not to, this is a product after all
        public string? Capacity { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
