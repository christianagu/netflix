namespace NetflixApi.Models;

public class Users
{
    public Guid id { get; set; }
    public string username { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string passwordhash { get; set; } = string.Empty;
    public string apitoken { get; set; } = string.Empty;
    public string? secret { get; set; }

}

public class UpdateUserSettingsDTO
{
    public string? username { get; set; }
    public string? passwordhash { get; set; }
    public string? apitoken { get; set; }
}

public class RegisterUserDTO
{
    public Guid id { get; set; }
    public string username { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}

public class LoginUserDTO
{
    public Guid id { get; set; }
    public string username { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}

