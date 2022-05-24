using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Services.Lottery;
using KetQuaSoBong.Views;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels.Lottery
{
    public class NorthLoterryViewVM : BindableBase
    {
        private DateTime _datetimeNow;

        public DateTime DateTimeNow
        {
            get => _datetimeNow;
            set => SetProperty(ref _datetimeNow, value);
        }

        private bool _IsShowMore = false;

        public bool IsShowMore
        {
            get => _IsShowMore;
            set => SetProperty(ref _IsShowMore, value);
        }

        private bool _isButtonVisible = true;

        public bool IsButtonVisible
        {
            get => _isButtonVisible;
            set => SetProperty(ref _isButtonVisible, value);
        }

        private bool _isDetailPage = true;

        public bool IsDetailPage
        {
            get => _isDetailPage;
            set
            {
                if (value == true)
                {
                    IsShowMore = true;
                    IsButtonVisible = false;
                }
                SetProperty(ref _isDetailPage, value);
            }
        }

        private LotteryResult _northLottery = new LotteryResult();

        public LotteryResult NorthLottery
        {
            get => _northLottery;
            set => SetProperty(ref _northLottery, value);
        }
        private NorthLotteryService _northLotteryService;

        public ObservableCollection<LotteryResult> Items { get; set; }

        public NorthLoterryViewVM(DateTime date, bool isDetailPage, ContentView view, NorthLotteryService northLotteryService)
        {
            _northLotteryService = northLotteryService;
            IsDetailPage = isDetailPage;
            if (date.Hour > 18)
            {
                DateTimeNow = date;
            }
            else
            {
                DateTimeNow = date.Subtract(TimeSpan.FromDays(1));
            }
            Debug.Write(DateTimeNow.ToString("HH:mm:ss"));
            GetSourceAsync();
            Device.StartTimer(TimeSpan.FromSeconds(30), () =>
            {
                GetSourceAsync();
                return true;
            });

            //Commands
            ShowMoreCommand = new DelegateCommand(() =>
            {
                IsShowMore = !IsShowMore;
            });

            SwitchToDetailPageCommand = new Command(() =>
            {
                (view.Parent.Parent.Parent.Parent.Parent as Page).Navigation.PushAsync(new NorthLotteryPage());
            });
        }

        public DelegateCommand ShowMoreCommand { get; set; }
        public Command SwitchToDetailPageCommand { get; set; }

        public async void GetSourceAsync()
        {
            NorthLottery = await _northLotteryService.GetLotteryResults(DateTimeNow);
        }
    }
}
