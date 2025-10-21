using project.Models;
using project.Models.DTO;
using project.Repository;

namespace project.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<CreatedUserDTO> GetUserNameByEmailAsync(string email)
        {
            return await _userRepository.GetUserNameByEmailAsync(email);
        }
    }
}
