using System;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SYNCV.API.DTOs
{
    public class VideoSync
    {

        public float CurrentTime { get; set; }

        public bool Paused { get; set; }
        public string VideoId { get; set; }


    }
}