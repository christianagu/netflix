using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using NetflixApi.Controllers;
using NetflixApi.Data;
using NetflixApi.Models;
using FluentValidation;
using FluentValidation.Results;
using Xunit;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace NetflixApi.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly Mock<UsersContext> _mockContext;
        private readonly Mock<IValidator<RegisterUserDTO>> _mockValidator;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockContext = new Mock<UsersContext>(new DbContextOptions<UsersContext>());
            _mockValidator = new Mock<IValidator<RegisterUserDTO>>();
            _controller = new UserController(_mockContext.Object, _mockValidator.Object);
        }

        [Fact]
        public async Task RegisterUser_Should_Return_BadRequest_When_Validation_Fails()
        {
            var dto = new RegisterUserDTO { username = "", email = "invalid", password = "123" };
            _mockValidator.Setup(v => v.ValidateAsync(dto, default))
                .ReturnsAsync(new ValidationResult(new List<ValidationFailure>
                {
                    new ValidationFailure("username", "Username is required"),
                    new ValidationFailure("email", "Invalid email format"),
                    new ValidationFailure("password", "Password is too weak")
                }));

            var result = await _controller.RegisterUser(dto);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task RegisterUser_Should_Return_Created_When_Valid_Data_Is_Provided()
        {
            var dto = new RegisterUserDTO
            {
                username = "validUser",
                email = "valid@example.com",
                password = "StrongPass1!"
            };

            _mockValidator.Setup(v => v.ValidateAsync(dto, default))
                .ReturnsAsync(new ValidationResult());

            var result = await _controller.RegisterUser(dto);

            Assert.IsType<CreatedAtActionResult>(result.Result);
        }
    }
}
