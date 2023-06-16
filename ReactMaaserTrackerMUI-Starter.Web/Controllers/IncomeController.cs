using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("addincome")]
        public void AddIncome(Income income)
        {
            var repo = new IncomeRepository(_connectionString);
            repo.AddIncome(income);
        }

        [HttpGet]
        [Route("gettotalincome")]
        public decimal GetTotalIncome()
        {
            var repo = new IncomeRepository(_connectionString);
            return repo.GetTotalIncome();
        }

    }
}
