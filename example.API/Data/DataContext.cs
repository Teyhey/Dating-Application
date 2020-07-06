using example.API.Models;
using Microsoft.EntityFrameworkCore;

namespace example.API.Data
{
    // Names of methods must match the names of the tables in the database!
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photo {get; set;}
    }
}