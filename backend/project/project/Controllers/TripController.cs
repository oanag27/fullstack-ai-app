using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Models.DTO;
using project.Service;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;

        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAllTrips()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var trips = await _tripService.GetAllTripsAsync(userId);
            return Ok(trips);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Trip>> GetTripById(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var trip = await _tripService.GetTripByIdAsync(id, userId);
            if (trip == null)
            {
                return NotFound();
            }
            return Ok(trip);
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<Trip>> GetTripByTripName(string name)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var trip = await _tripService.GetTripByTripNameAsync(name, userId);
            if (trip == null)
            {
                return NotFound();
            }
            return Ok(trip);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Trip>> AddTrip([FromBody] TripDTO tripDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var trip = new Trip
            {
                TripName = tripDto.TripName,
                Description = tripDto.Description,
                StartDate = tripDto.StartDate,
                EndDate = tripDto.EndDate,
                Transportation = tripDto.Transportation,
                SelectedDestination = tripDto.SelectedDestination,
                Budget = tripDto.Budget,
                NumberOfPeople = tripDto.NumberOfPeople,
                Latitude = tripDto.Latitude,
                Longitude = tripDto.Longitude,
                UserId = userId
            };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _tripService.AddTripAsync(trip);
            return CreatedAtAction(nameof(GetTripById), new { id = trip.Id }, trip);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrip(int id, [FromBody] Trip trip)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            if (id != trip.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _tripService.UpdateTripAsync(trip);
            return NoContent();
        }
        [HttpGet("tripId")]
        public async Task<IActionResult> GetTripIdByName(string name)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }
            var trips = await _tripService.GetAllTripsAsync(userId);
            var trip = trips.FirstOrDefault(t => t.TripName.Equals(name, StringComparison.OrdinalIgnoreCase));
            if (trip == null)
            {
                return NotFound("Trip not found");
            }
            return Ok(trip.Id);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }
            var trip = await _tripService.GetTripByIdAsync(id, userId);

            if (trip == null)
            {
                return NotFound("Trip not found.");
            }

            await _tripService.DeleteTripAsync(id);
            return NoContent();
        }
        //[Authorize]
        [HttpGet("get-user-email-by-trip-id/{tripId}")]
        public async Task<IActionResult> GetUserEmailByTripId(int tripId)
        {
            var trip = await _tripService.GetTripById(tripId);
            if (trip == null)
                return NotFound("Trip not found.");

            var email = await _tripService.GetUserEmailByUserIdAsync(trip.UserId);
            if (email == null)
                return NotFound("User email not found.");

            return Ok(email);
        }
        [HttpGet("get-all-trips")]
        public async Task<IActionResult> GetAllTripsWithoutAuth()
        {
            var trips = await _tripService.GetAllTripsAsync();
            return Ok(trips);
        }
    }
}
