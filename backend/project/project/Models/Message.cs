using MimeKit;

namespace project.Models
{
    public class Message
    {
        public List<MailboxAddress> ToAdress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public Message(IEnumerable<string> toAddress, string subject, string body)
        {
            ToAdress = new List<MailboxAddress>();
            ToAdress.AddRange(toAddress.Select(email => new MailboxAddress(string.Empty, email)));
            Subject = subject;
            Body = body;
        }
    }
}
