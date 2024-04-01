using MySql.Data.MySqlClient;
namespace LezzAR.Classes
{
    public class MySQL
    {
        public static void Connect()
        {
            Console.WriteLine("Sunucu açılıyor");
            MySqlConnection con = new MySqlConnection("server=193.203.168.7;database=u902215931_lezzar;uid=u902215931_lezzar;pwd=yusufY.2002;");
            con.Open();
            Console.WriteLine("Çalıştı!");
            con.Close();
        }
    }
}
