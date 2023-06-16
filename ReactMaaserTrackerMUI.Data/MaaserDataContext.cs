using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserDataContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Maaser>()
        .Property(m => m.Amount)
        .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Income>()
                .HasOne(i => i.Source)
            .WithMany(s => s.Incomes)
            .HasForeignKey(i => i.SourceId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Income> Incomes { get; set; }
        public DbSet<Source> Sources { get; set; }
        public DbSet<Maaser> Maasers { get; set; }

    }
}

