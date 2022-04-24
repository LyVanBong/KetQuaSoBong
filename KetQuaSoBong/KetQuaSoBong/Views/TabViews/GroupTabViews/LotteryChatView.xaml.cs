using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Newtonsoft.Json;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Internals;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.GroupTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LotteryChatView : ContentView
    {


        public LotteryChatView()
        {
            InitializeComponent();
            BindingContext = new LotteryChatViewVM(this);
        }
    }

    internal class LotteryChatViewVM : BindableBase
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

        public LotteryChatViewVM(ContentView contentView)
        {

            GetAllChatAsync(contentView);
            Device.StartTimer(TimeSpan.FromSeconds(1), () =>
            {   
                CheckNewAsync(contentView);
                return true;
            });
            Device.StartTimer(TimeSpan.FromSeconds(1), () =>
            {
                contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);

                return false;
            });
            SendCommand = new Command(async () =>
            {
                if (ContentChat != "")
                {
                    string[] user = Preferences.Get("User", "").Split(',');
                    string userName = user[4];
                    string name = user[0];
                    string url = "https://api.tructiepketqua.net/api/Chats/XoSo/"+ userName + "/" + name + "?message=" + ContentChat;
                    ItemChat chat = new ItemChat()
                    {
                        UserName = userName,
                        Name = name,
                        Message = ContentChat,
                        Image = new Uri("https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-user-web-flaticons-flat-flat-icons-2.png"),
                        DateCreate = DateTime.Now.ToString()
                    };
                    HttpClient cient = new HttpClient();
                    string jsonData = JsonConvert.SerializeObject(ContentChat);
                    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await cient.PostAsync(url, content);
                    string result = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        GetAllChatAsync(contentView);
                        Debug.Write("OK");


                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                    {
                        await (contentView.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Mạng lỗi, tin chưa được gửi.", "Trở lại");
                    }
                    else
                    {
                        Debug.Write(response.StatusCode);
                    }
                    ContentChat = "";
                    contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
                }
            });
            FocusCommand = new Command(async () =>
            {
                if (Preferences.Get("IsLogin", true) == false)
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
            string url = "https://api.tructiepketqua.net/api/Chats/XoSo";
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                List<ItemChat> chats = JsonConvert.DeserializeObject<List<ItemChat>>(content);
                ItemChats = new ObservableCollection<ItemChat>(chats);
                contentView.FindByName<ListView>("listChat").ScrollTo(ItemChats[ItemChats.Count - 1], ScrollToPosition.End, false);
                ItemChats.ForEach(x => x.ListAllChat = chats);
            }
            else
            {
                Debug.Write(response.StatusCode);
            }

        }

        public async Task CheckNewAsync(ContentView cv)
        {
            string url = "https://api.tructiepketqua.net/api/Chats/XoSo";
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                List<ItemChat> chats = JsonConvert.DeserializeObject<List<ItemChat>>(content);
                if (chats.Count > ItemChats.Count)
                {
                    GetAllChatAsync(cv);
                }
            }
        }
        public Command SendCommand { get; set; }
        public Command FocusCommand { get; set; }
    }
}