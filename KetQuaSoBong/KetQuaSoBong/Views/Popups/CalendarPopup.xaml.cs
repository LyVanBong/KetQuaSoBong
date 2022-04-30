using KetQuaSoBong.Helper;
using KetQuaSoBong.Models;
using Prism.Mvvm;
using System;
using System.Collections.ObjectModel;
using Xamarin.CommunityToolkit.UI.Views;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.Popups
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CalendarPopup : Popup
    {
        public ObservableCollection<string> Days { get; set; }

        public CalendarPopup()
        {
            InitializeComponent();
            BindingContext = new CalendarPopupVM(this);
        }

        private void Popup_Dismissed(object sender, PopupDismissedEventArgs e)
        {
        }
    }

    internal class CalendarPopupVM : BindableBase
    {
        public CalendarHelper c = new CalendarHelper();

        private ObservableCollection<ItemCalendar> _calendar;

        public ObservableCollection<ItemCalendar> Calendar
        {
            get => _calendar;
            set => SetProperty(ref _calendar, value);
        }

        private string _day;

        public string Day
        {
            get => _day;
            set => SetProperty(ref _day, value);
        }

        private string _month;

        public string Month
        {
            get => _month;
            set => SetProperty(ref _month, value);
        }

        private string _year;

        public string Year
        {
            get => _year;
            set => SetProperty(ref _year, value);
        }

        private string _dateTimeResult;

        public string DateTimeResult
        {
            get => _dateTimeResult;
            set => SetProperty(ref _dateTimeResult, value);
        }

        private DateTime _dateTemp;

        public DateTime DateTemp
        {
            get => _dateTemp;
            set => SetProperty(ref _dateTemp, value);
        }

        public CalendarPopupVM(Popup popup)
        {
            string[] tmp = Preferences.Get("Date", DateTimeResult).Split('/');
            DateTime date = new DateTime(int.Parse(tmp[2]), int.Parse(tmp[1]), int.Parse(tmp[0]));
            DateTemp = date;
            SetDayMonthYear(date.Day, date.Month, date.Year);
            Calendar = c.InitCalendar(int.Parse(Day), int.Parse(Month), int.Parse(Year));
            SelectDateCommand = new Command((x) =>
            {
                var item = x as ItemCalendar;
                item.IsChecked = true;
                Day = item.Number < 10 ? "0" + item.Number : item.Number.ToString();
                foreach (ItemCalendar i in Calendar)
                {
                    if (i != item && i.IsEnable != false)
                    {
                        i.IsChecked = false;
                    }
                }
                DateTemp = new DateTime(int.Parse(Year), int.Parse(Month), int.Parse(Day), 19, 0, 0);
                DateTimeResult = DateTemp.ToString("dd/MM/yyyy");
                Preferences.Set("Date", DateTimeResult);
                popup.Dismiss(DateTemp);
            });
            PrevMonthCommand = new Command(() =>
            {
                int day = int.Parse(Day);
                int month = int.Parse(Month);
                int year = int.Parse(Year);
                if (month - 1 > 0)
                {
                    month = month - 1;
                }
                else
                {
                    month = 12;
                    year = year - 1;
                }
                SetDayMonthYear(day, month, year);
                Calendar = c.InitCalendar(int.Parse(Day), int.Parse(Month), int.Parse(Year));
            });
            NextMonthCommand = new Command(() =>
            {
                int day = int.Parse(Day);
                int month = int.Parse(Month);
                int year = int.Parse(Year);
                if (month + 1 <= 12)
                {
                    month = month + 1;
                }
                else
                {
                    month = 1;
                    year = year + 1;
                }
                SetDayMonthYear(day, month, year);
                Calendar = c.InitCalendar(int.Parse(Day), int.Parse(Month), int.Parse(Year));
            });
        }

        public Command SelectDateCommand { get; set; }
        public Command PrevMonthCommand { get; set; }
        public Command NextMonthCommand { get; set; }
        public Command DismissedCommand { get; set; }

        public void SetDayMonthYear(int day, int month, int year)
        {
            Day = day < 10 ? "0" + day : day.ToString();
            Month = month < 10 ? "0" + month : month.ToString();
            Year = year.ToString();
        }
    }
}