using KetQuaSoBong.ViewModels;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class CentralLotteryPage : ContentPage
    {
        public CentralLotteryPage()
        {
            InitializeComponent();
            BindingContext = new CentralLotteryPageViewModel(this);
        }
    }
}