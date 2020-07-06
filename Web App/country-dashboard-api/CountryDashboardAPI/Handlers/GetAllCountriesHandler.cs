using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CountryDashboardAPI.Data;
using CountryDashboardAPI.Dtos;
using CountryDashboardAPI.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CountryDashboardAPI.Handlers
{
    public class GetAllCountriesHandler : IRequestHandler<GetAllCountriesQuery, IEnumerable<CountryDto>>
    {
        private readonly ICountryDashboardContext _context;

        public IMapper _mapper { get; }

        public GetAllCountriesHandler(ICountryDashboardContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }   

        public async Task<IEnumerable<CountryDto>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
        {
            var countries = await _context.Countries.ToListAsync();
            var result = _mapper.Map<IEnumerable<CountryDto>>(countries);
            return result;
        }
    }
}
