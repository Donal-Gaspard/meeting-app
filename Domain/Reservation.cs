using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string TimePeriod { get; set; }
        public Room Room { get; set; }
        public User User { get; set; }
    }
}