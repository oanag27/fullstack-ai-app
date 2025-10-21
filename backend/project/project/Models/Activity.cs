using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [Column("TimeOfTheDay")]
        public string Time { get; set; }
        public string Transportation { get; set; }
        public string TicketPrice { get; set; }
        [ForeignKey("DayItinerary")]
        public int DayItineraryId { get; set; }
    }
}
