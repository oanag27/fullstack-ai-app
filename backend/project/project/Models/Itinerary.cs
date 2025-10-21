using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace project.Models
{
    public class Itinerary
    {
        [Key]
        public int Id { get; set; }
        public string Currency { get; set; }
        [ForeignKey("Trip")]
        public int TripId { get; set; }
        [JsonExtensionData]
        [NotMapped]
        public IDictionary<string, JToken> Days { get; set; }
        public ICollection<DayItinerary> DayItineraries { get; set; }
    }
}
