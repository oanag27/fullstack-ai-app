using MimeKit;
using project.Models;
using project.Models.DTO;

namespace project.Service
{
    public class EmailSendService : IEmailSendService
    {
        private readonly EmailConfig _emailConfig;

        public EmailSendService(EmailConfig emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendEmail(MessageDTO message)
        {
            var m = CreateEmailMessage(message);
            Send(m);
        }
        public async Task SendEmailAsync(MessageDTO message)
        {
            var m = CreateEmailMessage(message);
            await SendAsync(m);
        }
        private async Task SendAsync(MimeMessage emailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, MailKit.Security.SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        private MimeMessage CreateEmailMessage(MessageDTO message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("from email:", _emailConfig.FromEmail));
            var toAddresses = message.ToAddress != null && message.ToAddress.Count > 0
                ? message.ToAddress
                : new List<string> { _emailConfig.ToAddress };

            emailMessage.To.AddRange(toAddresses.Select(addr => new MailboxAddress(addr, addr))); emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Body };
            return emailMessage;
        }

        private void Send(MimeMessage emailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
                client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, MailKit.Security.SecureSocketOptions.SslOnConnect);
                client.Authenticate(_emailConfig.Username, _emailConfig.Password);
                client.Send(emailMessage);
                client.Disconnect(true);
            }
        }
    }
}
