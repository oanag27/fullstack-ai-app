using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace project.Models.DTO
{
    public class ItineraryDTO
    {
        [JsonProperty("currency")]
        public string Currency { get; set; }
        public Dictionary<string,DayItineraryDTO> DayItineraries { get; set; }
    }
}
