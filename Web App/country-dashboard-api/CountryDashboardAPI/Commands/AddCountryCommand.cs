using System;
using System.ComponentModel.DataAnnotations;
using CountryDashboardAPI.Dtos;
using MediatR;

namespace CountryDashboardAPI.Commands
{
    public class AddCountryCommand : IRequest<CountryDto>
    {
        [Required]
        [MaxLength(250)]
        public string CountryName { get; set; }
        [Required]
        [MaxLength(2)]
        public string CountryCode { get; set; }
    }
}
