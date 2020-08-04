using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Domain;

namespace Data
{
    public class Seed
    {
        public static async Task SeedData(MeetingDbContext context)
        {

            var rooms = new List<Room>();
            var admin = new User
            {
                Id = 1,
                Name = "Admin"
            };

            for (int i = 1; i < 11; i++)
            {
                var room = new Room
                {
                    Id = i,
                    name = $"room {i}",
                };
                rooms.Add(room);

            }
            await context.AddAsync(admin);
            await context.AddRangeAsync(rooms);
            foreach (var reservation in ReservasionsStore.Reservations)
            {

                reservation.Room = null;
                    reservation.User = null;
                await context.Reservations.AddAsync(reservation);
            }
            await context.SaveChangesAsync();
        }
    }
}