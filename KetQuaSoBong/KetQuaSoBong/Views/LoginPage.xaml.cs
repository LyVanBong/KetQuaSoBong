using KetQuaSoBong.ViewModels;
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