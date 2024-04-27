namespace LezzAR.Models
{
    public class AccessControl
    {
        public int AccessID { get; set; }
        public string? AccessName { get; set; }
        public bool IsAccessEnabled { get; set; }
        public DateTime LastChanged { get; set; }
        public string? Details { get; set; } //JSON
    }
}