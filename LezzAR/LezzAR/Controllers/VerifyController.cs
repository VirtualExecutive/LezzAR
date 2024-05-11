using LezzAR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using LezzAR.Classes;

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
        public async Task<IActionResult> RequestVerifyMail(string email)
        {
            var oneMinutesLimit = 1;
            var oneHoursLimit = 60;
            try
            {
                var verificationCodesOneHours = _context.VerificationCodes
                    .Where(vc => vc.Email == email && vc.CreatedAt >= DateTime.UtcNow.AddHours(-1))
                    .ToList();
                var verificationCodesOneMinutes = _context.VerificationCodes
                    .Where(vc => vc.Email == email && vc.CreatedAt >= DateTime.UtcNow.AddMinutes(-1))
                    .ToList();

                if (verificationCodesOneMinutes.Count >= oneMinutesLimit)
                {
                    return BadRequest($"Güvenlik nedeniyle bir dakika içinde sadece {oneMinutesLimit} kez doğrulama kodu isteyebilirsiniz.");
                }
                else if(verificationCodesOneHours.Count > oneHoursLimit)
                {
                    return BadRequest($"Güvenlik nedeniyle bir saat içinde sadece {oneHoursLimit} kez doğrulama kodu isteyebilirsiniz.");
                }
                else
                {
                    string verificationCode = GenerateVerificationCode();

                    _context.VerificationCodes.Add(new VerificationCodes { Email = email, VerificationCode = verificationCode, CreatedAt = DateTime.UtcNow });
                    await _context.SaveChangesAsync();


                    this.SendEmail(email, "LezzAR - Doğrulama kodu", $"LezzAR<br>Doğrulama kodunuz: {verificationCode}");

                    return Ok("Doğrulama kodu gönderildi.");
                }
            }
            catch (FormatException){

                return BadRequest("Geçersiz e-mail formatı.");
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
                if (email != null && code != null)
                {
                    var verificationCodeTrue = _context.VerificationCodes
                        .Where(x => x.Email == email).OrderByDescending(x => x.CreatedAt).ToList()[0].VerificationCode;

                    var verificationCodeTrueFiveMinutes = _context.VerificationCodes
                       .Where(x => x.Email == email && x.CreatedAt >= DateTime.UtcNow.AddMinutes(-5))
                       .OrderByDescending(x => x.CreatedAt)
                       .ToList();

                    if( verificationCodeTrueFiveMinutes.Count ==0) 
                    {
                        return BadRequest("Doğrulama kodunuz zaman aşımına uğradı.");
                    }


                    else if (code == verificationCodeTrue)
                    {
                        var account = _context.Accounts
                            .Where(ac => ac.Email == email).ToList();
                        if (account.Count == 0) 
                        {
                            //Yeni kayıt
                            Guid newGuid = Guid.NewGuid();
                            _context.Accounts.Add(new Accounts { Email = email , Token=newGuid});
                            await _context.SaveChangesAsync();
                            return Ok(new {result=true, token=newGuid});
                        }
                        else
                        {
                            return Ok(new { result = true, token = account[0].Token });
                        }
                    }
                    else
                    {
                        return Ok(new { result = false });
                    }
                }
                return BadRequest("Eksik parametreler.");
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
