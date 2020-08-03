using Data;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly MeetingDbContext _context;
        private readonly ILogger<ReservationsController> _logger;
        public RoomsController(MeetingDbContext context, ILogger<ReservationsController> logger)
        {
            this._context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var rooms = await _context.Rooms.ToListAsync();
            _logger.LogInformation($"nb rooms{rooms.Count}");
            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> DetailsReservation(int id)
        {
            var rooms = await _context.Reservations.Where(x => x.RoomId == id).ToListAsync();

            return Ok(rooms);
        }
    }
}
