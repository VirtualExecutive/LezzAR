using LezzAR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace LezzAR.Controllers
{
    [Route("api/verify")]
    [ApiController]
    public class VerifyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<VerifyController> _logger;


        public VerifyController(ApplicationDbContext context, ILogger<VerifyController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> AskVerifyMail(string email)
        {
            try
            {
                var verificationCodes = _context.VerificationCodes
                    .Where(vc => vc.Email == email && vc.CreatedAt >= DateTime.UtcNow.AddHours(-1))
                    .ToList();

                // Kullanıcının son bir saat içinde yaptığı doğrulama kodu istek sayısını kontrol et
                if (verificationCodes.Count < 60)
                {
                    // Yeni bir doğrulama kodu oluştur
                    string verificationCode = GenerateVerificationCode();

                    // Oluşturulan doğrulama kodunu veritabanına kaydet
                    _context.VerificationCodes.Add(new VerificationCodes { Email = email, VerificationCode = verificationCode, CreatedAt = DateTime.UtcNow });
                    await _context.SaveChangesAsync();


                    this.SendEmail(email,"LezzAR - Doğrulama kodu",$"LezzAR<br>Doğrulama kodunuz: {verificationCode}");


                    // Doğrulama kodunu gönder
                    return Ok("Doğrulama kodu gönderildi.");
                }
                else
                {
                    // Güvenlik nedeniyle bir saat içinde sadece üç kez doğrulama kodu isteyebileceğini belirt
                    return BadRequest("Güvenlik nedeniyle bir saat içinde sadece üç kez doğrulama kodu isteyebilirsiniz.");
                }
            }
            catch (FormatException ex){

                return StatusCode(500, "Geçersiz e-mail formatı.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("email/{email}/{code}")]
        public async Task<IActionResult> GetVerifyMail(string email, string code)
        {
            try
            {
                string verificationCodeTrue = _context.VerificationCodes.Where(x=>x.Email == email).OrderByDescending(x => x.CreatedAt).FirstOrDefault().VerificationCode;

                if (code == verificationCodeTrue)
                {
                    return Ok(new { result = true });
                }
                else 
                {
                    return Ok(new { result = false }); 
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

        // Rastgele bir doğrulama kodu oluşturma metodu
        private string GenerateVerificationCode()
        {
            
            Random random = new Random();
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, 6).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private void SendEmail(string recipientEmail, string subject, string body)
        {
            // E-posta gönderici bilgileri
            string senderEmail = LezzAR.Classes.Email.email;
            string senderPassword = LezzAR.Classes.Email.pwd;

            // E-posta gönderici
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            // E-posta mesajı
            MailMessage mailMessage = new MailMessage(senderEmail, recipientEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };

            try
            {
                // E-postayı gönder
                smtpClient.Send(mailMessage);
                Console.WriteLine("E-posta gönderildi.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"E-posta gönderilirken hata oluştu: {ex.Message}");
            }
        }
    }
}
