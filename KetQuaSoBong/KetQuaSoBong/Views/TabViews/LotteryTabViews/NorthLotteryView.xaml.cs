﻿using KetQuaSoBong.Extensions;
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
    public partial class NorthLotteryView : ContentView
    {
        
        public NorthLotteryView(DateTime date)
        {
            InitializeComponent();
            BindingContext = new NorthLoterryViewVM(date);
        }
       
    }

    internal class NorthLoterryViewVM : BindableBase
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

        private LotteryResult _northLottery;
        public LotteryResult NorthLottery
        {
            get => _northLottery;
            set => SetProperty(ref _northLottery, value);
        }
        public ObservableCollection<LotteryResult> Items { get; set; }

        public NorthLoterryViewVM(DateTime date)
        {
            DateTimeNow = date;
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
            string url = "https://api.tructiepketqua.net/api/lottery/northern/"+DateTimeNow.ToString("d-M-yyyy");
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");

            if(response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if(content.StartsWith("{"))
                {
                    var lotteryResults = new LotteryResult();
                    lotteryResults = JsonConvert.DeserializeObject<LotteryResult>(content);
                    NorthLottery = lotteryResults;
                    NorthLottery.IsRefresh = true;
                }
                else
                {
                    var lotteryResults = new List<LotteryResult>();
                    lotteryResults = JsonConvert.DeserializeObject<List<LotteryResult>>(content);
                    NorthLottery = lotteryResults[0];
                    NorthLottery.IsRefresh = true;
                }
                
            }
            else if(response.StatusCode == HttpStatusCode.BadRequest)
            {
                Debug.Write("nhảy vào đây");
                NorthLottery = new LotteryResult();
                NorthLottery.IsRefresh = false;
            }
           
            
        }
        
    }
}