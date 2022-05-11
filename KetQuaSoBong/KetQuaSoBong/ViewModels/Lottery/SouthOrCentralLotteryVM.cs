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
    internal class SouthOrCentralLotteryViewVM : BindableBase
    {
        private DateTime _datetimeNow;

        public DateTime DateTimeNow
        {
            get => _datetimeNow;
            set => SetProperty(ref _datetimeNow, value);
        }

        private string _region;

        public string Region
        {
            get => _region;
            set
            {
                Title = value == "central" ? "XSMT" : "XSMN";
                SetProperty(ref _region, value);
            }
        }

        private string _title;

        public string Title
        {
            get => _title;
            set => SetProperty(ref _title, value);
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

        private bool _isDetailPage = false;

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

        private LotteryCollectionResult _lottery;

        public LotteryCollectionResult Lottery
        {
            get => _lottery;
            set => SetProperty(ref _lottery, value);
        }
        private SouthOrCentralLotteryService _southOrCentralLotteryService;
        public ObservableCollection<LotteryResult> Items { get; set; }

        public SouthOrCentralLotteryViewVM(DateTime date, string region, bool isDetailPage, ContentView view, SouthOrCentralLotteryService southOrCentralLotteryService)
        {
            _southOrCentralLotteryService = southOrCentralLotteryService;
            IsDetailPage = isDetailPage;
            if ((date.Hour > 15 && region == "south") || (date.Hour > 16 && region == "central"))
            {
                DateTimeNow = date;
            }
            else
            {
                DateTimeNow = date.Subtract(TimeSpan.FromDays(1));
            }

            Region = region;
            Debug.Write(DateTimeNow.ToString("d-MM-yyyy"));
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
                switch (region)
                {
                    case "south": (view.Parent.Parent.Parent.Parent.Parent as Page).Navigation.PushAsync(new SouthLotteryPage()); break;
                    case "central": (view.Parent.Parent.Parent.Parent.Parent as Page).Navigation.PushAsync(new CentralLotteryPage()); break;
                }
            });
        }

        public DelegateCommand ShowMoreCommand { get; set; }
        public Command SwitchToDetailPageCommand { get; set; }

        public async void GetSourceAsync()
        {
            Lottery = await _southOrCentralLotteryService.GetLotteryResults(Region, DateTimeNow);
        }
    }
}
