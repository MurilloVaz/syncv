using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SYNCV.API.DTOs;
using SYNCV.API.Helpers;
using SYNCV.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SYNCV.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly ILogRepository _repo;
        private readonly IMapper _mapper;

        public LogsController(ILogRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromHeader] LogsParams logsParams)
        {
            var logs = await _repo.LoadLogs(logsParams);

            List<AuthLogListing_DTO> logsToReturn = _mapper.Map<List<AuthLogListing_DTO>>(logs);

            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);

            return Ok(logsToReturn);

        }

        [HttpGet("Statistics")]
        public async Task<IActionResult> Statistics([FromQuery] bool? withErrors = null)
        {
            int logs = await _repo.LoadLogs(withErrors);

            return Ok(logs);
        }

        [HttpPut("StatisticsByRange")]
        public async Task<IActionResult> StatisticsByRange([FromBody] DateRange_DTO dateRange)
        {
            var logs = await _repo.LoadLogs(dateRange.startDate, dateRange.endDate);

            List<AuthLogStatisticsRange_DTO> logsToReturn = _mapper.Map<List<AuthLogStatisticsRange_DTO>>(logs);

            return Ok(logsToReturn);
        }
    }
}