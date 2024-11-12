using FPCatalog.Entities;
using FPCatalog.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FPCatalog.controllers;

public partial class FootballPlayerController
{
    [HttpPost]
    [Route("create")]
    public IActionResult Create([FromBody] CreatePlayerModel createPlayerModel)
    {
        if (createPlayerModel == null)
        {
            return BadRequest("Player data is null.");
        }
        
        var validation = ValidateModel(createPlayerModel);
        
        if (validation != "ok")
        {
            return BadRequest($"{validation}");
        }

        var newPlayer = _mapper.Map<FootballPlayer>(createPlayerModel);

        FootballPlayer createdPlayer;
        
        try
        {
            createdPlayer = _dbContext.Players.Add(newPlayer).Entity;
        }
        catch (Exception e)
        {
            return BadRequest();
        }
        
        _dbContext.SaveChanges();

        _hubContext.Clients.All.SendAsync("ReceivePlayer", new { 
            createdPlayer = _mapper.Map<ResponsePlayerModel>(createdPlayer)
        });

        return Ok();
    }

    private static string ValidateModel(CreatePlayerModel createPlayerModel)
    {
        if (createPlayerModel.Name == "")
        {
            return "the name cannot be empty";
        }

        if (createPlayerModel.Surname == "")
        {
            return "the surname cannot be empty";
        }

        if (createPlayerModel.TeemName == "")
        {
            return "the teem name cannot be empty";
        }
        
        if (createPlayerModel.Country == "")
        {
            return "the country cannot be empty";
        }

        return "ok";
    }
}