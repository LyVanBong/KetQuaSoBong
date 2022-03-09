using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Views.Popups;
using Prism.Navigation;
using System;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class LotteryCheckPageViewModel : ViewModelBase
    {
        private string _mien = "Miền Bắc";
        public string Mien
        {
            get => _mien;
            set => SetProperty(ref _mien, value);
        }
        private string _type = "Bạch thủ";
        public string Type
        {
            get => _type;
            set => SetProperty(ref _type, value);
        }
        private string _date;
        public string Date
        {
            get => _date;
            set => SetProperty(ref _date, value);
        }
        private int _amplitude = 1;
        public int Amplitude
        {
            get => _amplitude;
            set => SetProperty(ref _amplitude, value);
        }
        public LotteryCheckPageViewModel(INavigationService navigationService, Page page) : base(navigationService)
        {
            Date = DateTime.Now.ToString("dd/MM/yyyy");
            ShowHidePopupCommand = new Command(async (x) =>
            {
                var popupMien = page.FindByName<Frame>("popupMien");
                var popupLoai = page.FindByName<Frame>("popupLoai");
                var layout = x as Frame;
                switch (layout.ClassId)
                {
                    case "popupMien": popupMien.IsVisible = !popupMien.IsVisible; popupLoai.IsVisible = false;  break;
                    case "popupLoai": popupLoai.IsVisible = !popupLoai.IsVisible; popupMien.IsVisible = false;  break;
                    case "popupDate": Date = (string)await page.Navigation.ShowPopupAsync(new CalendarPopup()); break;
                }
            });
            SelectedFilter = new Command((x) =>
            {
                var popupMien = page.FindByName<Frame>("popupMien");
                var popupLoai = page.FindByName<Frame>("popupLoai");
                var item = x as RadioButton;
                switch (item.ClassId)
                {
                    case "rdMienBac": Mien = "Miền Bắc"; popupMien.IsVisible = false; break;
                    case "rdMienTrung": Mien = "Miền Trung"; popupMien.IsVisible = false; break;
                    case "rdMienNam": Mien = "Miền Nam"; popupMien.IsVisible = false; break;
                    case "rdBachthu": Type = "Bạch thủ"; popupLoai.IsVisible = false; break;
                    case "rdLoroi": Type = "Lô rơi"; popupLoai.IsVisible = false; break;
                    case "rdLokep": Type = "Lô kép"; popupLoai.IsVisible = false; break;
                    case "rdLoxien": Type = "Lô xiên"; popupLoai.IsVisible = false; break;
                }
            });
            UpAmpCommand = new Command(() => {
                Amplitude = Amplitude < 7 ? Amplitude+1 : 7;
            });
            DownAmpCommand = new Command(() =>
            {
                Amplitude = Amplitude > 1 ? Amplitude-1 : 1;
            });
            
        }
       

        public Command ShowHidePopupCommand { get; }
        public Command SelectedFilter { get; }
        public Command UpAmpCommand { get; }
        public Command DownAmpCommand { get; }

    }

}
