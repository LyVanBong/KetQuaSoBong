using System.Collections.ObjectModel;
using Xamarin.CommunityToolkit.UI.Views;
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

        }

        private void CalendarView_DateSelectionChanged(object sender, XCalendar.Models.DateSelectionChangedEventArgs e)
        {
            Dismiss(CalendarView.SelectedDates[0].ToString("dd/MM/yyyy"));
        }
    }
}