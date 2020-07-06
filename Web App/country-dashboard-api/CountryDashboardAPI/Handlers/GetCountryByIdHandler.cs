using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CountryDashboardAPI.Data;
using CountryDashboardAPI.Dtos;
using CountryDashboardAPI.Queries;
using MediatR;

namespace CountryDashboardAPI.Handlers
{
    public class GetCountryByIdHandler : IRequestHandler<GetCountryByIdQuery, CountryDto>
    {
        private readonly ICountryDashboardContext _context;
        private readonly IMapper _mapper;

        public GetCountryByIdHandler(ICountryDashboardContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CountryDto> Handle(GetCountryByIdQuery query, CancellationToken cancellationToken)
        {
            var country = _context.Countries
                    .Where(country => country.CountryID == query.Id)
                    .FirstOrDefault();

            if (country == null)
            {
                return null;
            }

            var result = _mapper.Map<CountryDto>(country);
            return result;
        }
    }
}
