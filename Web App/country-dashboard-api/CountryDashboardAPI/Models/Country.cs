using System;
using System.ComponentModel.DataAnnotations;

namespace CountryDashboardAPI.Models
{
    public class Country
    {
        [Key]
        public Guid CountryID { get; set; }
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        [Required]
        [MaxLength(2)]
        public string Code { get; set; }
    }
}
