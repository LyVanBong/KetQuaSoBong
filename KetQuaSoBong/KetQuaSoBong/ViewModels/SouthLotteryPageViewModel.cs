﻿using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Views.Popups;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using Xamarin.Forms.Internals;

namespace KetQuaSoBong.ViewModels
{
    public class SouthLotteryPageViewModel : BindableBase
    {   
        public ObservableCollection<LotteryCollectionResult> SouthLotteryResult { get; set; }
        
        public SouthLotteryPageViewModel()
        {
            SouthLotteryResult = App.SouthLotteryResults;
            ShowDialog = new Command(() =>
            {
                Application.Current.MainPage.Navigation.ShowPopup(new CalendarPopup());
            });
        }
        private string _date;
        public string Date
        {
            get => _date;
            set => SetProperty(ref _date, value);
        }
        public Command ShowDialog { get; set; }
    }
}

