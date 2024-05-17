using System.ComponentModel.DataAnnotations;

namespace LezzAR.Models
{
    public class ServerStatus
    {
        [Key]
        public int ServerID { get; set; }
        public string? ServerName { get; set; }
        public int IsOnline { get; set; }
        public DateTime LastChanged { get; set; }
        public string? Details { get; set; } //Json
    }
}