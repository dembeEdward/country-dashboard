using System;
using System.Collections.Generic;
using CountryDashboardAPI.Dtos;
using MediatR;

namespace CountryDashboardAPI.Queries
{
    public class GetAllCountriesQuery : IRequest<IEnumerable<CountryDto>>
    {

    }
}
