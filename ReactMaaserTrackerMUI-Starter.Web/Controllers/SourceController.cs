using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using System;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceController : ControllerBase
    {
        private readonly string _connectionString;

        public SourceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getsources")]
        public List<Source> GetSources()
        {
            var repo = new SourceRepository(_connectionString);
            return repo.GetSources();
        }

        [HttpPost]
        [Route("addsource")]
        public void AddSource(string source)
        {
            var repo = new SourceRepository(_connectionString);
            Source s = new Source { Title = source };
            repo.AddSource(s);
        }

        [HttpPost]
        [Route("editsource")]
        public void EditSource(Source source)
        {
            var repo = new SourceRepository(_connectionString);
            repo.EditSource(source);
        }

        [HttpPost]
        [Route("deletesource")]
        public void DeleteSource(int id)
        {
            var repo = new SourceRepository(_connectionString);
            repo.DeleteSource(id);
        }

        [HttpGet]
        [Route("getincomesource")]
        public List<Source> GetIncomeSource()
        {
            var repo = new SourceRepository(_connectionString);
            return repo.GetIncomeSource();
        }
    }
}
