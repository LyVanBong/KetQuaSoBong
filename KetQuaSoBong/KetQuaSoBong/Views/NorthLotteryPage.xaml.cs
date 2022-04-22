using KetQuaSoBong.ViewModels;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class NorthLotteryPage : ContentPage
    {
        public NorthLotteryPage()
        {
            InitializeComponent();
            BindingContext = new NorthLotteryPageViewModel(this);
        }
    }
}