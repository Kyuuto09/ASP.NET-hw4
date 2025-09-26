using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UsersController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public IActionResult Register(UserDTO dto)
        {
            if (_db.Users.Any(u => u.UserName == dto.UserName))
                return BadRequest("Username already exists");

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                UserName = dto.UserName,
                Email = dto.Email,
                Password = dto.Password // for simplicity; later hash it
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user == null || user.Password != dto.Password)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email
            });
        }
    }
}
