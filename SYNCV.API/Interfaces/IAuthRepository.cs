using System.Threading.Tasks;
using SYNCV.API.Helpers.Enums;
using SYNCV.API.Models;

namespace SYNCV.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> LogIn(string username, string password);

        Task<User> Register(User user, string password);

        Task<bool> UserExists(string username);

        Task LogAttempt(LogTypes type, Helpers.Enums.LogStatus status, string username, string userIp, object loggedObj = null);
    }
}