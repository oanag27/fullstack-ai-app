using project.Models;

namespace project.Service
{
    public interface ITripService
    {
        Task<IEnumerable<Trip>> GetAllTripsAsync(string userId);
        Task<Trip> GetTripByIdAsync(int id, string userId);
        Task<Trip> GetTripById(int tripId);
        Task<IEnumerable<Trip>> GetAllTripsAsync();
        Task<Trip> GetTripByTripNameAsync(string name, string userId);
        Task AddTripAsync(Trip trip);
        Task UpdateTripAsync(Trip trip);
        Task DeleteTripAsync(int id);
        Task<int> GetTripIdByNameAsync(string name, string userId);
        Task<string?> GetUserEmailByUserIdAsync(string userId);
    }
}
