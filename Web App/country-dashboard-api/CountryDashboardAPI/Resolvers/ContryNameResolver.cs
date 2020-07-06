using System;
using AutoMapper;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Models;

namespace CountryDashboardAPI.Resolvers
{
    public class ContryNameResolver : IValueResolver<AddCountryCommand, Country, string>
    {
        public ContryNameResolver()
        {
        }

        public string Resolve(AddCountryCommand source, Country destination, string destMember, ResolutionContext context)
        {
            return char.ToUpper(source.CountryName[0]) + source.CountryName.Substring(1);
        }
    }
}
