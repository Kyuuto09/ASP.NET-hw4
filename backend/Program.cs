using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true; // makes JSON readable
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "E-Shop API", Version = "v1" });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=eshop.db"));

var app = builder.Build();

// Configure Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "E-Shop API V1");
        c.RoutePrefix = string.Empty; // Swagger at root
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// ----------------- Seed Data -----------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    if (!db.Categories.Any())
    {
        var catPhones = new Category { Name = "Phones" };
        var catLaptops = new Category { Name = "Laptops" };
        var catAccessories = new Category { Name = "Accessories" };

        db.Categories.AddRange(catPhones, catLaptops, catAccessories);
        db.SaveChanges();

        db.Products.AddRange(
            // iPhones
            new Product { Name = "iPhone 17 Pro", Price = 1499, Color = "Midnight", Capacity = "256GB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },
            new Product { Name = "iPhone 17 Pro", Price = 1699, Color = "Midnight", Capacity = "512GB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },
            new Product { Name = "iPhone 17 Pro", Price = 1899, Color = "Midnight", Capacity = "1TB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },

            new Product { Name = "iPhone 17 Max", Price = 1799, Color = "Starlight", Capacity = "256GB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },
            new Product { Name = "iPhone 17 Max", Price = 1999, Color = "Starlight", Capacity = "512GB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },
            new Product { Name = "iPhone 17 Max", Price = 2199, Color = "Starlight", Capacity = "1TB", Image = "https://via.placeholder.com/150", CategoryId = catPhones.Id },

            // MacBooks
            new Product { Name = "MacBook Air M3", Price = 1299, Color = "Silver", Capacity = "256GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Air M3", Price = 1499, Color = "Silver", Capacity = "512GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Air M3", Price = 1699, Color = "Silver", Capacity = "1TB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },

            new Product { Name = "MacBook Pro M3", Price = 1799, Color = "Space Gray", Capacity = "256GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Pro M3", Price = 1999, Color = "Space Gray", Capacity = "512GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Pro M3", Price = 2199, Color = "Space Gray", Capacity = "1TB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },

            new Product { Name = "MacBook Pro M4", Price = 2399, Color = "Graphite", Capacity = "256GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Pro M4", Price = 2599, Color = "Graphite", Capacity = "512GB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },
            new Product { Name = "MacBook Pro M4", Price = 2799, Color = "Graphite", Capacity = "1TB", Image = "https://via.placeholder.com/150", CategoryId = catLaptops.Id },

            // Accessories
            new Product { Name = "AirPods Pro 2", Price = 249, Color = "White", Capacity = null, Image = "https://via.placeholder.com/150", CategoryId = catAccessories.Id },
            new Product { Name = "Magic Keyboard", Price = 199, Color = "Black", Capacity = null, Image = "https://via.placeholder.com/150", CategoryId = catAccessories.Id },
            new Product { Name = "Magic Mouse", Price = 99, Color = "White", Capacity = null, Image = "https://via.placeholder.com/150", CategoryId = catAccessories.Id }
        );

        db.SaveChanges();
    }
}

app.Run();
