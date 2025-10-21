using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Service;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : Controller
    {
        private readonly CitiesService _citiesService;
        public CitiesController(CitiesService citiesService)
        {
            _citiesService = citiesService;
        }

        [HttpGet("cities")]
        public async Task<IActionResult> SearchCities(string cityName)
        {
            if (string.IsNullOrEmpty(cityName))
            {
                return BadRequest("City name is required.");
            }
            var cities = await _citiesService.SearchCitiesAsync(cityName);
            return Ok(cities);
        }
    }
}
