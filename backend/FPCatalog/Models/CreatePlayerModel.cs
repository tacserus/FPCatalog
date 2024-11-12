using System.ComponentModel.DataAnnotations;

namespace FPCatalog.models;

public class CreatePlayerModel
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Surname { get; set; }
    [Required]
    public bool Gender { get; set; }
    [Required]
    public string BirthDate { get; set; }
    [Required]
    public string TeemName { get; set; }
    [Required]
    public string Country { get; set; }
}