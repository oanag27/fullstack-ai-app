using Microsoft.AspNetCore.Mvc;
using project.Service;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeminiAiController : Controller
    {
        private readonly GeminiAiService _geminiService;

        public GeminiAiController(GeminiAiService geminiService)
        {
            _geminiService = geminiService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] string request)
        {
            if (string.IsNullOrWhiteSpace(request))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            var result = await _geminiService.GenerateTextAsync(request);
            var finalResult = result
            .Replace("```json", "")
            .Replace("```", "")
            .Trim();

            return Ok(new { response = finalResult });
        }
    }
}
