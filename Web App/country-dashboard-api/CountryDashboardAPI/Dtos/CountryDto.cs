using System;
using System.ComponentModel.DataAnnotations;

namespace CountryDashboardAPI.Dtos
{
    public class CountryDto
    {
        [Key]
        public Guid id { get; set; }
        [Required]
        [MaxLength(250)]
        public string CountryName { get; set; }
        [Required]
        [MaxLength(2)]
        public string CountryCode { get; set; }
    }
}
