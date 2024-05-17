using LezzAR.Model;
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
        public DbSet<AddressCities> AddressCities { get; set; }
        public DbSet<AddressDistrict> AddressDistrict { get; set; }
        public DbSet<AddressNeighborhood> AddressNeighborhood { get; set; }
        public DbSet<ServerStatus> ServerStatus { get; set; }
        public DbSet<VerificationCodes> VerificationCodes { get; set; }

    }
}