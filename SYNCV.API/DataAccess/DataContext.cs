using SYNCV.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SYNCV.API.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Person> Persons { get; set; }
        
        public DbSet<User> Users { get; set; }
        public DbSet<LogType> LogTypes { get; set; }
        public DbSet<LogStatus> LogStatus { get; set; }
        public DbSet<AuthLog> AuthLogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Filename=./BRQ_TEST_DATA.db");
            }
        }
    }
}