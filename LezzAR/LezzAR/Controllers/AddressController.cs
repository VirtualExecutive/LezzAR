using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LezzAR.Models;

namespace LezzAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger<AddressController> _logger;

        public AddressController(ApplicationDbContext context, ILogger<AddressController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/address/
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetAddress")]
        public async Task<IActionResult> GetAddress(Guid? token)
        {
            try
            {
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("AddUserAddress")]
        public async Task<IActionResult> AddAddress(Guid? token, string sehir, string ilce, string mahalle, string sokak, string binano, string kat, string daire, string binaadi, string title, string adrestarifi,float enlem, float boylam)
        {
            try
            {
                var accountID = await _context.Accounts
                                           .Where(a => a.Token == token)
                                           .Select(a => a.AccountID)
                                           .FirstOrDefaultAsync();

                var addresses = await _context.Addresses
                              .Where(a => a.AccountID == accountID)
                              .ToListAsync();

                _context.Addresses.Add(new Addresses
                {
                    AccountID = accountID,
                    Sehir = sehir,
                    Ilce = ilce,
                    Mahalle = mahalle,
                    CaddeSokak = sokak,
                    BinaNo = binano,
                    Kat=kat,
                    DaireNo = daire,
                    BinaAdi = binaadi,
                    Title=title,
                    AdresTarifi = adrestarifi,
                    Enlem = enlem,
                    Boylam=boylam
                });
                if (addresses == null || addresses.Count == 0)
                {
                    return Ok(new List<Addresses>());
                }


                return Ok(addresses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

    }
}
