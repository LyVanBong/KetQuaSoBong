using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Views.Popups;
using KetQuaSoBong.Views.TabViews.LotteryTabViews;
using Prism.Mvvm;
using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class SouthLotteryPageViewModel : BindableBase
    {
        private bool _isVisible = false;
        public bool IsVisible
        {
            get { return _isVisible; }
            set { SetProperty(ref _isVisible, value); }
        }

        public SouthLotteryPageViewModel(Page page)
        {
            Device.StartTimer(TimeSpan.FromSeconds(5), () =>
            {
                Device.BeginInvokeOnMainThread(() =>
                {
                    try
                    {
                        DateTime now = DateTime.Now;
                        TimeSpan time = new TimeSpan(10, 0, 0, 0);
                        DateTime beforeDate = now.Subtract(time);
                        Debug.Write(beforeDate.ToString());
                        for (DateTime i = now.Subtract(new TimeSpan(1, 0, 0, 0)); i > beforeDate; i = i.Subtract(new TimeSpan(1, 0, 0, 0)))
                        {
                            page.FindByName<StackLayout>("ListResult").Children.Add(new SouthOrCentralLotteryView(i, "south"));
                        }
                        IsVisible = true;
                    }
                    catch (Exception ex)
                    {
                        Debug.Write(ex.Message);
                    }



                });
                return false;
            });
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