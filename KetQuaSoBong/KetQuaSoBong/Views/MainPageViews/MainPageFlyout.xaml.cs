using KetQuaSoBong.ViewModels;
using Prism.Navigation;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.MainPageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainPageFlyout : ContentPage
    {
        private INavigationService navigation;

        public MainPageFlyout()
        {
            InitializeComponent();
            BindingContext = new MainPageFlyoutViewModel(navigation, this);
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
        }
    }
}