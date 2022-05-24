using KetQuaSoBong.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace KetQuaSoBong.Services.Group.FootballChat
{
    public class FootballChatService : ILotteryChatService
    {
        public async Task<List<ItemChat>> GetAllChat()
        {
            string url = "https://api.tructiepketqua.net/api/Chats/BongDa";
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<ItemChat>>(content);
            }
            else
            {
                return new List<ItemChat>();
            }
        }

        public async Task<bool> SendChatAsync(ItemChat item)
        {
            string url = "https://api.tructiepketqua.net/api/Chats/BongDa/" + item.UserName + "/" + item.Name + "?message=" + item.Message;
            
            HttpClient cient = new HttpClient();
            string jsonData = JsonConvert.SerializeObject(item.Message);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await cient.PostAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
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
