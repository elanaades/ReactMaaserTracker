using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class SourceRepository
    {
        private readonly string _connectionString;

        public SourceRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Source> GetSources()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.ToList();
        }
        public void AddSource(Source source)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }
        public void DeleteSource(int id)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE from Incomes where sourceId = {id}; DELETE FROM Sources where Id = {id}");
        }
        public void EditSource(Source source)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Update(source);
            context.SaveChanges();
        }

        public List<Source> GetIncomeSource()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.Include(s => s.Incomes).ToList();
        }

    }
}
