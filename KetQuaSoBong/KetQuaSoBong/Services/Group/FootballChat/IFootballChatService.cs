using KetQuaSoBong.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Group.FootballChat
{
    public interface ILotteryChatService
    {
        Task<List<ItemChat>> GetAllChat();
        Task<bool> SendChatAsync(ItemChat item);
    }
}
