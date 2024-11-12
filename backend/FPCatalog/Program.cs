using System.Reflection;
using FootballPlayerCatalog.SignalR;
using FPCatalog;
using FPCatalog.Entities;
using FPCatalog.models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CatalogDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers(options =>
    {
        options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
    })
    .ConfigureApiBehaviorOptions(options => {
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
    })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    });

builder.Services.AddSignalR();

builder.Services.AddAutoMapper(cfg =>
    {
        cfg.CreateMap<FootballPlayer, ResponsePlayerModel>()
            .ForMember(dest => dest.BirthDate,
                opt => opt.MapFrom(
                    src => src.BirthDate.ToString("yyyy-MM-dd")));
        cfg.CreateMap<CreatePlayerModel, FootballPlayer>()
            .ForMember(dest => dest.BirthDate,
                opt => opt.MapFrom(
                    src => DateTime.Parse(src.BirthDate)));
        cfg.CreateMap<UpdatePlayerModel, FootballPlayer>()
            .ForMember(dest => dest.BirthDate,
            opt => opt.MapFrom(
                src => DateTime.Parse(src.BirthDate)));
    }, Array.Empty<Assembly>());

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");
app.UseRouting();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<PlayerHub>("/playerHub");
    endpoints.MapControllers();
});

app.Run();