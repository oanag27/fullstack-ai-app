using Microsoft.EntityFrameworkCore;
using project.Models;

namespace project.Repository
{
    public class TripRepository : ITripRepository
    {
        private readonly LicentaContext _context;
        public TripRepository(LicentaContext context)
        {
            _context = context;
        }
        public async Task AddTripAsync(Trip trip)
        {
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTripAsync(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip != null)
            {
                var itineraries = await _context.Itineraries
                    .Where(i => i.TripId == id)
                    .ToListAsync();

                if (itineraries.Any())
                {
                    _context.Itineraries.RemoveRange(itineraries);
                }
                _context.Trips.Remove(trip);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Trip>> GetAllTripsAsync(string userId)
        {
            return await _context.Trips
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Trip>> GetAllTripsAsync()
        {
            return await _context.Trips
                .ToListAsync();
        }

        public async Task<Trip> GetTripById(int tripId)
        {
            return await _context.Trips.FindAsync(tripId);
        }

        public async Task<Trip> GetTripByIdAsync(int id, string userId)
        {
            return await _context.Trips.FirstOrDefaultAsync(trip => trip.Id == id && trip.UserId == userId);
        }

        public async Task<Trip> GetTripByTripNameAsync(string name, string userId)
        {
            return await _context.Trips
                .FirstOrDefaultAsync(t => t.TripName == name && t.UserId == userId);
        }

        public async Task<int> GetTripIdByTripNameAsync(string name, string userId)
        {
            var trip = await _context.Trips
                .FirstOrDefaultAsync(t => t.TripName == name && t.UserId == userId);
            return trip?.Id ?? 0;
        }

        public async Task<string> GetUserEmailByUserIdAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.Email;
        }

        public async Task UpdateTripAsync(Trip trip)
        {
            var existingTrip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == trip.Id && t.UserId == trip.UserId);
            if (existingTrip != null)
            {
                existingTrip.TripName = trip.TripName ?? existingTrip.TripName;
                existingTrip.Budget = trip.Budget ?? existingTrip.Budget;
                if (trip.StartDate != default)
                    existingTrip.StartDate = trip.StartDate;
                if (trip.EndDate != default)
                    existingTrip.EndDate = trip.EndDate;
                existingTrip.Description = trip.Description ?? existingTrip.Description;
                existingTrip.Transportation = trip.Transportation ?? existingTrip.Transportation;
                existingTrip.NumberOfPeople = trip.NumberOfPeople != 0 ? trip.NumberOfPeople : existingTrip.NumberOfPeople;
                await _context.SaveChangesAsync();
            }
        }
    }
}
