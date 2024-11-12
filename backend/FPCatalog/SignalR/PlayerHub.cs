using FPCatalog.models;
using Microsoft.AspNetCore.SignalR;

namespace FootballPlayerCatalog.SignalR;

public class PlayerHub : Hub
{
    public async Task SendMessage(ResponsePlayerModel responsePlayer)
    {
        await Clients.All.SendAsync("ReceivePlayer", responsePlayer);
    }
}