using project.Models;
using project.Repository;

namespace project.Service
{
    public class TripService : ITripService
    {
        private readonly ITripRepository _tripRepository;
        public TripService(ITripRepository tripRepository)
        {
            _tripRepository = tripRepository;
        }
        public async Task AddTripAsync(Trip trip)
        {
            await _tripRepository.AddTripAsync(trip);
        }

        public async Task DeleteTripAsync(int id)
        {
            await _tripRepository.DeleteTripAsync(id);
        }

        public async Task<IEnumerable<Trip>> GetAllTripsAsync(string userId)
        {
            return await _tripRepository.GetAllTripsAsync(userId);
        }

        public async Task<IEnumerable<Trip>> GetAllTripsAsync()
        {
            return await _tripRepository.GetAllTripsAsync();
        }

        public async Task<Trip> GetTripById(int tripId)
        {
           return await _tripRepository.GetTripById(tripId);
        }

        public async Task<Trip> GetTripByIdAsync(int id, string userId)
        {
            return await _tripRepository.GetTripByIdAsync(id, userId);
        }

        public async Task<Trip> GetTripByTripNameAsync(string name, string userId)
        {
            return await _tripRepository.GetTripByTripNameAsync(name, userId);
        }

        public async Task<int> GetTripIdByNameAsync(string name, string userId)
        {
            return await _tripRepository.GetTripIdByTripNameAsync(name, userId);
        }

        public async Task<string?> GetUserEmailByUserIdAsync(string userId)
        {
            return await _tripRepository.GetUserEmailByUserIdAsync(userId);
        }

        public async Task UpdateTripAsync(Trip trip)
        {
            await _tripRepository.UpdateTripAsync(trip);
        }
    }
}
