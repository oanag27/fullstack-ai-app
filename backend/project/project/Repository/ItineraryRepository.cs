using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using project.Models;
using project.Models.DTO;

namespace project.Repository
{
    public class ItineraryRepository : IItineraryRepository
    {
        private readonly LicentaContext _context;
        public ItineraryRepository(LicentaContext context)
        {
            _context = context;
        }
        public async Task<int> AddItinerary(string response, int tripId)
        {
            var jToken = JToken.Parse(response);
            if (jToken.Type == JTokenType.String)
            {
                jToken = JToken.Parse(jToken.ToString());
            }
            var jObject = jToken as JObject;
            if (jObject == null)
            {
                return -1;
            }
            var currency = jObject["currency"]?.ToString();
            var itinerary = new Itinerary
            {
                TripId = tripId,
                Currency = currency
            };
            _context.Itineraries.Add(itinerary);
            await _context.SaveChangesAsync();
            var trip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == tripId);
            if (trip != null)
            {
                trip.ItineraryId = itinerary.Id;
                _context.Trips.Update(trip);
                await _context.SaveChangesAsync();
            }
            foreach (var dayProp in jObject.Properties())
            {
                if (dayProp.Name.StartsWith("day"))
                {
                    var dayObject = dayProp.Value as JObject;
                    if (dayObject == null) continue;

                    var dayItinerary = new DayItinerary
                    {
                        DayName = dayProp.Name,
                        ItineraryId = itinerary.Id
                    };

                    var activitiesDTO = dayObject["activities"]?.ToObject<List<ActivityDTO>>();
                    dayItinerary.Activities = activitiesDTO?.Select(a => new Activity
                    {
                        Name = a.Name,
                        Description = a.Description,
                        Time = a.Time,
                        Transportation = a.Transportation,
                        TicketPrice = a.TicketPrice?.ToString()
                    }).ToList() ?? new List<Activity>();

                    var foodsDTO = dayObject["food"]?.ToObject<List<FoodDTO>>();
                    dayItinerary.Foods = foodsDTO?.Select(f => new Food
                    {
                        Type = f.Type,
                        Description = f.Description,
                        Price = f.Price?.ToString()
                    }).ToList() ?? new List<Food>();
                    _context.DailyItineraries.Add(dayItinerary);
                }
            }
            await _context.SaveChangesAsync();
            return itinerary.Id;
        }

        public async Task<Dictionary<string, object>> GetItineraryByItineraryId(int itineraryId)
        {
            var itinerary = await _context.Itineraries
                .Include(i => i.DayItineraries)
                .ThenInclude(di => di.Activities)
                .Include(i => i.DayItineraries)
                .ThenInclude(di => di.Foods)
                .FirstOrDefaultAsync(i => i.Id == itineraryId);

            if (itinerary == null)
                return null;

            var result = new Dictionary<string, object>
            {
                ["currency"] = itinerary.Currency
            };

            foreach (var di in itinerary.DayItineraries)
            {
                var dayItineraryDto = new DayItineraryDTO
                {
                    Activities = di.Activities.Select(a => new ActivityDTO
                    {
                        Name = a.Name,
                        Description = a.Description,
                        Time = a.Time,
                        Transportation = a.Transportation,
                        TicketPrice = a.TicketPrice
                    }).ToList(),
                    Foods = di.Foods.Select(f => new FoodDTO
                    {
                        Type = f.Type,
                        Description = f.Description,
                        Price = f.Price
                    }).ToList()
                };

                result[di.DayName] = dayItineraryDto;
            }

            return result;
        }

    }
}
