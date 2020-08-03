using System;
using System.Collections.Generic;
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
            var reservation1 = new Reservation
            {
                Id = Guid.NewGuid(),
                UserId = 1,
                RoomId = 1,
                Name="Draft project",
                Date = new DateTime(2020, 1, 02),
                TimePeriod = "10h - 11h",
            };

            var reservation2 = new Reservation
            {
                Id = Guid.NewGuid(),
                UserId = 1,
                RoomId = 2,
                Name = "Project faucon",
                Date = new DateTime(2020, 1, 01),
                TimePeriod = "8h - 9h"
            };
            await context.Reservations.AddAsync(reservation1);
            await context.Reservations.AddAsync(reservation2);
            await context.SaveChangesAsync();
        }
    }
}