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
    public partial class FootballNewsTab : ContentView
    {
        INavigationService navigation;
        public FootballNewsTab()
        {
            InitializeComponent();
            BindingContext = new FootballnewsTabVM(navigation, this);
        }
    }
    class FootballnewsTabVM : ViewModelBase
    {
        public ObservableCollection<NewsItem> FootballNews { get; set; }
        public FootballnewsTabVM(INavigationService navigationService, ContentView contentView) : base(navigationService)
        {
            FootballNews = App.FootballNews;
        }
    }
}