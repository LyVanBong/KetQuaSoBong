﻿using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.NewsTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryNewsTab : ContentView
    {
        INavigationService navigation;
        public LotteryNewsTab()
        {
            InitializeComponent();
            BindingContext = new LotteryNewsTabVM(navigation, this);
        }
    }
    class LotteryNewsTabVM : ViewModelBase
    {   
        public ObservableCollection<NewsItem> LotteryNews { get; set; }
        public LotteryNewsTabVM(INavigationService navigationService, ContentView contentView) : base(navigationService)
        {
            LotteryNews = App.LotteryNews;
        }
    }
}