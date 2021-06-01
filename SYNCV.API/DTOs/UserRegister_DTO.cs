using System.ComponentModel.DataAnnotations;

namespace SYNCV.API.DTOs
{
    public class UserRegister_DTO
    {
        [Required]
        [MinLength(6)]
        public string Name { get; set; }
        [Required]
        [MinLength(6)]
        public string Username { get; set; }
        [Required]
        [RegularExpression(@"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}", ErrorMessage = "Invalid Email address")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

    }
}