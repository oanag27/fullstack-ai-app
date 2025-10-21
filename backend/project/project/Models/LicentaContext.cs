using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace project.Models;

public partial class LicentaContext : IdentityDbContext<User>
{
    public LicentaContext()
    {
    }

    public LicentaContext(DbContextOptions<LicentaContext> options)
        : base(options)
    {
    }
    public DbSet<Trip> Trips { get; set; }
    public DbSet<Itinerary> Itineraries { get; set; }
    public DbSet<DayItinerary> DailyItineraries { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Food> Foods { get; set; }

    public DbSet<DeleteRequest> DeleteRequests { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=OMG\\MSSQLSERVER01;Database=licenta;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "2", Name = "User", NormalizedName = "USER" }
        );
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
