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
    public class SouthOrCentralLotteryService : ISouthOrCentralLotteryService
    {
        public async Task<LotteryCollectionResult> GetLotteryResults(string region, DateTime day)
        {
            try
            {
                HttpClient client;
                var httpClientHandler = new HttpClientHandler();

                httpClientHandler.ServerCertificateCustomValidationCallback =
                (message, cert, chain, errors) => { return true; };
                client = new HttpClient(httpClientHandler);

                string url = "https://api.tructiepketqua.net/api/lottery/" + region + "/" + day.ToString("d-M-yyyy");
                client.BaseAddress = new Uri(url);
                var lotteryCollectionResults = new LotteryCollectionResult();
                HttpResponseMessage response = await client.GetAsync("");
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    if (content.Length > 2)
                    {
                        if (content.StartsWith("{"))
                        {
                            var lotteryResults = new LotteryCollectionResult();
                            lotteryResults = JsonConvert.DeserializeObject<LotteryCollectionResult>(content);
                            lotteryResults.Datas.ForEach(data => data.IsRefresh = true);
                            if (string.IsNullOrEmpty(lotteryResults.Datas[0].DacBiet)) { lotteryResults.IsLoading = true; }
                            return lotteryResults;
                        }
                        else if (content.StartsWith("["))
                        {
                            var lotteryResults = new List<LotteryCollectionResult>();
                            lotteryResults = JsonConvert.DeserializeObject<List<LotteryCollectionResult>>(content);
                            lotteryResults[0].Datas.ForEach(data => data.IsRefresh = true);
                            if (string.IsNullOrEmpty(lotteryResults[0].Datas[0].DacBiet)) { lotteryResults[0].IsLoading = true; }
                            return lotteryResults[0];
                        }
                    }
                    else
                    {
                        Debug.Write("nhảy vào đây");
                        LotteryCollectionResult lottery = new LotteryCollectionResult();
                        lottery.Datas.ForEach(data => data.IsRefresh = false);
                        lottery.IsLoading = false;
                        return lottery;
                    }
                }
                else if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    Debug.Write("nhảy vào đây");
                    LotteryCollectionResult lottery = new LotteryCollectionResult();
                    lottery.Datas.ForEach(data => data.IsRefresh = false);
                    lottery.IsLoading = false;
                    return lottery;
                }
            }
            catch(Exception ex)
            {
                Debug.Write(ex.Message);
                
            }
            return null;
        }
    }
}
