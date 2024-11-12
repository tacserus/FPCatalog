using FPCatalog.Entities;
using Microsoft.EntityFrameworkCore;

namespace FPCatalog;

public class CatalogDbContext : DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options) { }

    public virtual DbSet<FootballPlayer> Players { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FootballPlayer>(entity =>
        {
            entity.ToTable("footballplayer");

            entity.HasKey(e =>
                e.Id).HasName("footballplayer_pkey");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnName("name");

            entity.Property(e => e.Surname)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnName("surname");

            entity.Property(e => e.Gender)
                .IsRequired()
                .HasColumnType("boolean")
                .HasColumnName("gender");

            entity.Property(e => e.BirthDate)
                .IsRequired()
                .HasColumnType("date")
                .HasColumnName("birth_date");

            entity.Property(e => e.TeemName)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnName("teem_name");

            entity.Property(e => e.Country)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnName("country");
        });
    }
}