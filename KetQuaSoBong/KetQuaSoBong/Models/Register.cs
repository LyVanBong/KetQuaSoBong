using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace KetQuaSoBong.Models
{
    public class Register
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("passwd")]
        public string Passwd { get; set; }

        [JsonProperty("sex")]
        public long Sex { get; set; }

        [JsonProperty("numberPhone")]
        public string NumberPhone { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        public string StrSex => Sex == 0 ? "Nam" : (Sex == 1 ? "Nữ" : "Khác"); 
    }
}
