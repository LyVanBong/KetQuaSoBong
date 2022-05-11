using KetQuaSoBong.Services.Group.LotteryChat;
using KetQuaSoBong.ViewModels.Group;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.GroupTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryChatView : ContentView
    {
        LotteryChatService lotteryChatService = new LotteryChatService();
        public LotteryChatView()
        {
            InitializeComponent();
            BindingContext = new LotteryChatViewVM(this, lotteryChatService);
        }
    }

    
}