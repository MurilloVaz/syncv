using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SYNCV.API.Helpers;
using SYNCV.API.Helpers.Enums;
using SYNCV.API.Models;

namespace SYNCV.API.Interfaces
{
    public interface ILogRepository
    {
        Task<PagedList<AuthLog>> LoadLogs(LogsParams logsParams);
        Task<List<AuthLog>> LoadLogs(DateTime start, DateTime end);
        Task<int> LoadLogs(bool? withError = null);
    }
}