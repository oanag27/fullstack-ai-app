using System.Security.Claims;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using project.Models.DTO;
using project.Service;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : Controller
    {
        private readonly IItineraryService _itineraryService;
        private readonly ITripService _tripService;
        public ItineraryController(IItineraryService itineraryService, ITripService tripService)
        {
            _itineraryService = itineraryService;
            _tripService = tripService;
        }
        [HttpPost]
        public async Task<IActionResult> GenerateItinerary([FromQuery] string tripName,[FromBody] object itinerary)
        {
            Console.WriteLine($"TripName: {tripName}");
            Console.WriteLine($"Itinerary Raw JSON: {itinerary}");
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine($"UserId: {userId}");
            var tripId = await _tripService.GetTripIdByNameAsync(tripName,userId);
            Console.WriteLine($"TripId: {tripId}");
            var itineraryJson = itinerary.ToString();
            Console.WriteLine("Itinerary" + itineraryJson);
            var itineraryId = await _itineraryService.AddItineraryService(itineraryJson, tripId);
            return Ok(new
            {
                success = true,
                tripId,
                itineraryId,
                itinerary
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetItineraryByTripId([FromQuery] int itineraryId)
        {
            var itinerary = await _itineraryService.GetItineraryByItineraryIdService(itineraryId);
            if (itinerary == null)
            {
                return NotFound();
            }
            return Ok(itinerary);
        }
    }
}
