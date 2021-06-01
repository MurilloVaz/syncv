using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SYNCV.API.DTOs;
using SYNCV.API.Helpers.Enums;
using SYNCV.API.Interfaces;
using SYNCV.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace SYNCV.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            _config = configuration;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister_DTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.Email = user.Email.ToLower();
            user.Username = user.Username.ToLower();


            if (await _repo.UserExists(user.Username))
            {
                ModelState.AddModelError("Username", "Usuário já existente");
                return BadRequest(ModelState);
            }

            User newUser = new User
            {
                Username = user.Username,
                Person = new Person
                {
                    Email = user.Email,
                    Name = user.Name
                }
            };

            newUser = await _repo.Register(newUser, user.Password);

            return StatusCode(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] UserLogin_DTO user)
        {
            string address = Response.HttpContext.Connection.RemoteIpAddress.ToString();

            if (address.Equals("::1"))
            {
                address = "127.0.0.1";
            }

            if (!ModelState.IsValid)
            {
                // Eu não espero a Task de gravação do Log acabar, por que n necessito do resultado da função
                _repo.LogAttempt(LogTypes.INVALID_MODEL, Helpers.Enums.LogStatus.FAILURE, user.Username, address, ModelState);

                return BadRequest(ModelState);
            }

            user.Username = user.Username.ToLower();

            User existentUser = await _repo.LogIn(user.Username, user.Password);

            if (existentUser == null)
            {
                _repo.LogAttempt(LogTypes.INCORRECT_PASSWORD, Helpers.Enums.LogStatus.FAILURE, user.Username, address);

                return Unauthorized();
            }

            System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            byte[] key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Key").Value);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                            new Claim("id", existentUser.Id.ToString()),
                            new Claim("username", existentUser.Username),
                        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            Microsoft.IdentityModel.Tokens.SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            string tokenString = tokenHandler.WriteToken(token);

            _repo.LogAttempt(LogTypes.SUCCESSFULLY_ENTERED, Helpers.Enums.LogStatus.SUCCESS, user.Username, address);

            return Ok(new { tokenString });
        }
    }
}