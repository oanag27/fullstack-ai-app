using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace project.Models.DTO
{
    public class ActivityDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("time")]
        public string Time { get; set; }
        [JsonProperty("transportation")]
        public string Transportation { get; set; }
        [JsonProperty("ticketPrice")]
        public string TicketPrice { get; set; }
    }
}
