using project.Models;
using project.Models.DTO;
using project.Repository;

namespace project.Service
{
    public class ItineraryService: IItineraryService
    {
        private readonly IItineraryRepository _itineraryRepository;
        public ItineraryService(IItineraryRepository itineraryRepository)
        {
            _itineraryRepository = itineraryRepository;
        }

        public async Task<int> AddItineraryService(string response, int tripId)
        {
            return await _itineraryRepository.AddItinerary(response, tripId);
        }

        public async Task<Dictionary<string, object>> GetItineraryByItineraryIdService(int itineraryId)
        {
            return await _itineraryRepository.GetItineraryByItineraryId(itineraryId);
        }
    }
}
