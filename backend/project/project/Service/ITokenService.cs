using System.Security.Claims;
using project.Models;

namespace project.Service
{
    public interface ITokenService
    {
        string CreateToken(User user);
        string CreateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
