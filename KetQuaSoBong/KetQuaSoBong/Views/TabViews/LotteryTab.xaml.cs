using KetQuaSoBong.Helper;
using KetQuaSoBong.Views.TabViews.LotteryTabViews;
using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryTab : ContentPage
    {
        public string DateTimeNow { get; set; }

        public LotteryTab()
        {
            InitializeComponent();
            DateTime now = DateTime.Now;
            DateTimeNow = DateTimeHelper.StandardWeekDays(now.DayOfWeek.ToString()) + ", NGÀY " + DateTimeHelper.StandardDayMonths(now.Day) + " THÁNG " + DateTimeHelper.StandardDayMonths(now.Month);
            NorthLayout.Content = new NorthLotteryView(DateTime.Now, false);
            CentralLayout.Content = new SouthOrCentralLotteryView(DateTime.Now,"central", false);
            SouthLayout.Content = new SouthOrCentralLotteryView(DateTime.Now,"south", false);
            BindingContext = this;
        }
    }
}