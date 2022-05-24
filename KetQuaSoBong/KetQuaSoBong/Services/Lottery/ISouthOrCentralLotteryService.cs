using KetQuaSoBong.Models.LotteryModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Lottery
{
    public interface ISouthOrCentralLotteryService
    {
        Task<LotteryCollectionResult> GetLotteryResults(string region,DateTime day);
    }
}
