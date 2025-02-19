namespace NetflixApi.Models;

public class NetflixMovies
{
    public long id { get; set; }
    public string? type { get; set; } = string.Empty;
    public string? title { get; set; } = string.Empty;
    public string? director { get; set; } = string.Empty;
    public string? movie_cast { get; set; } = string.Empty;
    public string? country { get; set; } = string.Empty;
    public DateTime date_added { get; set; }
    public long release_year { get; set; }
    public string? rating { get; set; } = string.Empty;
    public string? duration { get; set; } = string.Empty;
    public string? listed_in { get; set; } = string.Empty;
    public string? description { get; set; } = string.Empty;
    public string? secret { get; set; }
    public string? genre { get; set;} = string.Empty;
}

public class NetflixMoviesDTO
{
    public long id { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? genre { get; set; }

}
