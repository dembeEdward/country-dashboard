using System.Threading.Tasks;
using CountryDashboardAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CountryDashboardAPI.Data
{
    public interface ICountryDashboardContext
    {
        DbSet<Country> Countries { get; set; }

        Task<int> SaveDBChanges();
    }
}