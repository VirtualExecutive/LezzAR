using LezzAR.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LezzAR.Model
{
    public class AddressNeighborhood
    {
        [Key]
        public int ID { get; set; }
        public int DistrictID { get; set; }
        public string? Name { get; set; }
    }
}
