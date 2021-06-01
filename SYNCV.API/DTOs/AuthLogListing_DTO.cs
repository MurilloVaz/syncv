using System;
using System.ComponentModel.DataAnnotations;

namespace SYNCV.API.DTOs
{
    public class AuthLogListing_DTO
    {
        public string UsedUser { get; set; }
        public string UserIP { get; set; }
        public int LogStatusId { get; set; }
        public string LogStatusName { get; set; }
        public int LogTypeId { get; set; }
        public string LogTypeName { get; set; }
        public DateTime LogDate { get; set; }
    }
}