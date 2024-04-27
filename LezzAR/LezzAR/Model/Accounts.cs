namespace LezzAR.Models
{
    public class Accounts
    {
        public int AccountID { get; set; }
        public string? Email { get; set; }
        public int GoogleID { get; set; }
        public string? Ad { get; set; }
        public string? Soyad { get; set; }
        public Guid Token { get; set; }
    }
}