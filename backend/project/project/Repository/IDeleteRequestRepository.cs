using project.Models;

namespace project.Repository
{
    public interface IDeleteRequestRepository
    {
        Task RequestDelete(int tripId);
        Task<DeleteRequest> GetDeleteRequestAsync(int requestId);
        Task<List<DeleteRequest>> GetAllRequestsAsync();
        Task<IEnumerable<DeleteRequest>> GetDeleteRequestsByTripIdAsync(int tripId);
        Task ApproveDeleteRequestAsync(int requestId);
        Task DenyDeleteRequestAsync(int requestId);
    }
}
