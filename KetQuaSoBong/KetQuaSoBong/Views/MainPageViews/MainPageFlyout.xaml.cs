using KetQuaSoBong.ViewModels;
using Prism.Navigation;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.MainPageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainPageFlyout : ContentPage
    {
        INavigationService navigation;

        public MainPageFlyout()
        {
            InitializeComponent();
            BindingContext = new MainPageFlyoutViewModel(navigation, this);


        }


    }
}