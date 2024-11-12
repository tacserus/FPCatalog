using System.ComponentModel.DataAnnotations;

namespace FPCatalog.models;

public class UpdatePlayerModel
{
    [Required]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public bool Gender { get; set; }
    public string BirthDate { get; set; }
    public string TeemName { get; set; }
    public string Country { get; set; }
}