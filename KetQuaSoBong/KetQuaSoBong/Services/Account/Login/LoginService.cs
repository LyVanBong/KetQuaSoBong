using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using KetQuaSoBong.Models;
using Newtonsoft.Json;
using Xamarin.Essentials;

namespace KetQuaSoBong.Services.Account.Login
{
    public class LoginService : ILoginService
    {
        public async Task<bool> Login(string username, string password)
        {
            string url = "https://api.tructiepketqua.net/api/User/login/" + username + "/" + password;
            Models.Account acc = new Models.Account()
            {
                Username = username,
                Password = password
            };
            var user = new Register();
            HttpClient cient = new HttpClient();
            string jsonData = JsonConvert.SerializeObject(acc);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await cient.PostAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {

                Debug.Write("Login OK!");

                user = JsonConvert.DeserializeObject<Register>(result);
                Preferences.Set("IsLogin", true);
                Preferences.Set("NumLog", 0);
                Preferences.Set("User", user.Name + "," + user.NumberPhone + "," + user.Email + "," + user.Sex + "," + user.UserName);

                return true;

            }
            else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                return false;
            }
            else
            {
                Debug.Write(response.StatusCode);
                return false;
            }
        }
    }
}
