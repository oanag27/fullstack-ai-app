using Microsoft.EntityFrameworkCore;
using project.Models;
using project.Models.DTO;

namespace project.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly LicentaContext _context;
        public UserRepository(LicentaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .ToListAsync();
        }

        public async Task<CreatedUserDTO> GetUserNameByEmailAsync(string email)
        {
            return await _context.Users
                .Where(u => u.Email == email)
                .Select(u => new CreatedUserDTO
                {
                    UserName = u.UserName,
                })
                .FirstOrDefaultAsync();
        }
    }
}
