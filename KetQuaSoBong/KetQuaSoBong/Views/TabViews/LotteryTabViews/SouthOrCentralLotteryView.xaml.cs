using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Services.Lottery;
using KetQuaSoBong.ViewModels.Lottery;
using Newtonsoft.Json;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.LotteryTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SouthOrCentralLotteryView : ContentView
    {
        SouthOrCentralLotteryService service = new SouthOrCentralLotteryService();
        public SouthOrCentralLotteryView(DateTime date, string region, bool isDetailPage)
        {
            InitializeComponent();
            BindingContext = new SouthOrCentralLotteryViewVM(date, region, isDetailPage, this, service);
        }
    }

}