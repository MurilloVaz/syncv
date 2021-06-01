using SYNCV.API.DTOs;
using SYNCV.API.Helpers;
using Microsoft.AspNetCore.SignalR;

namespace SYNCV.API.Hubs
{
    public class BaseHub : Hub
    {
        public UserInfo UserInfo
        {
            get
            {
                string token = this.Context.GetHttpContext().Request.Query["jwttoken"];
                return Tools.GetUserInfo(token);
            }
        }
    }
}