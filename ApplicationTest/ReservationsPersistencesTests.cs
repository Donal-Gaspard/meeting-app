using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application;
using Data;
using Domain;
using NUnit.Framework;

namespace ApplicationTest
{
    [TestFixture]
  public  class ReservationsPersistencesTests
    {
        [Test]
        public void ShouldBeNotNullLoadReservationsAndContains2Items()
        {
            var reservations = ReservasionsStore.Reservations;
            Assert.IsNotNull(reservations);
        }

        [Test]
        public void ShouldBeSaveReservations()
        {
            var reservations = new List<Reservation>()
            {
                new Reservation()
                {
                    Id=Guid.NewGuid(),
                    Name="new Project", 
                    Date=DateTime.Parse("2040-01-01"),
                    RoomId=10,TimePeriod="7h - 8h" }
            };

            Assert.IsTrue(ReservasionsStore.Save(reservations));
        }
    }
}
