using project.Models;

namespace project.Repository
{
    public interface ITripRepository
    {
        Task<IEnumerable<Trip>> GetAllTripsAsync(string userId);
        Task<Trip> GetTripByIdAsync(int id, string userId);
        Task<IEnumerable<Trip>> GetAllTripsAsync();
        Task<Trip> GetTripById(int tripId);
        Task<int> GetTripIdByTripNameAsync(string name, string userId);
        Task<Trip> GetTripByTripNameAsync(string name, string userId);
        Task<string> GetUserEmailByUserIdAsync(string userId);
        Task AddTripAsync(Trip trip);
        Task UpdateTripAsync(Trip trip);
        Task DeleteTripAsync(int id);
    }
}
