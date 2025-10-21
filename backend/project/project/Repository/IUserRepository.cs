using project.Models;
using project.Models.DTO;

namespace project.Repository
{
    public interface IUserRepository
    {
        Task<CreatedUserDTO> GetUserNameByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}
