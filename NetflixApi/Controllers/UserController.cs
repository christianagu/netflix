using Microsoft.AspNetCore.Mvc;
using NetflixApi.Data;
using NetflixApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using NuGet.ProjectModel;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;


namespace NetflixApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UsersContext _context;

    public UserController(UsersContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Users>> RegisterUser([FromBody] RegisterUserDTO registerUserDTO)
    {
        if (await _context.Users.AnyAsync(u => u.email == registerUserDTO.email))
        {
            return BadRequest("Email is already registered.");
        }

        // Generate salt
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);

        // hash password
        string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: registerUserDTO.password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256/ 8));
        
        // Create new user
        var newUser = new Users
        {
            username = registerUserDTO.username,
            email = registerUserDTO.email,
            passwordhash = hashedPassword,
            secret = Convert.ToBase64String(salt), // Store the salt for validation
            apitoken = Guid.NewGuid().ToString() // Generate an API token
        };

        //// Hash password and save the user
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(RegisterUser), new { id = newUser.id }, newUser);

    }

    
    [HttpPost("login")]
    public async Task<ActionResult<Users>> LoginUser(LoginUserDTO loginUserDTO)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.username == loginUserDTO.username);
        if (user == null)
        {
            return Unauthorized("Invalid email or password.");
        }

        // Hash incoming password with stored salt
        byte[] salt = Convert.FromBase64String(user.secret!);
        string hashInputPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: loginUserDTO.password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256/8));

        // Compare hashes
        if (hashInputPassword != user.passwordhash)
        {
            return Unauthorized("invalid email or password!");
        }

        return Ok(new { token = user.apitoken});

    }

    [HttpPut("settings/{userId}")]
    public async Task<IActionResult> UpdateUserSettings(long userId, [FromBody] UpdateUserSettingsDTO settingsDTO)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        // Update user settings (e.g., API token)
        user.apitoken = settingsDTO.apitoken;
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}