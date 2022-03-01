﻿using KetQuaSoBong.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryTab : ContentView
    {   
        public string DateTimeNow { get; set; }
        public LotteryTab()
        {
            InitializeComponent();
            DateTime now = DateTime.Now;
            DateTimeNow = DateTimeHelper.StandardWeekDays(now.DayOfWeek.ToString()) + ", NGÀY " + DateTimeHelper.StandardDayMonths(now.Day) + " THÁNG "+DateTimeHelper.StandardDayMonths(now.Month);
            BindingContext = this;
        }
    }
}