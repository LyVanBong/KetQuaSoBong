using KetQuaSoBong.Extensions;
using KetQuaSoBong.Helper;
using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.ViewModels;
using Newtonsoft.Json;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.LotteryTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SouthOrCentralLotteryView : ContentView
    {
        
        public SouthOrCentralLotteryView(DateTime date, string region, bool isDetailPage)
        {
            InitializeComponent();
            BindingContext = new SouthOrCentralLotteryViewVM(date, region, isDetailPage);
        }
       
    }

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
                if(value == true)
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
        public ObservableCollection<LotteryResult> Items { get; set; }

        public SouthOrCentralLotteryViewVM(DateTime date, string region, bool isDetailPage)
        {   
            IsDetailPage = isDetailPage;
            if((date.Hour > 15 && region == "south") || (date.Hour > 16 && region == "central"))
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
            
        }

        public DelegateCommand ShowMoreCommand { get; set; }
       
        public async void GetSourceAsync()
        {
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();

            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            
            string url = "https://api.tructiepketqua.net/api/lottery/"+Region+"/"+DateTimeNow.ToString("d-M-yyyy");
            client.BaseAddress = new Uri(url);
            var lotteryCollectionResults = new LotteryCollectionResult();
            HttpResponseMessage response = await client.GetAsync("");
            if(response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (content.Length > 2)
                {
                    if (content.StartsWith("{"))
                    {
                        var lotteryResults = new LotteryCollectionResult();
                        lotteryResults = JsonConvert.DeserializeObject<LotteryCollectionResult>(content);
                        Lottery = lotteryResults;
                        Lottery.Datas.ForEach(data => data.IsRefresh = true);
                        if (string.IsNullOrEmpty(Lottery.Datas[0].DacBiet)) { Lottery.IsLoading = true; }
                    }
                    else if (content.StartsWith("["))
                    {
                        var lotteryResults = new List<LotteryCollectionResult>();
                        lotteryResults = JsonConvert.DeserializeObject<List<LotteryCollectionResult>>(content);
                        Lottery = lotteryResults[0];
                        Lottery.Datas.ForEach(data => data.IsRefresh = true);
                        if (string.IsNullOrEmpty(Lottery.Datas[0].DacBiet)) { Lottery.IsLoading = true; }
                    }
                }
                else
                {
                    Debug.Write("nhảy vào đây");
                    Lottery = new LotteryCollectionResult();
                    Lottery.Datas.ForEach(data => data.IsRefresh = false);
                    Lottery.IsLoading = false;
                }
            }
            else if(response.StatusCode == HttpStatusCode.BadRequest)
            {
                Debug.Write("nhảy vào đây");
                Lottery = new LotteryCollectionResult();
                Lottery.Datas.ForEach(data => data.IsRefresh = false);
                Lottery.IsLoading = false;
            }
           
            
        }
        
    }
}