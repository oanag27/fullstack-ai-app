using project.Models;
using project.Models.DTO;

namespace project.Repository
{
    public interface IItineraryRepository
    {
        Task<int> AddItinerary(string response, int tripId);
        Task<Dictionary<string, object>> GetItineraryByItineraryId(int itineraryId);
    }
}
