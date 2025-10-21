using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models
{
    public class DayItinerary
    {
        [Key]
        public int Id { get; set; }
        public string DayName { get; set; }

        [ForeignKey("Itinerary")]
        public int ItineraryId { get; set; }
        public ICollection<Activity> Activities { get; set; }
        public ICollection<Food> Foods { get; set; }
        public Itinerary Itinerary { get; set; }
    }
}
