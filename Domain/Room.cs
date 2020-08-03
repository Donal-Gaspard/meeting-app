using System.Collections.Generic;

namespace Domain
{
    public class Room
    {
        public int Id { get; set; }
        public string name { get; set; }
        public ICollection <Reservation>  Reservations{ get; set; }
    }
}