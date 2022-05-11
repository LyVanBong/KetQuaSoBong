using KetQuaSoBong.Models;
using KetQuaSoBong.Models.LotteryModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace KetQuaSoBong.Services.NumberVoted
{
    public interface IVoteNumberService
    {
        Task<List<VoteItem>> GetVote();
        Task<bool> VoteAsync(string strNumber);
    }
}
