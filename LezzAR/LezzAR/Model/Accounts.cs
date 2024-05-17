using System.ComponentModel.DataAnnotations;

namespace LezzAR.Models
{
    public class Accounts
    {
        [Key]
        public int AccountID { get; set; }
        public string? Email { get; set; }
        public string? Ad { get; set; }
        public string? Soyad { get; set; }
        public Guid Token { get; set; }
    }
}