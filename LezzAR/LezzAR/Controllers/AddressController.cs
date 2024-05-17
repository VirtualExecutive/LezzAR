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



        [HttpGet("AddUserAddress")]
        public async Task<IActionResult> AddAddress(Guid? token, int sehirID, int ilceID, int mahalleID, string sokak, string binano, string kat, string daire, string binaadi, string title, string adrestarifi,float enlem, float boylam)
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
                    SehirID = sehirID,
                    IlceID = ilceID,
                    MahalleID = mahalleID,
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
                await _context.SaveChangesAsync();
                return Ok("Adres eklendi.");
                

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("AddressIndexs")]
        public async Task<IActionResult> GetAddressIndexs(Guid? token)
        {
            try
            {
                var cities = await _context.AddressCities.ToListAsync();
                var districts = await _context.AddressDistrict.ToListAsync();
                var neighborhoods = await _context.AddressNeighborhood.ToListAsync();

                var result = cities.Select(city => new
                {
                    city.ID,
                    city.Name,
                    Districts = districts
                        .Where(d => d.CityID == city.ID)
                        .Select(district => new
                        {
                            district.ID,
                            district.Name,
                            Neighborhoods = neighborhoods
                                .Where(n => n.DistrictID == district.ID)
                                .Select(neighborhood => new
                                {
                                    neighborhood.ID,
                                    neighborhood.Name
                                })
                        })
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Hata günlüğü
                // _logger.logerror(ex, "error retrieving access data.");
                return StatusCode(500, ex.ToString());
            }
        }

    }
}
