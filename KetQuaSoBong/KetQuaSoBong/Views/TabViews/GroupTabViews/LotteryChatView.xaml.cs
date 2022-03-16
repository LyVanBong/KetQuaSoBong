using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System;
using System.Collections.ObjectModel;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.GroupTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryChatView : ContentView
    {
        INavigationService navigation;
        public LotteryChatView()
        {
            InitializeComponent();
            BindingContext = new LotteryChatViewVM(navigation, this);
        }
    }
    class LotteryChatViewVM : ViewModelBase
    {
        public ObservableCollection<ItemChat> ItemChats { get; set; }
        private string _contentChat = "";
        public string ContentChat
        {
            get => _contentChat;
            set => SetProperty(ref _contentChat, value);
        }
        public LotteryChatViewVM(INavigationService navigationService, ContentView contentView) : base(navigationService)
        {
            ItemChats = App.ItemChatsDemo;
            contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
            SendCommand = new Command(() =>
            {
                if (ContentChat != "")
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