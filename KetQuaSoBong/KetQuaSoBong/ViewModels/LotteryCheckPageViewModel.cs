using KetQuaSoBong.Views.Popups;
using Prism.Navigation;
using Prism.Services.Dialogs;
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

        private bool _popupMienIsVisible;
        public bool PopupMienIsVisible { get => _popupMienIsVisible; set => SetProperty(ref _popupMienIsVisible, value); }
        private bool _popupLoaiIsVisible;
        public bool PopupLoaiIsVisible { get => _popupLoaiIsVisible; set => SetProperty(ref _popupLoaiIsVisible, value); }
        private IDialogService _dialogService { get; }
        public Page page { get; set; }

        public LotteryCheckPageViewModel(INavigationService navigationService, IDialogService dialogService) : base(navigationService)
        {
            _dialogService = dialogService;
            Date = DateTime.Now.ToString("dd/MM/yyyy");
            ShowHidePopupCommand = new Command(async (x) =>
            {
                var layout = x as Frame;
                switch (layout.ClassId)
                {
                    case "popupMien": PopupMienIsVisible = !PopupMienIsVisible; PopupLoaiIsVisible = false; break;
                    case "popupLoai": PopupLoaiIsVisible = !PopupLoaiIsVisible; PopupMienIsVisible = false; break;
                    case "popupDate": Date = (string)await page.Navigation.ShowPopupAsync(new CalendarPopup()); break;
                }
            });
            SelectedFilter = new Command((x) =>
            {
                var item = x as RadioButton;
                switch (item.ClassId)
                {
                    case "rdMienBac": Mien = "Miền Bắc"; PopupMienIsVisible = false; break;
                    case "rdMienTrung": Mien = "Miền Trung"; PopupMienIsVisible = false; break;
                    case "rdMienNam": Mien = "Miền Nam"; PopupMienIsVisible = false; break;
                    case "rdBachthu": Type = "Bạch thủ"; PopupLoaiIsVisible = false; break;
                    case "rdLoroi": Type = "Lô rơi"; PopupLoaiIsVisible = false; break;
                    case "rdLokep": Type = "Lô kép"; PopupLoaiIsVisible = false; break;
                    case "rdLoxien": Type = "Lô xiên"; PopupLoaiIsVisible = false; break;
                }
            });
            UpAmpCommand = new Command(() =>
            {
                Amplitude = Amplitude < 7 ? Amplitude + 1 : 7;
            });
            DownAmpCommand = new Command(() =>
            {
                Amplitude = Amplitude > 1 ? Amplitude - 1 : 1;
            });
        }

        public Command ShowHidePopupCommand { get; }
        public Command SelectedFilter { get; }
        public Command UpAmpCommand { get; }
        public Command DownAmpCommand { get; }
    }
}