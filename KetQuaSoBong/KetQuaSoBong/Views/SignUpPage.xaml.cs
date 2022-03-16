using Prism.Navigation;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class SignUpPage : ContentPage
    {
        private INavigationService navigation;

        public SignUpPage()
        {
            InitializeComponent();
        }

        private void TapGestureRecognizer_Tapped(object sender, System.EventArgs e)
        {
            Navigation.PushAsync(new LoginPage());
        }
    }
}