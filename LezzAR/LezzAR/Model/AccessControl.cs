using System.ComponentModel.DataAnnotations;

namespace LezzAR.Models
{
    public class AccessControl
    {
        [Key]
        public int AccessID { get; set; }
        public string? AccessName { get; set; }
        public bool IsAccessEnabled { get; set; }
        public DateTime LastChanged { get; set; }
        public string? Details { get; set; } //JSON
    }
}