using KetQuaSoBong.Models.LotteryModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Lottery
{
    public interface INorthLotteryService
    {
        Task<LotteryResult> GetLotteryResults(DateTime day);
    }
}
