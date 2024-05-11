namespace LezzAR.Models
{
    public class Addresses
    {
        public int AccountID { get; set; }
        public int AddressID { get; set; }
        public string? Sehir { get; set; }
        public string? Ilce { get; set; }
        public string? Mahalle { get; set; }
        public string? CaddeSokak { get; set; }
        public string? BinaNo { get; set; }
        public string? Kat { get; set; }

        public string? DaireNo { get; set; }
        public string? BinaAdi { get; set; }
        public string? AdresTarifi { get; set; }
        public string? Title { get; set; }
        public float Enlem { get; set; }
        public float Boylam { get; set; }
    }
}