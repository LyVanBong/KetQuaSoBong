using KetQuaSoBong.Models.LotteryModel;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace KetQuaSoBong.ViewModels
{
    public class NorthLotteryPageViewModel : BindableBase
    {   
        public ObservableCollection<LotteryResult> LotteryResults { get; set; }
        public NorthLotteryPageViewModel()
        {
            LotteryResults = App.NorthLotteryResults;
        }
    }
}
