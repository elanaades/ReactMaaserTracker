using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserRepository
    {
        private readonly string _connectionString;

        public MaaserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddMaaser(Maaser maaser)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Maasers.Add(maaser);
            context.SaveChanges();
        }

        public decimal GetTotalMaaser()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maasers.Sum(m => m.Amount);
        }

        public List<Maaser> GetAllMaaser()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maasers.ToList();
        }
    }
}
