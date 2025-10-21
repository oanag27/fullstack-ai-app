using project.Models;
using project.Models.DTO;

namespace project.Service
{
    public interface IEmailSendService
    {
        void SendEmail(MessageDTO message);
        Task SendEmailAsync(MessageDTO message);
    }
}
