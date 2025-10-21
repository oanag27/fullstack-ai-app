using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Models.DTO;
using project.Service;

namespace project.Controllers
{
    public class EmailSendController : Controller
    {
        private readonly IEmailSendService _emailService;
        public EmailSendController(IEmailSendService emailService)
        {
            _emailService = emailService;
        }
        [HttpPost("api/send-email")]
        public IActionResult SendEmail([FromBody] MessageDTO message)
        {
            if (message == null || message.ToAddress == null || message.ToAddress.Count == 0)
            {
                return BadRequest("Invalid email message data.");
            }
            try
            {
                _emailService.SendEmail(message);
                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("api/send-email-attachment")]
        public async Task<IActionResult> SendEmailWithAttachment([FromBody] MessageDTO message)
        {
            try
            {
                await _emailService.SendEmailAsync(message);
                return Ok("Email with attachment sent successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
