using Microsoft.AspNetCore.Identity;

namespace project.Models
{
    public class User:IdentityUser
    {
        public ICollection<Trip> Trips { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
