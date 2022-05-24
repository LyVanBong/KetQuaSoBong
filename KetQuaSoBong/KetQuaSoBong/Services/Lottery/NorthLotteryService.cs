using KetQuaSoBong.Models.LotteryModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Lottery
{
    public class NorthLotteryService : INorthLotteryService
    {
        public async Task<LotteryResult> GetLotteryResults(DateTime day)
        {
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();

            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            string url = "https://api.tructiepketqua.net/api/lottery/northern/" + day.ToString("d-M-yyyy");
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (content.Length > 2)
                {
                    if (content.StartsWith("{"))
                    {
                        var lotteryResults = new LotteryResult();
                        lotteryResults = JsonConvert.DeserializeObject<LotteryResult>(content);
                        lotteryResults.IsRefresh = true;
                        return lotteryResults;
                    }
                    else if (content.StartsWith("["))
                    {
                        var lotteryResults = new List<LotteryResult>();
                        lotteryResults = JsonConvert.DeserializeObject<List<LotteryResult>>(content);
                        lotteryResults[0].IsRefresh = true;
                        return lotteryResults[0];
                    }
                }
                else
                {
                    Debug.Write("nhảy vào đây");
                    LotteryResult l = new LotteryResult();
                    l.IsRefresh = false;
                    return l;
                }
            }
            else if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                Debug.Write("BadRequest");
                LotteryResult l = new LotteryResult();
                l.IsRefresh = false;
                return l;
            }
            return null;
            
        }
    }
}
