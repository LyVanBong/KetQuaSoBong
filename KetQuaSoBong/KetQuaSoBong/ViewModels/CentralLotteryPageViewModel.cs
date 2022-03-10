using KetQuaSoBong.Models.LotteryModel;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace KetQuaSoBong.ViewModels
{
    public class CentralLotteryPageViewModel : BindableBase
    {   
        public ObservableCollection<LotteryCollectionResult> CentralLotteryResults { get; set; }
        public CentralLotteryPageViewModel()
        {
            CentralLotteryResults = App.CentralLotteryResults;
        }
    }
}
