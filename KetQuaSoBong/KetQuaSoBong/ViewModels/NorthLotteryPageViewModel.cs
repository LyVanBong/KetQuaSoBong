﻿using KetQuaSoBong.Models.LotteryModel;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Xamarin.Forms;
using Xamarin.Forms.Internals;

namespace KetQuaSoBong.ViewModels
{
    public class NorthLotteryPageViewModel : BindableBase
    {   
        public ObservableCollection<LotteryResult> LotteryResults { get; set; }
        public NorthLotteryPageViewModel()
        {
            LotteryResults = new ObservableCollection<LotteryResult>(App.LotteryResults.Where(x => x.Region == 0));
            ChangeDisplayAllNum = new Command((x) =>
            {
                var item = x as LotteryCollectionResult;
                item.LotteryResults.ForEach(z => z.Type = 0);
            });
            ChangeDisplay2Num = new Command((x) =>
            {
                var item = x as LotteryCollectionResult;
                item.LotteryResults.ForEach(z => z.Type = 2);
            });
            ChangeDisplay3Num = new Command((x) =>
            {
                var item = x as LotteryCollectionResult;
                item.LotteryResults.ForEach(z => z.Type = 0);
            });
        }
        public Command ChangeDisplay3Num { get; set; }
        public Command ChangeDisplay2Num { get; set; }
        public Command ChangeDisplayAllNum { get; set; }
    }
}
