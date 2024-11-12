using FPCatalog.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FootballPlayerCatalog.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace FPCatalog.controllers;

[ApiController]
[Route("api/[Controller]")]
public partial class FootballPlayerController
    : ControllerBase
{
    private readonly CatalogDbContext _dbContext;
    private readonly IHubContext<PlayerHub> _hubContext;
    private readonly IMapper _mapper;

    public FootballPlayerController(
        CatalogDbContext dbContext, 
        IHubContext<PlayerHub> hubContext, 
        IMapper mapper) 
    {
        _dbContext = dbContext;
        _hubContext = hubContext;
        _mapper = mapper;
    }
}