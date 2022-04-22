using KetQuaSoBong.ViewModels;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class SouthLotteryPage : ContentPage
    {
        public SouthLotteryPage()
        {
            InitializeComponent();
            BindingContext = new SouthLotteryPageViewModel(this);
        }
    }
}