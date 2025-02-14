using FluentValidation.TestHelper;
using NetflixApi.Validators;
using NetflixApi.Models;
using Xunit;

namespace NetflixApi.Tests.Validators
{
    public class UserValidatorTests
    {
        private readonly UserValidator _validator;

        public UserValidatorTests()
        {
            _validator = new UserValidator();
        }

        [Fact]
        public void Should_Have_Error_When_Username_Is_Empty()
        {
            var model = new RegisterUserDTO { username = "" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(u => u.username)
                .WithErrorMessage("Username is required");
        }

        [Fact]
        public void Should_Have_Error_When_Username_Is_Less_Than_3_Characters()
        {
            var model = new RegisterUserDTO { username = "ab" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(u => u.username)
                .WithErrorMessage("Username must be at least 3 characters long");
        }

        [Fact]
        public void Should_Have_Error_When_Email_Is_Invalid()
        {
            var model = new RegisterUserDTO { email = "invalidemail" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(u => u.email)
                .WithErrorMessage("Invalid email format");
        }

        [Fact]
        public void Should_Have_Error_When_Password_Is_Weak()
        {
            var model = new RegisterUserDTO { password = "12345678" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(u => u.password)
                .WithErrorMessage("Password must contain at least one uppercase letter");
        }

        [Fact]
        public void Should_Pass_When_Valid_User_Data_Is_Provided()
        {
            var model = new RegisterUserDTO
            {
                username = "validUser",
                email = "valid@example.com",
                password = "StrongPass1!"
            };

            var result = _validator.TestValidate(model);
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}
