using Microsoft.EntityFrameworkCore;
using NetflixApi.Models;

namespace NetflixApi.Data;

public class MoviesContext : DbContext
{
    public MoviesContext(DbContextOptions<MoviesContext> options)
        : base(options)
    {
    }

    public DbSet<NetflixMovies> NetflixMovies { get; set; } = null!;
}
