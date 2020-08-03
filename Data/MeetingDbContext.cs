using System.Collections.Generic;
using System.Linq;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class MeetingDbContext : DbContext
    {
        public MeetingDbContext(DbContextOptions<MeetingDbContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reservation>()
                .HasKey(bc => new { bc.Id, bc.RoomId, bc.UserId });
            modelBuilder.Entity<Reservation>()
                .HasOne(bc => bc.Room)
                .WithMany(b => b.Reservations)
                .HasForeignKey(bc => bc.UserId);
            modelBuilder.Entity<Reservation>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.Reservations)
                .HasForeignKey(bc => bc.RoomId);
        }
    }
}