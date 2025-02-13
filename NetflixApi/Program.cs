using Microsoft.EntityFrameworkCore;
using NetflixApi.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// reads from appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Register DbContext with PostgreSQL
builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseNpgsql(connectionString));

// Register DbContext with PostgreSQL
builder.Services.AddDbContext<UsersContext>(options =>
    options.UseNpgsql(connectionString));

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Netflix API",
        Version = "v1"
    });
});

var app = builder.Build();

app.UseCors("AllowAll"); // Enable CORS

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
