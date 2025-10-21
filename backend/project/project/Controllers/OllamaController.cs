using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using project.Service;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OllamaController : ControllerBase
    {
        private readonly OllamaService _ollamaService;

        public OllamaController(OllamaService ollamaService)
        {
            _ollamaService = ollamaService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] string request)
        {
            if (string.IsNullOrWhiteSpace(request))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            var result = await _ollamaService.GenerateTextAsync(request);
            var finalResult = result
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            return Ok(new { response = finalResult });
        }
    }
}
