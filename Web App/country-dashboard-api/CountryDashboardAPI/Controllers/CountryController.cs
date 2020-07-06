using System;
using System.Threading.Tasks;
using CountryDashboardAPI.Commands;
using CountryDashboardAPI.Queries;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CountryDashboardAPI.Controllers
{
    [EnableCors("dev")]
    [Route("/api/countries")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CountryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCountries()
        {
            var query = new GetAllCountriesQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetCountryById")]
        public async Task<IActionResult> GetCountryById(Guid id)
        {
            var query = new GetCountryByIdQuery { Id = id };
            var result = await _mediator.Send(query);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddCountry(AddCountryCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest("User cannot have more than 10 countries or add a duplicate country code");
            }
            return CreatedAtRoute(nameof(GetCountryById), new { Id = result.id }, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContry(Guid id)
        {
            var query = new DeleteCountryCommand { Id = id };
            var result = await _mediator.Send(query);
            return NoContent();
        }
    }
}
