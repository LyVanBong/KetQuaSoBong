using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace KetQuaSoBong.Models
{
    public class VoteItem
    {
        [JsonProperty("number")]
        public string Number { get; set; }

        [JsonProperty("soLuongBinhChon")]
        public long SoLuongBinhChon { get; set; }
    }
}
