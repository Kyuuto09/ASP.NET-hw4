using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            int pageNumber = 1,
            int pageSize = 10,
            int? categoryId = null,
            string? color = null,
            string? capacity = null,
            string? sortBy = null,
            string sortOrder = "asc")
        {
            var query = _db.Products.Include(p => p.Category).AsQueryable();

            // Apply filters
            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);
            if (!string.IsNullOrWhiteSpace(color))
                query = query.Where(p => p.Color == color);
            if (!string.IsNullOrWhiteSpace(capacity))
                query = query.Where(p => p.Capacity == capacity);

            // Fetch filtered data into memory
            var productsList = await query.AsNoTracking().ToListAsync();

            // Apply in-memory sorting
            productsList = sortBy?.ToLower() switch
            {
                "price" => sortOrder.ToLower() == "desc"
                    ? productsList.OrderByDescending(p => p.Price).ToList()
                    : productsList.OrderBy(p => p.Price).ToList(),
                "name" => sortOrder.ToLower() == "desc"
                    ? productsList.OrderByDescending(p => p.Name).ToList()
                    : productsList.OrderBy(p => p.Name).ToList(),
                _ => productsList.OrderBy(p => p.Id).ToList()
            };

            // Total items before pagination
            var totalItems = productsList.Count;

            // Pagination
            var pagedProducts = productsList
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = (double)p.Price,
                    Image = p.Image,
                    Color = p.Color,
                    Capacity = p.Capacity,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name
                })
                .ToList();

            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            return Ok(new
            {
                pageNumber,
                pageSize,
                totalItems,
                totalPages,
                items = pagedProducts
            });
        }
    }
}
