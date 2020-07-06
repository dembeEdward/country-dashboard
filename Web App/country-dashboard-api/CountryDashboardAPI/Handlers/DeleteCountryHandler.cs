using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Data;
using MediatR;

namespace CountryDashboardAPI.Handlers
{
    public class DeleteCountryHandler : IRequestHandler<DeleteCountryCommand, Guid>
    {
        private readonly ICountryDashboardContext _context;

        public DeleteCountryHandler(ICountryDashboardContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(DeleteCountryCommand command, CancellationToken cancellationToken)
        {
            var country = _context.Countries
                    .Where(country => country.CountryID == command.Id)
                    .FirstOrDefault();

            if(country == null)
            {
                return default;
            }

            _context.Countries.Remove(country);
            await _context.SaveDBChanges();
            return country.CountryID;
        }
    }
}
