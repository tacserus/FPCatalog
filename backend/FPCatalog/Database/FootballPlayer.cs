namespace FPCatalog.Entities;

public class FootballPlayer
{
    public int Id { set; get; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public bool Gender { get; set; }
    public DateTime BirthDate { get; set; }
    public string TeemName { get; set; }
    public string Country { get; set; }
}