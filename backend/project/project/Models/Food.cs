using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models
{
    public class Food
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }

        [ForeignKey("DayItinerary")]
        public int DayItineraryId { get; set; }
    }
}
