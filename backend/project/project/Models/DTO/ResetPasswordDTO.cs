using System.ComponentModel.DataAnnotations;

namespace project.Models.DTO
{
    public class ResetPasswordDTO
    {
        [Json.Schema.Generation.Required]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string PasswordConfirmation { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
