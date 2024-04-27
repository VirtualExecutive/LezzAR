﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LezzAR.Models;

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
        //// GET: api/account/
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<ValuesController>/5
        [HttpGet("GetUserAddresses")]
        public async Task<IActionResult> GetAddress(Guid? token)
        {
            try
            {
                var accountID = await _context.Accounts
                                           .Where(a => a.Token == token )
                                           .Select(a => a.AccountID)
                                           .FirstOrDefaultAsync();
                if (accountID == 0)
                {
                    return NotFound("No user found with the provided token.");
                }

                var addresses = await _context.Addresses
                              .Where(a => a.AccountID == accountID)
                              .ToListAsync();

                if (addresses == null || addresses.Count == 0)
                {
                    return NotFound("No addresses found for the user.");
                }


                return Ok(addresses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving access data.");
                return StatusCode(500,ex.ToString());
            }
        }

    }
}