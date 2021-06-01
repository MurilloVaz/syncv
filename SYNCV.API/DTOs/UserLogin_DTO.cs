using System.ComponentModel.DataAnnotations;

namespace SYNCV.API.DTOs
{
    public class UserLogin_DTO
    {
        [Required]
        public string Password { get; set; }
        
        [Required]
        [MinLength(6)]
        public string Username { get; set; }
    }
}