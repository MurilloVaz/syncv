using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using SYNCV.API.DTOs;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SYNCV.API.Helpers
{
    public static class Tools
    {
        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }


        public static UserInfo GetUserInfo(string token)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jsonToken = handler.ReadToken(token) as JwtSecurityToken;
            var userInfo = new UserInfo();

            userInfo.UserId = Convert.ToInt32((jsonToken.Claims.First(claim => claim.Type == "id").Value));

            userInfo.Username = jsonToken.Claims.First(claim => claim.Type == "username").Value;

            return userInfo;
        }

    }
}