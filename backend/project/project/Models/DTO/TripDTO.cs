namespace project.Models.DTO
{
    public class TripDTO
    {
        public string TripName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Transportation { get; set; }
        public string SelectedDestination { get; set; }
        public string Budget { get; set; }
        public int NumberOfPeople { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
