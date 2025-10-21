using Newtonsoft.Json;

namespace project.Models.DTO
{
    public class DayItineraryDTO
    {
        //[JsonProperty("day")]
        //public string DayName { get; set; }
        [JsonProperty("activities")]
        public List<ActivityDTO> Activities { get; set; }
        [JsonProperty("food")]
        public List<FoodDTO> Foods { get; set; }
    }
}
