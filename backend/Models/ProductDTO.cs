namespace backend.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Price { get; set; }
        public required string Image { get; set; }
        public string? Color { get; set; }
        public string? Capacity { get; set; }
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
    }
}
