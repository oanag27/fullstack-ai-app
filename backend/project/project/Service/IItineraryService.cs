using project.Models;
using project.Models.DTO;

namespace project.Service
{
    public interface IItineraryService
    {
        Task<int> AddItineraryService(string response, int tripId);
        Task<Dictionary<string, object>> GetItineraryByItineraryIdService(int itineraryId);
    }
}
