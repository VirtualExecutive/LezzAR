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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccessControl>()
                .HasKey(ac => ac.AccessID);  // AccessID'yi birincil anahtar olarak ayarlar
        }
    }
}