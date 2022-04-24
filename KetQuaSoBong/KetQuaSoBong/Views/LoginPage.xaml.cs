using KetQuaSoBong.ViewModels;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
            BindingContext = new LoginPageViewModel(this);
        }
        protected override void OnAppearing()
        {
            base.OnAppearing();
        }
    }
}