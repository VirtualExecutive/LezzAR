using LezzAR.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LezzAR.Model
{
    public class AddressDistrict
    {
        [Key]
        public int ID { get; set; }
        public int CityID { get; set; }
        public string? Name { get; set; }
    }
}
