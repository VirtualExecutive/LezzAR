using System.ComponentModel.DataAnnotations;

namespace LezzAR.Models
{
    public class VerificationCodes
    {
        public int ID { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
        public string? VerificationCode { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}