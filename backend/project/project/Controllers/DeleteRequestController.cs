using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project.Service;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteRequestController : Controller
    {
        private readonly IDeleteRequestService _deleteRequestService;
        public DeleteRequestController(IDeleteRequestService deleteRequestService)
        {
            _deleteRequestService = deleteRequestService;
        }

        [HttpPost("request-delete/{tripId}")]
        public async Task<IActionResult> RequestDelete(int tripId)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            await _deleteRequestService.RequestDeleteAsync(tripId);
            return Ok("Delete request submitted.");
        }

        [HttpPost("approve-delete/{requestId}")]
        public async Task<IActionResult> ApproveDelete(int requestId)
        {
            await _deleteRequestService.ApproveDeleteRequestAsync(requestId);
            return Ok("Delete request approved and trip deleted.");
        }

        [HttpPost("deny-delete/{requestId}")]
        public async Task<IActionResult> DenyDelete(int requestId)
        {
            await _deleteRequestService.DenyDeleteRequestAsync(requestId);
            return Ok("Delete request denied.");
        }

        [HttpGet("get-delete-requests/{tripId}")]
        public async Task<IActionResult> GetDeleteRequests(int tripId)
        {
            var deleteRequests = await _deleteRequestService.GetDeleteRequestsByTripIdAsync(tripId);
            return Ok(deleteRequests);
        }
        [HttpGet("get-all-delete-requests")]
        public async Task<IActionResult> GetAllDeleteRequests()
        {
            var requests = await _deleteRequestService.GetAllRequestsAsync();
            return Ok(requests);
        }
    }
}
