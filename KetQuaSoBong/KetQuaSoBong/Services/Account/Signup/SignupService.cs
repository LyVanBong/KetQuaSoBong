using KetQuaSoBong.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace KetQuaSoBong.Services.Account.Signup
{
    public class SignupService : ISignupService
    {
        public async Task<bool> SignUp(Register reg)
        {
            string url = "https://api.tructiepketqua.net/api/User/register";
            HttpClient cient = new HttpClient();
            string jsonData = JsonConvert.SerializeObject(reg);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await cient.PostAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {

                Preferences.Set("IsLogin", true);
                Preferences.Set("User", reg.Name + "," + reg.NumberPhone + "," + reg.Email + "," + reg.Sex + "," + reg.UserName);
                return true;

            }
            else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                return false;
            }
            else
            {
                Debug.Write("Signup: "+response.StatusCode);
                return true;
            }
        }
    }
}
