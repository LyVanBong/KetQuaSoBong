using KetQuaSoBong.Models.LotteryModel;
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
    public class NorthLotteryPageViewModel : BindableBase
    {   
        public ObservableCollection<LotteryResult> LotteryResults { get; set; }
        
        public NorthLotteryPageViewModel()
        {
            LotteryResults = new ObservableCollection<LotteryResult>(App.LotteryResults.Where(x => x.Region == 0));
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
