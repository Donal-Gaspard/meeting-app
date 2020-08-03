using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MeetingDbContext _context;
        private readonly ILogger<ReservationsController> _logger;
        public UsersController(MeetingDbContext context, ILogger<ReservationsController> logger)
        {
            this._context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get");
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
    }
}
