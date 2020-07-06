using System;
using MediatR;

namespace CountryDashboardAPI.Commands
{
    public class DeleteCountryCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
