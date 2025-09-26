using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CartController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var cartItems = await _db.CartItems
                .Include(c => c.Product)
                .ThenInclude(p => p.Category)
                .ToListAsync();

            var items = cartItems.Select(c => new {
                cartItemId = c.Id,
                productId = c.ProductId,
                name = c.Product.Name,
                price = (double)c.Product.Price,
                image = c.Product.Image,
                quantity = c.Quantity
            });

            return Ok(new { items });
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CartAddRequest request)
        {
            var product = await _db.Products.FindAsync(request.ProductId);
            if (product == null) return NotFound();

            var existing = await _db.CartItems.FirstOrDefaultAsync(c => c.ProductId == request.ProductId);
            if (existing != null)
            {
                existing.Quantity += request.Quantity;
            }
            else
            {
                _db.CartItems.Add(new CartItem
                {
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                });
            }

            await _db.SaveChangesAsync();
            return await Get();
        }

        [HttpDelete("{cartItemId}")]
        public async Task<IActionResult> Remove(int cartItemId)
        {
            var item = await _db.CartItems.FindAsync(cartItemId);
            if (item == null) return NotFound();

            _db.CartItems.Remove(item);
            await _db.SaveChangesAsync();
            return await Get();
        }

        [HttpDelete]
        public async Task<IActionResult> Clear()
        {
            _db.CartItems.RemoveRange(_db.CartItems);
            await _db.SaveChangesAsync();
            return await Get();
        }
    }

    public class CartAddRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
