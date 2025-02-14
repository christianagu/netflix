using Microsoft.AspNetCore.Mvc;
using NetflixApi.Data;
using NetflixApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using NuGet.ProjectModel;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace NetflixApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UsersContext _context;
    private readonly IValidator<RegisterUserDTO> _validator;
    
public UserController(UsersContext context, IValidator<RegisterUserDTO> validator)
    {
        _context = context;
        _validator = validator;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Users>> RegisterUser([FromBody] RegisterUserDTO registerUserDTO)
    {
        var validationResult = await _validator.ValidateAsync(registerUserDTO);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        if (await _context.Users.AnyAsync(u => u.email == registerUserDTO.email))
        {
            return BadRequest("Email is already registered.");
        }

        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: registerUserDTO.password ?? string.Empty,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        var newUser = new Users
        {
            username = registerUserDTO.username,
            email = registerUserDTO.email,
            passwordhash = hashedPassword,
            secret = Convert.ToBase64String(salt),
            apitoken = Guid.NewGuid().ToString()
        };

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

    [HttpGet("me")]
    [Authorize(AuthenticationSchemes = "ApiToken")] // Requires authentication using API token
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound("User not found");
        }

        return Ok(user);
    }


}