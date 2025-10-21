using project.Models;

namespace project.Service
{
    public interface IDeleteRequestService
    {
        Task RequestDeleteAsync(int tripId);
        Task ApproveDeleteRequestAsync(int requestId);
        Task DenyDeleteRequestAsync(int requestId);
        Task DeleteTripAsync(int tripId);
        Task<List<DeleteRequest>> GetAllRequestsAsync();
        Task<IEnumerable<DeleteRequest>> GetDeleteRequestsByTripIdAsync(int tripId);
    }
}
