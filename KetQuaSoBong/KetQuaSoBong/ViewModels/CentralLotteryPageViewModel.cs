using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Views.Popups;
using Prism.Mvvm;
using System.Collections.ObjectModel;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class CentralLotteryPageViewModel : BindableBase
    {
        public ObservableCollection<LotteryCollectionResult> CentralLotteryResults { get; set; }

        public CentralLotteryPageViewModel()
        {
            CentralLotteryResults = App.CentralLotteryResults;
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