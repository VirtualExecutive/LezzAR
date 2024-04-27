using Microsoft.EntityFrameworkCore;

namespace LezzAR.Models
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AccessControl> AccessControl { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<Addresses> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccessControl>()
                .HasKey(ac => ac.AccessID);
            modelBuilder.Entity<Accounts>()
                .HasKey(ac => ac.AccountID);
            modelBuilder.Entity<Addresses>()
                .HasKey(ac => ac.AddressID);
        }
    }
}