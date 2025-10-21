using Microsoft.EntityFrameworkCore;
using project.Models;

namespace project.Repository
{
    public class DeleteRequestRepository:IDeleteRequestRepository
    {
        private readonly LicentaContext _context;
        public DeleteRequestRepository(LicentaContext context)
        {
            _context = context;
        }

        public async Task ApproveDeleteRequestAsync(int requestId)
        {
            var deleteRequest = await _context.DeleteRequests.FindAsync(requestId);
            if (deleteRequest != null)
            {
                deleteRequest.IsDeleted = true;
                _context.DeleteRequests.Update(deleteRequest);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DenyDeleteRequestAsync(int requestId)
        {
            var deleteRequest = await _context.DeleteRequests.FindAsync(requestId);
            if (deleteRequest != null)
            {
                deleteRequest.IsDeleted = false;
                _context.DeleteRequests.Update(deleteRequest);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<DeleteRequest>> GetAllRequestsAsync()
        {
            return await _context.DeleteRequests
                .ToListAsync();
        }

        public async Task<DeleteRequest> GetDeleteRequestAsync(int requestId)
        {
            return await _context.DeleteRequests
                .FirstOrDefaultAsync(r => r.Id == requestId);
        }

        public async Task<IEnumerable<DeleteRequest>> GetDeleteRequestsByTripIdAsync(int tripId)
        {
            return await _context.DeleteRequests
                .Where(r => r.TripId == tripId)
                .ToListAsync();
        }

        public async Task RequestDelete(int tripId)
        {
            var deleteRequest = new DeleteRequest
            {
                TripId = tripId,
                IsDeleted = null,
                RequestedAt = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            _context.DeleteRequests.Add(deleteRequest);
            await _context.SaveChangesAsync();
        }
    }
}
