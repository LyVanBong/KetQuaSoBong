using KetQuaSoBong.Models;
using KetQuaSoBong.Models.LotteryModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.Services.NumberVoted
{
    public class VotedNumberService : IVoteNumberService
    {
        public async Task<List<VoteItem>> GetVote()
        {
            List<VoteItem> voteList = new List<VoteItem>();
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();

            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            string url = "https://api.tructiepketqua.net/api/Voted";
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                voteList = JsonConvert.DeserializeObject<List<VoteItem>>(content);
                return voteList;
            }
            return new List<VoteItem>();
        }

        public async Task<bool> VoteAsync(string strNumber)
        {
            if (Preferences.Get("IsLogin", false) == true)
            {
                HttpClient client = new HttpClient();
                string url = "https://api.tructiepketqua.net/api/Voted/voted/" + Preferences.Get("User", "").Split(',')[4] + "?nums=" + strNumber;
                HttpResponseMessage response = await client.PostAsync(url, null);
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
                    return false;
                }
            }
            else
            {
                HttpClient client = new HttpClient();
                string url = "https://api.tructiepketqua.net/api/Voted/voted/client?nums=" + strNumber;
                HttpResponseMessage response = await client.PostAsync(url, null);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;

                    //SetListVote
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    return false;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
