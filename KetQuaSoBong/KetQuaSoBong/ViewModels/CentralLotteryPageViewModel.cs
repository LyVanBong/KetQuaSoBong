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
    public class CentralLotteryPageViewModel : BindableBase
    {
        private bool _isVisible = false;
        public bool IsVisible
        {
            get { return _isVisible; }
            set { SetProperty(ref _isVisible, value); }
        }
        public CentralLotteryPageViewModel(Page page)
        {
            Device.StartTimer(TimeSpan.FromSeconds(1), () =>
            {
                Device.BeginInvokeOnMainThread(() =>
                {
                    try
                    {
                        
                        page.FindByName<StackLayout>("ListResult").Children.Add(new SouthOrCentralLotteryView(DateTime.Now, "central", true));
                        
                        IsVisible = true;
                    }
                    catch (Exception ex)
                    {
                        Debug.Write(ex.Message);
                    }



                });
                return false;
            });
            ShowDialog = new Command(async () =>
            {
                try
                {
                    Date = (DateTime) await Application.Current.MainPage.Navigation.ShowPopupAsync(new CalendarPopup());
                }
                catch (Exception ex)
                {
                    Debug.Write(ex.Message);
                }

                page.FindByName<StackLayout>("ListResult").Children.Clear();
                page.FindByName<StackLayout>("ListResult").Children.Add(new SouthOrCentralLotteryView(Date, "central", true));
            });
        }

        private DateTime _date = DateTime.Now;

        public DateTime Date
        {
            get => _date;
            set => SetProperty(ref _date, value);
        }

        public Command ShowDialog { get; set; }
    }
}