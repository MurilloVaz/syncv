using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SYNCV.API.DataAccess;
using SYNCV.API.Helpers;
using SYNCV.API.Interfaces;
using SYNCV.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SYNCV.API.Repositories
{
    public class LogRepository : ILogRepository
    {
        private readonly DataContext _context;
        public LogRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<PagedList<AuthLog>> LoadLogs(LogsParams logsParams)
        {
            IQueryable<AuthLog> logs = null;

            logs = _context.AuthLogs.Include(t => t.LogStatus).Include(t => t.LogType);

            return await PagedList<AuthLog>.CreateAsync(logs, logsParams.PageNumber, logsParams.PageSize);
        }

        public async Task<List<AuthLog>> LoadLogs(DateTime start, DateTime end)
        {
            return await _context.AuthLogs.Include(t => t.LogStatus).Include(t => t.LogType)
            .Where(x => x.LogDate.Date >= start.Date && x.LogDate.Date <= end.Date).ToListAsync();
        }

        public async Task<int> LoadLogs(bool? withError = null)
        {
            IQueryable<AuthLog> logsQuery = null;

            switch (withError)
            {
                case true:
                    logsQuery = _context.AuthLogs.Where(x => x.LogStatusId != (int)Helpers.Enums.LogStatus.SUCCESS);
                    break;

                case false:
                    logsQuery = _context.AuthLogs.Where(x => x.LogStatusId == (int)Helpers.Enums.LogStatus.SUCCESS);
                    break;

                default:
                    logsQuery = _context.AuthLogs;
                    break;
            }

            return await logsQuery.CountAsync();
        }
    }
}