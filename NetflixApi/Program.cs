using Microsoft.EntityFrameworkCore;
using NetflixApi.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.OpenApi.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using NetflixApi.Validators;
using Microsoft.AspNetCore.Authentication;

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

// Register FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<UserValidator>();

// Add Authentication Services
builder.Services.AddAuthentication("ApiToken")
    .AddScheme<AuthenticationSchemeOptions, ApiTokenAuthenticationHandler>("ApiToken", null);

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUser", policy =>
        policy.RequireAuthenticatedUser());
});

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

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // Enable CORS
app.UseHttpsRedirection();
app.UseAuthentication(); // Enable authentication
app.UseAuthorization();
app.MapControllers();
app.Run();
