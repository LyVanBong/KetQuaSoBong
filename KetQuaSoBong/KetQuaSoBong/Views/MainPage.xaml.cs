using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainPage : FlyoutPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            this.IsVisible = true;
        }
    }
}