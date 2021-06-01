using System;
using System.Threading.Tasks;
using SYNCV.API.DTOs;
using SYNCV.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SYNCV.API.Hubs
{
    // [Authorize]
    public class SyncHub : BaseHub
    {
        public async Task JoinSession(string oldSessionId, string sessionId)
        {
            if (!string.IsNullOrEmpty(oldSessionId))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, oldSessionId);
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            await Clients.Group(sessionId).SendAsync("Renotify");
        }

        public async Task Sync(string sessionId, VideoSync sync)
        {
            await Clients.Group(sessionId).SendAsync("ReceiveSync", sync);
        }
    }
}