using System.ComponentModel.DataAnnotations.Schema;

namespace SYNCV.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        [Column(TypeName = "blob")]
        public byte[] PasswordHash { get; set; }

        [Column(TypeName = "blob")]
        public byte[] PasswordSalt { get; set; }

        public int PersonId { get; set; }

        public Person Person { get; set; }
    }
}