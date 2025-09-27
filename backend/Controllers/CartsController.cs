using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;       // adjust namespace to your project
using backend.Models;    // adjust namespace to your project

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Temporary in-memory cart (no authentication yet)
        private static List<CartItem> _cart = new();

        public CartsController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/carts
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var items = await Task.WhenAll(_cart.Select(async ci =>
            {
                // Convert ProductId string to int for database lookup
                if (!int.TryParse(ci.ProductId, out int productId)) return null;
                var product = await _context.Products.FindAsync(productId);
                if (product == null) return null;

                return new
                {
                    id = ci.Id,
                    productId = ci.ProductId,
                    quantity = ci.Quantity,
                    product = new
                    {
                        product.Id,
                        product.Name,
                        product.Price,
                        product.Image
                    }
                };
            }));

            return Ok(new { items = items.Where(x => x != null) });
        }

        // POST /api/carts
        [HttpPost]
        public IActionResult AddToCart([FromBody] AddToCartRequest request)
        {
            var existingItem = _cart.FirstOrDefault(ci => ci.ProductId == request.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
            }
            else
            {
                _cart.Add(new CartItem
                {
                    Id = Guid.NewGuid().ToString(),
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                });
            }

            return Ok(new { message = "Item added to cart", items = _cart });
        }

        // DELETE /api/carts/{id}
        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(string id)
        {
            var item = _cart.FirstOrDefault(ci => ci.Id == id);
            if (item == null)
                return NotFound(new { message = "Item not found" });

            _cart.Remove(item);
            return Ok(new { message = "Item removed", items = _cart });
        }

        // DELETE /api/carts
        [HttpDelete]
        public IActionResult ClearCart()
        {
            _cart.Clear();
            return Ok(new { message = "Cart cleared", items = _cart });
        }
    }

    // Request schema
    public class AddToCartRequest
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }

    // Cart item schema (in-memory only)
    public class CartItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
