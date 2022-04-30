using KetQuaSoBong.Models;
using Newtonsoft.Json;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net.Http;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.VotePageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NorthVoteTab : ContentView
    {
        public NorthVoteTab()
        {
            InitializeComponent();
            BindingContext = new NorthVoteTabVM(this);
        }
    }

    internal class NorthVoteTabVM : BindableBase
    {
        private int _count = 0;
        public string[] Numbers { get; set; }
        private bool _isVisibleResult = true;

        public bool IsVisibleResult
        {
            get => _isVisibleResult;
            set => SetProperty(ref _isVisibleResult, value);
        }

        private List<string> _numbersSelected = new List<string>();

        public List<string> NumbersSelected
        {
            get => _numbersSelected;
            set
            {
                SetProperty(ref _numbersSelected, value);
            }
        }

        public ObservableCollection<VoteItem> _resultVotes = new ObservableCollection<VoteItem>();

        public ObservableCollection<VoteItem> ResultVotes
        {
            get => _resultVotes;
            set
            {
                SetProperty(ref _resultVotes, value);
            }
        }

        private string _strNumbers = "";

        public string StrNumbers
        {
            get => _strNumbers;
            set => SetProperty(ref _strNumbers, value);
        }

        public NorthVoteTabVM(ContentView c)
        {
            Setsource(c);
        }

        public void Setsource(ContentView view)
        {
            Numbers = new string[100];
            for (int i = 0; i < 100; i++)
            {
                Numbers[i] = i < 10 ? "0" + i : i.ToString();
            }
            SelectCommand = new Command((x) =>
            {
                var btn = x as Button;

                if (btn.ClassId == "0")
                {
                    if (_count < 3)
                    {
                        _count++;
                        btn.ClassId = "1";
                        NumbersSelected.Add(btn.Text);
                        StrNumbers = string.Join(",", NumbersSelected.ToArray());
                    }
                }
                else
                {
                    _count--;
                    btn.ClassId = "0";
                    NumbersSelected.Remove(btn.Text);
                    StrNumbers = string.Join(",", NumbersSelected.ToArray());
                }
            });
            ShowHideResultCommand = new Command(() =>
            {
                Vote(view);
            });
            GoBackCommand = new Command(() =>
              {
                  IsVisibleResult = true;
              });
        }

        public async void Vote(ContentView view)
        {
            if (StrNumbers.Length > 0)
            {
                if (Preferences.Get("IsLogin", false) == true)
                {
                    HttpClient client = new HttpClient();
                    string url = "https://api.tructiepketqua.net/api/Voted/voted/" + Preferences.Get("User", "").Split(',')[4] + "?nums=" + StrNumbers;
                    HttpResponseMessage response = await client.PostAsync(url, null);
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        IsVisibleResult = false;
                        Debug.Write(NumbersSelected.Count);
                        SetListVoteAsync(NumbersSelected);

                        //SetListVote
                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                    {
                        await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Mạng lỗi, bình chọn không thành công.", "Trở lại");
                    }
                    else
                    {
                        Debug.Write(response.StatusCode);
                    }
                }
                else
                {
                    bool b = await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Để tham gia bình chọn bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                    if (b)
                    {
                        await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).Navigation.PushAsync(new LoginPage());
                    }
                    else
                    {
                        //ResetVote
                    }
                }
            }
            else
            {
                await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Vui lòng chọn ít nhất 1 con số.", "Trở lại");
            }
        }

        public async void SetListVoteAsync(List<string> votes)
        {
            //GetAllVote
            List<VoteItem> voteList = new List<VoteItem>();
            ResultVotes = new ObservableCollection<VoteItem>();
            HttpClient client;
            var httpClientHandler = new HttpClientHandler();

            httpClientHandler.ServerCertificateCustomValidationCallback =
            (message, cert, chain, errors) => { return true; };
            client = new HttpClient(httpClientHandler);
            string url = "https://api.tructiepketqua.net/api/Voted";
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync("");

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                voteList = JsonConvert.DeserializeObject<List<VoteItem>>(content);
                Debug.Write(voteList.Count);
                foreach (VoteItem v in voteList)
                {
                    foreach (string str1 in votes)
                    {
                        if (v.Number.Equals(str1))
                        {
                            ResultVotes.Add(v);
                        }
                    }
                }
            }
        }

        public Command SelectCommand { get; set; }
        public Command ShowHideResultCommand { get; set; }
        public Command GoBackCommand { get; set; }
    }
}