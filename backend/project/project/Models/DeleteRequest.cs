using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models
{
    public class DeleteRequest
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public bool? IsDeleted { get; set; }// null -> pending, true -> approved, false -> denied
        public DateOnly RequestedAt { get; set; }
    }
}
