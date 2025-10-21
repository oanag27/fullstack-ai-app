using Newtonsoft.Json;

namespace project.Models.DTO
{
    public class FoodDTO
    {
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("price")]
        public string Price { get; set; }
    }
}
