using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LezzAR.Models;
using Org.BouncyCastle.Asn1;

namespace LezzAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger<AccountController> _logger;

        public AccountController(ApplicationDbContext context, ILogger<AccountController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("GetUserAddresses")]
        public async Task<IActionResult> GetAddress(Guid? token)
        {
            try
            {
                var accountID = await _context.Accounts
                                           .Where(a => a.Token == token )
                                           .Select(a => a.AccountID)
                                           .FirstOrDefaultAsync();

                var addresses = await _context.Addresses
                              .Where(a => a.AccountID == accountID)
                              .ToListAsync();

                if (addresses == null || addresses.Count == 0)
                {
                    return Ok(new List<Addresses>());
                }


                return Ok(addresses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500,ex.ToString());
            }
        }

        

        [HttpGet("isHaveAccount")]
        public IActionResult isHaveAccount(string email)
        {
            try
            {
                var result = _context.Accounts
                    .Where(ac => ac.Email == email).ToList();
                if (result.Count == 0)
                {
                    return Ok(new { result = false });
                }
                else
                {
                    return Ok(new { result = true });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());

            }
        }


        [HttpGet("fullName")]
        public IActionResult GetFullName(Guid? token)
        {
            try
            {
                var result = _context.Accounts
                    .Where(ac => ac.Token == token).ToList();
                if (result.Count == 1)
                {
                    return Ok(new { name = result[0].Ad, surname = result[0].Soyad });
                }
                else
                {
                    return BadRequest("Token geçersiz.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());

            }
        }

        [HttpGet("signUp")]
        public IActionResult SignUp(Guid? token,string name, string surname)
        {
            try
            {
                var account = _context.Accounts.FirstOrDefault(ac => ac.Token == token);
                if (account !=null)
                {
                    account.Ad = name;
                    account.Soyad = surname;
                    _context.SaveChanges();
                    return Ok("Başarıyla değiştirildi.");
                }
                else
                {
                    return BadRequest("Token geçersiz.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());

            }
        }
    }
}
