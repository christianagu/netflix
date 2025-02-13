using Microsoft.EntityFrameworkCore;
using NetflixApi.Models;

namespace NetflixApi.Data;

public class UsersContext : DbContext
{
    public UsersContext(DbContextOptions<UsersContext> options)
        : base(options)
    {
    }

    public DbSet<Users> Users { get; set; } = null!;
}
