using System;

namespace SYNCV.API.Models
{
    public class AuthLog
    {
        public int Id { get; set; }
        public string UsedUser { get; set; }
        public string UserIP { get; set; }
        public int LogStatusId { get; set; }
        public LogStatus LogStatus { get; set; }
        public int LogTypeId { get; set; }
        public LogType LogType { get; set; }
        public string Details { get; set; }
        public DateTime LogDate { get; set; }
    }
}