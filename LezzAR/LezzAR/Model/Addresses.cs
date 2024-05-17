using LezzAR.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LezzAR.Models
{
    public class Addresses
    {
        public int AccountID { get; set; }
        [Key]
        public int AddressID { get; set; }

        public int SehirID { get; set; }

        public int IlceID { get; set; }

        public int MahalleID { get; set; }
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