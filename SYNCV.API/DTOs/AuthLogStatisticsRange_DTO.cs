using System;

namespace SYNCV.API.DTOs
{
    public class AuthLogStatisticsRange_DTO
    {
        public int LogStatusId { get; set; }
        public string LogStatusName { get; set; }
        public int LogTypeId { get; set; }
        public string LogTypeName { get; set; }
        public DateTime LogDate { get; set; }
    }
}