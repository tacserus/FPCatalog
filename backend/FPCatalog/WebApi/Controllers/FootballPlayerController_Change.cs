using FPCatalog.Entities;
using FPCatalog.models;
using Microsoft.AspNetCore.Mvc;

namespace FPCatalog.controllers;

public partial class FootballPlayerController
{
    [HttpPut]
    [Route("change")]
    public IActionResult Update([FromBody] UpdatePlayerModel updatePlayerModel)
    {
        //var validation = ValidateModel(updatePlayerModel);
        
        /*if (validation != "ok")
        {
            return BadRequest($"{validation}");
        }*/
        var playerEntity = _dbContext.Players.FirstOrDefault(p => 
            p.Id == updatePlayerModel.Id);

        if (playerEntity is null)
        {
            return BadRequest("there is no player with such an index");
        }
        
        var playerForUpdate = _mapper.Map(updatePlayerModel, playerEntity);
        var updatedPlayer = _dbContext.Players.Update(playerForUpdate);

        _dbContext.SaveChanges();
        
        return Ok(new
        {   
            player = _mapper.Map<ResponsePlayerModel>(updatedPlayer.Entity)
        });
    }

    private static string ValidateModel(UpdatePlayerModel updatePlayerModel)
    {
        if (updatePlayerModel.Name is not null && updatePlayerModel.Name == "")
        {
            return "the name cannot be empty";
        }

        if (updatePlayerModel.Surname is not null && updatePlayerModel.Surname == "")
        {
            return "the surname cannot be empty";
        }

        if (updatePlayerModel.TeemName is not null && updatePlayerModel.TeemName == "")
        {
            return "the teem name cannot be empty";
        }
        
        if (updatePlayerModel.Country is not null && updatePlayerModel.Country == "")
        {
            return "the country cannot be empty";
        }
        
        return "ок";
    }
}