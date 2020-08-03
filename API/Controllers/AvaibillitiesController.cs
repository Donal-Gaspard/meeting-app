using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvaibillitiesController : ControllerBase
    {
        private readonly MeetingDbContext _context;
        private readonly ILogger<ReservationsController> _logger;

        public AvaibillitiesController(MeetingDbContext context, ILogger<ReservationsController> logger)
        {
            this._context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("[action]")]
        private async Task<IActionResult> CheckAvaibillities(int roomId, DateTime date)
        {
            var timePeriods = _context.Reservations.Where(x => x.RoomId == roomId && x.Date.Date == date).SelectMany(x => x.TimePeriod);
            return Ok("ok");
        }
    }
}
