using Newtonsoft.Json.Linq;
using project.Models;
using System.Web;
namespace project.Service
{
    public class CitiesService
    {
        private const string url = "https://nominatim.openstreetmap.org/search?q={0}&format=json";
        private readonly IConfiguration _configuration;

        public CitiesService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<City>> SearchCitiesAsync(string cityName)
        {
            var cities = new List<City>();

            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.UserAgent.ParseAdd(_configuration["ApiSettings:UserAgent"]);
                    string encodedCityName = HttpUtility.UrlEncode(cityName);
                    string url = string.Format(CitiesService.url, encodedCityName);
                    var response = await client.GetStringAsync(url);
                    var jsonResponse = JArray.Parse(response);
                    foreach (var city in jsonResponse)
                    {
                        cities.Add(new City
                        {
                            Name = city["display_name"].ToString(),
                            Latitude = Convert.ToDouble(city["lat"]),
                            Longitude = Convert.ToDouble(city["lon"])
                        });
                    }
                    await Task.Delay(1000);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error fetching data: " + ex.Message);
                }
            }
            return cities;
        }
    }
}