using Microsoft.AspNetCore.Mvc;
using FPCatalog.Entities;
using FPCatalog.models;

namespace FPCatalog.controllers;

public partial class FootballPlayerController
{
    [HttpGet]
    [Route("getplayers")]
    public IActionResult GetPlayers()
    {
        var players = _dbContext.Players.ToList();

        return Ok(new
        {
            players = players.Select(p => _mapper.Map<ResponsePlayerModel>(p))
        });
    }
}
