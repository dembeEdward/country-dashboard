using System;
using System.Threading.Tasks;
using CountryDashboardAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CountryDashboardAPI.Data
{
    public class CountryDashboardContext : DbContext, ICountryDashboardContext
    {
        public CountryDashboardContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }

        public async Task<int> SaveDBChanges()
        {
            return await base.SaveChangesAsync();
        }
    }
}
