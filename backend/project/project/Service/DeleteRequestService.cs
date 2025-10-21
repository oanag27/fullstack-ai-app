using project.Models;
using project.Repository;

namespace project.Service
{
    public class DeleteRequestService : IDeleteRequestService
    {
        private readonly IDeleteRequestRepository _deleteRequestRepository;
        private readonly ITripRepository _tripRepository;
        public DeleteRequestService(IDeleteRequestRepository deleteRequestRepository, ITripRepository tripRepository)
        {
            _deleteRequestRepository = deleteRequestRepository;
            _tripRepository = tripRepository;
        }

        public async Task ApproveDeleteRequestAsync(int requestId)
        {
            var deleteRequest = await _deleteRequestRepository.GetDeleteRequestAsync(requestId);
            if (deleteRequest != null && deleteRequest.IsDeleted == null)
            {
                await _deleteRequestRepository.ApproveDeleteRequestAsync(requestId);
                await DeleteTripAsync(deleteRequest.TripId);
            }
        }

        public async Task DeleteTripAsync(int tripId)
        {
            await _tripRepository.DeleteTripAsync(tripId);
        }

        public async Task DenyDeleteRequestAsync(int requestId)
        {
            await _deleteRequestRepository.DenyDeleteRequestAsync(requestId);
        }

        public async Task<List<DeleteRequest>> GetAllRequestsAsync()
        {
            return await _deleteRequestRepository.GetAllRequestsAsync();
        }

        public async Task<IEnumerable<DeleteRequest>> GetDeleteRequestsByTripIdAsync(int tripId)
        {
            return await _deleteRequestRepository.GetDeleteRequestsByTripIdAsync(tripId);
        }

        public async Task RequestDeleteAsync(int tripId)
        {
            await _deleteRequestRepository.RequestDelete(tripId);
        }
    }
}
