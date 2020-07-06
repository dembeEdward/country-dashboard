using System;
using AutoMapper;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Dtos;
using CountryDashboardAPI.Models;
using CountryDashboardAPI.Resolvers;

namespace CountryDashboardAPI.Profiles
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Country, CountryDto>()
                .ForMember(destination => destination.id, options => options.MapFrom(source => source.CountryID))
                .ForMember(destination => destination.CountryName, options => options.MapFrom(source => source.Name))
                .ForMember(destination => destination.CountryCode, options => options.MapFrom(source => source.Code))
                .ReverseMap();

            CreateMap<AddCountryCommand, Country>()
                .ForMember(destination => destination.Name, options => options.MapFrom<ContryNameResolver>())
                .ForMember(destination => destination.Code, options => options.MapFrom<ContryCodeResolver>());
        }
    }
}
