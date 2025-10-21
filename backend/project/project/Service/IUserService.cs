using project.Models;
using project.Models.DTO;

namespace project.Service
{
    public interface IUserService
    {
        Task<CreatedUserDTO> GetUserNameByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}
