using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.GroupTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballChatView : ContentView
    {
        INavigationService navigation;
        public FootballChatView()
        {
            InitializeComponent();
            BindingContext = new FootballChatViewVM(navigation, this);
        }
    }
    class FootballChatViewVM : ViewModelBase
    {
        public ObservableCollection<ItemChat> ItemChats { get; set; }
        private string _contentChat = "";
        public string ContentChat
        {
            get => _contentChat;
            set => SetProperty(ref _contentChat, value);
        }
        public FootballChatViewVM(INavigationService navigationService, ContentView contentView) : base(navigationService)
        {
            ItemChats = App.ItemChatsDemo2;
            contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
            SendCommand = new Command(() =>
            { 
                if(ContentChat!="")
                {
                    ItemChats.Add(new ItemChat()
                    {
                        NameUser = "Admin",
                        Icon = "https://cdn.24h.com.vn/upload/4-2021/images/2021-10-23/Moi-ngay-co-bao-nhieu-nguoi-trung-thuong-xo-so-so-xo-1-1634961228-677-width600height338.jpg",
                        DateTimeUpdate = DateTime.Now,
                        Content = ContentChat
                    });
                    ContentChat = "";
                    contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
                }
            });

        }
        public Command SendCommand { get; set; }

    }
}
