using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addmaaser")]
        public void AddMaaser(Maaser maaser)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.AddMaaser(maaser);
        }

        [HttpGet]
        [Route("gettotalmaaser")]
        public decimal GetTotalMaaser()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetTotalMaaser();
        }

        [HttpGet]
        [Route("getallmaaser")]
        public List<Maaser> GetAllMaaser()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetAllMaaser();
        }
    }
}
