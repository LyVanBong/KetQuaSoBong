using KetQuaSoBong.ViewModels.Support;
using Prism.Mvvm;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SupportTab : ContentPage
    {
        public SupportTab()
        {
            InitializeComponent();
            BindingContext = new SupportTabViewModel(this);
        }
    }
   
}