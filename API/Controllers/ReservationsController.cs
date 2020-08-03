using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application;
using Data;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly MeetingDbContext _context;
        private readonly ILogger<ReservationsController> _logger;

        public ReservationsController(MeetingDbContext context, ILogger<ReservationsController> logger)
        {
            this._context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reservations = await _context.Reservations.Include(x=>x.Room).ToListAsync();
            return Ok(reservations);
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult Times()
        {
            return Ok(TimePeriods.GetTimePeriod());
        }

        [HttpGet("avaibillities")]
        public async Task<IActionResult> CheckAvaibillities(int roomId, DateTime date)
        {
            var timePeriods = await _context.Reservations.Where(x => x.RoomId == roomId && x.Date.Date == date).Select(x=>x.TimePeriod).ToListAsync();
            var Times = TimePeriods.GetAvaibillities(timePeriods);
            return Ok(Times);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Reservation reservation)
        {

            var reserv = new Reservation
            {
                Id = reservation.Id,
                Name = reservation.Name,
                RoomId = reservation.RoomId,
                UserId = reservation.UserId,
                TimePeriod = reservation.TimePeriod,
                Date = reservation.Date
            };

             _context.Reservations.Add(reserv);
            
             await _context.SaveChangesAsync();
            _logger.LogInformation($"resevation save id: {reservation.Id}");
            return Ok(reservation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Reservation reservation)
        {
            var reservationDb = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);
            if (reservationDb == null)
                throw new Exception("Could not find reservation");
            if (reservationDb.RoomId != reservation.RoomId)
            {
                _context.Reservations.Remove(reservationDb);
                var newReservation = new Reservation()
                {
                    Id = reservation.Id,
                    UserId = 1,
                    Name = reservation.Name,
                    Date = reservation.Date,
                    TimePeriod = reservation.TimePeriod,
                    RoomId = reservation.RoomId,
                };
                await _context.Reservations.AddAsync(newReservation);
            }
            else
            {
                reservationDb.Name = reservation.Name;
                reservationDb.Date = reservation.Date;
                reservationDb.TimePeriod = reservation.TimePeriod;
            }
            await _context.SaveChangesAsync();
            return Ok("Done!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);

            if (reservation == null) return NotFound();

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return Ok("Done!");
        }
    }
}
