
using LezzAR.Models;
using System.ComponentModel.DataAnnotations;

namespace LezzAR.Model
{
    public class AddressCities
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }

    }
}
