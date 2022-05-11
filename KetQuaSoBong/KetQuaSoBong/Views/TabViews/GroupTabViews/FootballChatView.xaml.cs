using KetQuaSoBong.Services.Group.FootballChat;
using KetQuaSoBong.ViewModels.Group;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.GroupTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballChatView : ContentView
    {
        FootballChatService footballChatService = new FootballChatService();
        public FootballChatView()
        {
            InitializeComponent();
            BindingContext = new FootballChatViewVM(this, footballChatService );
        }
    }
}