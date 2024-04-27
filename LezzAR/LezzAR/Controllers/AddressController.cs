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

    }
}
