using Mscc.GenerativeAI;
namespace project.Service
{
    public class GeminiAiService
    {
        private readonly GenerativeModel _generativeModel;
        public GeminiAiService(string apiKey)
        {
            var googleAI = new GoogleAI(apiKey);
            _generativeModel = googleAI.GenerativeModel(Model.Gemini15Pro);
        }
        public async Task<string> GenerateTextAsync(string prompt)
        {
            var response = await _generativeModel.GenerateContent(prompt);
            return response?.Candidates?[0]?.Content?.Text ?? "No response received.";
        }
    }
}
