using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LezzAR.Models;

namespace LezzAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessControlController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AccessControlController> _logger;

        public AccessControlController(ApplicationDbContext context, ILogger<AccessControlController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/accessControl
        [HttpGet]
        public ActionResult<bool> Get()
        {
            return true;
        }
        // GET: api/accessControl/{accessName}
        [HttpGet("{accessName}")]
        public async Task<IActionResult> GetAccessState(string accessName)
        {
            try
            {
                var access = await _context.AccessControl
                                           .Where(a => a.AccessName == accessName)
                                           .FirstOrDefaultAsync();

                if (access == null)
                {
                    return NotFound(new { state = false, details = "Access name not found." });
                }

                return Ok(new { state = access.IsAccessEnabled, details = access.Details });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500, new { state = false, details = ex.ToString() }) ;
            }
        }
    }
}
