namespace backend.Models
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int ProductCount { get; set; }
    }
}
