using KetQuaSoBong.Models;
using KetQuaSoBong.Services.Group.FootballChat;
using KetQuaSoBong.Views;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Internals;

namespace KetQuaSoBong.ViewModels.Group
{
    public class FootballChatViewVM : BindableBase
    {
        private ObservableCollection<ItemChat> _itemChats = new ObservableCollection<ItemChat>();

        public ObservableCollection<ItemChat> ItemChats
        {
            get => _itemChats;
            set => SetProperty(ref _itemChats, value);
        }

        private string _contentChat = "";

        public string ContentChat
        {
            get => _contentChat;
            set => SetProperty(ref _contentChat, value);
        }
        private FootballChatService _footballChatService;
        public FootballChatViewVM(ContentView contentView, FootballChatService footballChatService)
        {
            this._footballChatService = footballChatService;
            GetAllChatAsync(contentView);
            if ((ItemChats.Count > 0))
            {
                contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
            }
            Device.StartTimer(TimeSpan.FromSeconds(1), () =>
            {
                Device.BeginInvokeOnMainThread(() =>
                {
                    CheckNewAsync(contentView);
                });
                return true;
            });
            SendCommand = new Command(async () =>
            {
                string[] user = Preferences.Get("User", "").Split(',');
                string userName = user[4];
                string name = user[0];
                ItemChat chat = new ItemChat()
                {
                    UserName = userName,
                    Name = name,
                    Message = ContentChat,
                    Image = new Uri("https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-user-web-flaticons-flat-flat-icons-2.png"),
                    DateCreate = DateTime.Now.ToString()
                };
                if (ContentChat != "")
                {
                    bool b = await _footballChatService.SendChatAsync(chat);
                    if (b == true)
                    {
                        ItemChats.Add(chat);
                        GetAllChatAsync(contentView);
                        ContentChat = "";
                        Debug.Write("OK");
                    }

                    ContentChat = "";
                    if ((ItemChats.Count > 0))
                    {
                        contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
                    }
                }
            });
            FocusCommand = new Command(async () =>
            {
                if (Preferences.Get("IsLogin", false) == false)
                {
                    bool b = await (contentView.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Để tham gia trò chuyện bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                    if (b)
                    {
                        await (contentView.Parent.Parent.Parent as Page).Navigation.PushAsync(new LoginPage());
                    }
                    else
                    {
                        contentView.FindByName<Entry>("entryChat").Unfocus();
                    }
                }
            });
        }

        public async void GetAllChatAsync(ContentView contentView)
        {
            List<ItemChat> chats = await _footballChatService.GetAllChat();
            if (chats.Count > 0)
            {
                ItemChats = new ObservableCollection<ItemChat>(chats);
                if ((ItemChats.Count > 0))
                {
                    contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
                }
                ItemChats.ForEach(x => x.ListAllChat = chats);
            }
        }

        public async void CheckNewAsync(ContentView cv)
        {
            List<ItemChat> chats = await _footballChatService.GetAllChat();
            if (chats.Count > ItemChats.Count)
            {
                GetAllChatAsync(cv);
            }
        }

        public Command SendCommand { get; set; }
        public Command FocusCommand { get; set; }
    }
}
