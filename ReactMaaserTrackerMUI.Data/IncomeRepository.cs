using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class IncomeRepository
    {
        private readonly string _connectionString;

        public IncomeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddIncome(Income income)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Incomes.Add(income);
            context.SaveChanges();
        }

        public decimal GetTotalIncome()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Incomes.Sum(i => i.Amount);
        }
    }
}
