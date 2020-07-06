using System;
using AutoMapper;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Models;

namespace CountryDashboardAPI.Resolvers 
{
    public class ContryCodeResolver : IValueResolver<AddCountryCommand, Country, string>
    {
        public string Resolve(AddCountryCommand source, Country destination, string destMember, ResolutionContext context)
        {
            return source.CountryCode.ToUpper();
        }
    }
}
