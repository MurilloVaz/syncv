using System.Threading.Tasks;
using SYNCV.API.DataAccess;
using SYNCV.API.Interfaces;
using SYNCV.API.Helpers;
using SYNCV.API.Models;
using Microsoft.EntityFrameworkCore;
using SYNCV.API.Helpers.Enums;
using System;
using Newtonsoft.Json;

namespace SYNCV.API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _ctx;

        public AuthRepository(DataContext context)
        {
            _ctx = context;

        }
        public async Task<User> LogIn(string username, string password)
        {
            User user = await _ctx.Users.Include(x => x.Person).FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            // Se o usuario existe, e a senha está correta
            return user;

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        public async Task LogAttempt(LogTypes type, Helpers.Enums.LogStatus status, string username, string userIp, object loggedObj = null)
        {
            AuthLog authLog = new AuthLog{
                LogDate = DateTime.Now,
                LogTypeId = (int)type,
                LogStatusId = (int)status,
                UsedUser = username,
                UserIP = userIp,
                Details = loggedObj == null ? null : JsonConvert.SerializeObject(loggedObj)
            };

            await _ctx.AddAsync(authLog);
            await _ctx.SaveChangesAsync();
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;

            user.PasswordSalt = passwordSalt;

            await _ctx.Users.AddAsync(user);

            await _ctx.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            return await _ctx.Users.AnyAsync(x => x.Username == username);
        }


    }
}