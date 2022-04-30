using Newtonsoft.Json;

namespace KetQuaSoBong.Models
{
    public class Account
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}