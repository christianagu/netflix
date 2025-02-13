using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace NetflixClone.GraphQL.Services
{
    public class MovieService
    {
        private readonly HttpClient _httpClient;

        public MovieService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Movie>> GetMoviesAsync()
        {
            var response = await _httpClient.GetAsync("http://host.docker.internal:5001/api/movies");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<Movie>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<Movie>();
        }
    }
}
