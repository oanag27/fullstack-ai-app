using System.Text.Json;
using System.Text;

namespace project.Service
{
    public class OllamaService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiUrl = "http://localhost:11434/api/generate";
        private readonly string _model = "llama3";

        public OllamaService(HttpClient client)
        {
            _httpClient = client;
        }

        public async Task<string> GenerateTextAsync(string prompt)
        {
            var requestBody = new
            {
                model = _model,
                prompt = prompt,
                stream = false
            };

            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(_apiUrl, content);
            var result = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonDocument.Parse(result);
            var generatedText = jsonResponse.RootElement.GetProperty("response").GetString();

            return generatedText?.Replace("```json", "").Replace("```", "").Trim()
                   ?? "No response received.";
        }
    }
}

