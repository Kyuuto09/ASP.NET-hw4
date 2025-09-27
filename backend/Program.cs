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

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
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

// Enable CORS middleware
app.UseCors();

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
    new Product { Name = "iPhone 17 Pro 256GB", Price = 1499, Color = "Midnight", Capacity = "256GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-deepblue?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RUczK3M0RVhxWWpFZXJsZzlEU0tTSHVHdDcxbVFRSnhaQ0pnV1pOaG5KaGhNQnJMcnc4RkxJd3ZMc3hKZVVFWHNGZ0xNcmF3NFg5dGNjU0hGYnBVTUF3bXM4bU92dFpiSk1vcFRiMHNtbGRn&traceId=1", CategoryId = catPhones.Id },
    new Product { Name = "iPhone 17 Pro 512GB", Price = 1699, Color = "Midnight", Capacity = "512GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-cosmicorange?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RUlmWnJkM2NiV2hVVVF2ZE1VdGpQZWhsQTdPYWVGbmdIenAvNE9qYmZVYVFDb1F2RTNvUEVHRkpGaGtOSVFHak5NTEhXRE11VU1QNVo2eDJsWlpuWHRlLys5ZkozSXJXZWZXNk8rZDF5S0V3&traceId=1", CategoryId = catPhones.Id },
    new Product { Name = "iPhone 17 Pro 1TB", Price = 1899, Color = "Midnight", Capacity = "1TB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-silver?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RzRIN3Q2Z245Z1F3L1paWlRjZnl6YTF1TmpsTkNoRVRMR1N6UXlVZFBaU0NYR1ZZZnEyMVlVQUliTThGMjNyaFJFRjhVelZBVy8wUHZRSVFLRUJEWEdMR1dOZHMwa2VjYTFxU2tiQm1KKzJB&traceId=1", CategoryId = catPhones.Id },

    new Product { Name = "iPhone 17 Max 256GB", Price = 1799, Color = "Starlight", Capacity = "256GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-9inch-deepblue?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RWhhOHJGRUNHdlh6a3VuZVVqdnNrNXVHdDcxbVFRSnhaQ0pnV1pOaG5KaGhNQnJMcnc4RkxJd3ZMc3hKZVVFWHREelVULzVXd2xCbVltNVMyUXhsYlBpMEowc2xaa1ByZlpMdyt3ZFlhVkhn&traceId=1", CategoryId = catPhones.Id },
    new Product { Name = "iPhone 17 Max 512GB", Price = 1999, Color = "Starlight", Capacity = "512GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RnVrUzFnTVVSUnNLVnZUWUMxNTBGaGhsQTdPYWVGbmdIenAvNE9qYmZVYVFDb1F2RTNvUEVHRkpGaGtOSVFHak5NTEhXRE11VU1QNVo2eDJsWlpuWHQyaWthYXpzcEpXMExJLy9GTE9wWkNn&traceId=1", CategoryId = catPhones.Id },
    new Product { Name = "iPhone 17 Max 1TB", Price = 2199, Color = "Starlight", Capacity = "1TB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-9inch-silver?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RVRqUkJqUGFyN1pGMnlaV3JkWU9jdjF1TmpsTkNoRVRMR1N6UXlVZFBaU0NYR1ZZZnEyMVlVQUliTThGMjNyaFFxd1ZHd3R2RmlpWk50MW5LU2N1cWNxdlBsK2ZicnRLY2oza08vTDBZeXZ3&traceId=1", CategoryId = catPhones.Id },

    // MacBooks
    new Product { Name = "MacBook Air M3 256GB", Price = 1299, Color = "Silver", Capacity = "256GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=R3ppeU9YZTloeFNEd0dud1VoQ0NmWm1SM25kQmZRNlUvMjRRR24zL3lWWVdSQVpaMVk3bVpFeEhCNXNmRks0OXVUb3VPa2FUZVhQMFhDQnVBMWhwQTlLN0R3S0o4RlRIMmdyVlJuK2xEK1k", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Air M3 512GB", Price = 1499, Color = "Silver", Capacity = "512GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Air M3 1TB", Price = 1699, Color = "Silver", Capacity = "1TB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-starlight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=U3RnbTBEaGs0WGRSa05FY2NWZjZNUnNRY1VLZ0hUR08rdW9ya3lqR2lHSUd4dWFWK1BVRkhyNXJEQUNIb3JDZDE1UUxLT2t0cW42N3FvQzVqaGhrVWJJYmlpc253WUhscTVNYVBjSm1RTUYrYWpGdS9XeFgvbS9ITnNYOEhYaG4", CategoryId = catLaptops.Id },

    new Product { Name = "MacBook Pro M3 256GB", Price = 1799, Color = "Space Gray", Capacity = "256GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3WmJldjZKNUozZEJDc2p3M25qTEh4MXZGM3N4V2tQTnYxUGVMQ2I3alhzbWJGcXNRQnFCV0w3WVRjTExvdm1ic2JESWh2ZElUZjRqaWx0QTVmcXFXSm1IaWV5SG1KWWRSb1RMSkNqUDJYZHY", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Pro M3 512GB", Price = 1999, Color = "Space Gray", Capacity = "512GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-silver-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=VS9GZkg3REhOOHRkSTlzK0dOQWlHamNzMjVqd0pPMk5YaURoT1Axa2JuN3FiZjF4cU9QU2ZXWTVPOWkra3huOU14MXJScFRZN3Y5OWZsRXVrN1k4cFduaSsvUlA5NzFEZEJ3N0VUUzhEeTg", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Pro M3 1TB", Price = 2199, Color = "Space Gray", Capacity = "1TB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-silver-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=VS9GZkg3REhOOHRkSTlzK0dOQWlHamNzMjVqd0pPMk5YaURoT1Axa2JuN3FiZjF4cU9QU2ZXWTVPOWkra3huOU14MXJScFRZN3Y5OWZsRXVrN1k4cFduaSsvUlA5NzFEZEJ3N0VUUzhEeTg", CategoryId = catLaptops.Id },

    new Product { Name = "MacBook Pro M4 256GB", Price = 2399, Color = "Graphite", Capacity = "256GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3WmJldjZKNUozZEJDc2p3M25qTEh4MXZGM3N4V2tQTnYxUGVMQ2I3alhzbWJGcXNRQnFCV0w3WVRjTExvdm1ic2JESWh2ZElUZjRqaWx0QTVmcXFXSm1IaWV5SG1KWWRSb1RMSkNqUDJYZHY", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Pro M4 512GB", Price = 2599, Color = "Graphite", Capacity = "512GB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3WmJldjZKNUozZEJDc2p3M25qTEh4MXZGM3N4V2tQTnYxUGVMQ2I3alhzbWJGcXNRQnFCV0w3WVRjTExvdm1ic2JESWh2ZElUZjRqaWx0QTVmcXFXSm1IaWV5SG1KWWRSb1RMSkNqUDJYZHY", CategoryId = catLaptops.Id },
    new Product { Name = "MacBook Pro M4 1TB", Price = 2799, Color = "Graphite", Capacity = "1TB", Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3WmJldjZKNUozZEJDc2p3M25qTEh4MXZGM3N4V2tQTnYxUGVMQ2I3alhzbWJGcXNRQnFCV0w3WVRjTExvdm1ic2JESWh2ZElUZjRqaWx0QTVmcXFXSm1IaWV5SG1KWWRSb1RMSkNqUDJYZHY", CategoryId = catLaptops.Id },

    // Accessories
    new Product { Name = "AirPods Pro 2", Price = 249, Color = "White", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=976&hei=916&fmt=jpeg&qlt=90&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eWVDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic1YxRUxFRmRlWDBITzhnRmZ5OTRmaVdKTExiOEFsRmxtQ2Nua0tRSC83MkI", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods 4 with Active Noise Cancellation", Price = 179, Color = "Black", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-4-anc-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=Qklmb1JJend3cVIxSUxIeFBIRk96cUNGMHVRUVpqOEFiUFU4R0xNRVFxdkhJa2hkRmxkTlJIMk9SdFNSaWFNODE1UUxLT2t0cW42N3FvQzVqaGhrVVcvdmFyQU52eG9rbk9Lb1pmQWN1MGgrYWpGdS9XeFgvbS9ITnNYOEhYaG4", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods Max - Midnight", Price = 549, Color = "Midnight", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpyd0cyWGRFNFZ5QTk3bFlteis2Q2NNaWpENFdPQTN0TWQ4ejhtTWxrUHVDeElGZGV2eWhZaEljUzNSeDlxcDVuWGszbTFldUtUQzN0ellEWHZ3UUFYSS8", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods Max - Silver", Price = 549, Color = "Silver", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-starlight_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdWd1NjlYUXFPTDZEK2xySGJScW1PS1Rpbjg5MjlaRWkwN0JTZEtNR2p3b2dmcFJCOTlLWlREUEJzL3lTN2VnL0cvVnNUQWxFNHNrME94a1pxdUNOU29FM01jakdGSHhMVXhHQ21YeXBIKzU", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods Max - Purple", Price = 549, Color = "Space Gray", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-purple_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdEFZMGtjOXNTYXJEaHFYa1lFVzIyUnJHdFc3SWNOdWRSclF6WTRFc2h1eFJnYUxCQWt1UDJiRlJNZVhPYkVVc2hXdERnUW81QWI5aTlucjZuTWh1dnhzQVNZV1grZHBseDduSWhqSlA3QUE", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods Max - Orange", Price = 549, Color = "Pink", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-orange_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmbVl3dU4zNmtlQ1czYnJUSEJUcWowRnJHdFc3SWNOdWRSclF6WTRFc2h1eFJnYUxCQWt1UDJiRlJNZVhPYkVVc2hXdERnUW81QWI5aTlucjZuTWh1dnk3Zm5tZm5FR0tlWnFHbkRhQU5lZmc", CategoryId = catAccessories.Id },
    new Product { Name = "AirPods Max - Blue", Price = 549, Color = "Blue", Capacity = null, Image = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-blue_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmaVZsckZUTTZZd1pFb3lRTGNlYkF0Yy9BSXRGSWdwVEs0NXdLd3JPRVQ3TGROL2hTdHRlcnVBMFhCNlFSVHgrS01jL2RQeWJYZ1FmWXUzRFBMSzJrTlJTZy9JeUNjV2pzbzd6anYzTldHVWw", CategoryId = catAccessories.Id }
);


        db.SaveChanges();
    }
}

app.Run();
