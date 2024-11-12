using FPCatalog.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FPCatalog.controllers;

public partial class FootballPlayerController
{
    [HttpPost]
    [Route("delete")]
    public IActionResult DeletePlayerById([FromBody] PlayerId request)
    {
        var player = _dbContext.Players.FirstOrDefault(t => t.Id == request.Id);
        
        if (player == null)
        {
            return BadRequest("Player does not exist");
        }

        _dbContext.Players.Remove(player);
        _dbContext.SaveChanges();
        
        return Ok();
    }
}

public class PlayerId {
    public int Id { get; set; }
}