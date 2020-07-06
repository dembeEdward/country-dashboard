using System;
using CountryDashboardAPI.Dtos;
using MediatR;

namespace CountryDashboardAPI.Queries
{
    public class GetCountryByIdQuery : IRequest<CountryDto>
    {
        public Guid Id { get; set; }
    }
}
