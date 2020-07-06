using System;
using System.Linq;
using System.Threading;
using AutoMapper;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Data;
using CountryDashboardAPI.Dtos;
using CountryDashboardAPI.Models;
using MediatR;
using System.Threading.Tasks;

namespace CountryDashboardAPI.Handlers
{
    public class AddCountryHandler : IRequestHandler<AddCountryCommand, CountryDto>
    {
        private readonly ICountryDashboardContext _context;
        private readonly IMapper _mapper;

        public AddCountryHandler(ICountryDashboardContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CountryDto> Handle(AddCountryCommand command, CancellationToken cancellationToken)
        {
            int count = _context.Countries.Count();

            if(count > 10)
            {
                return null;
            }
            var foundCountry = _context.Countries
                .Where(country => country.Code == command.CountryCode.ToUpper())
                .FirstOrDefault();

            if (foundCountry != null) {
                return null;
            }

            var country = new Country();
            _mapper.Map(command, country);
            await _context.Countries.AddAsync(country);
            await _context.SaveDBChanges();
            var result = _mapper.Map<CountryDto>(country);
            return result;
        }
    }
}
