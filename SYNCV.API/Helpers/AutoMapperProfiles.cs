using System.Collections.Generic;
using AutoMapper;
using SYNCV.API.DTOs;
using SYNCV.API.Models;

namespace SYNCV.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AuthLog, AuthLogListing_DTO>()
            .ForMember(dest => dest.LogStatusName, opt => opt.MapFrom(src => src.LogStatus.Description))
            .ForMember(dest => dest.LogTypeName, opt => opt.MapFrom(src => src.LogType.Description));

            CreateMap<AuthLog, AuthLogStatisticsRange_DTO>()
            .ForMember(dest => dest.LogStatusName, opt => opt.MapFrom(src => src.LogStatus.Description))
            .ForMember(dest => dest.LogTypeName, opt => opt.MapFrom(src => src.LogType.Description));
        }
    }
}