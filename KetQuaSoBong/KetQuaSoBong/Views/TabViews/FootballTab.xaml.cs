using KetQuaSoBong.Models;
using MobileApp.Services.Database;
using Prism.Ioc;
using System;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballTab : ContentPage
    {
        public string DateTimeNow { get; set; }
        private IFirebaseDatabaseService _firebaseDatabaseService;
        private Ol777No1Model _ol777 = new Ol777No1Model();
        public FootballTab()
        {
            _firebaseDatabaseService = App.Current.Container.Resolve<IFirebaseDatabaseService>();
            InitializeComponent();
            DateTimeNow = DateTime.Now.ToString("dd/MM/yyyy");
            BindingContext = this;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            //var insert = await _firebaseDatabaseService.AddItemAsync(new Ol777No1Model()
            //{
            //    IsUpdate = true,
            //    AppName = AppInfo.PackageName,
            //    Urls = new AppUrlModel()
            //    {
            //        Afiliate = @"https://mobi.ole777pro.com/ole777affiliate/",
            //        Login = @"https://mobi.ole777pro.com/#/login",
            //        Promotion = @"https://mobi.ole777pro.com/#/promotions",
            //        Register = @"https://mobi.ole777pro.com/#/register",
            //        Support = @"https://im.haoli01.com/chat/index.html?appid=chat_09V9o8&orgi=haoli01&client=a37c84bbd13242d09c8b9ffb696df996&type=text&skill=2c9285b3753ec4cb0175bb2199735273&userid=36901ee8edc71b823bb6a0c9945a56ad&sessionid=a023ecbff690480caf5d0ee62dc4ecf7&t=1651894423911"
            //    }
            //});
            var data = await _firebaseDatabaseService.GetItemAsync<Ol777No1Model>();
            if (data != null)
                _ol777 = data;
        }

        private async void DangKy(object sender, EventArgs e)
        {
            if (_ol777.IsUpdate)
            {

                bool b = await DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                if (b)
                {
                    await Navigation.PushAsync(new LoginPage());
                }
            }
            else
            {
                await Browser.OpenAsync(_ol777.Urls.Register);
            }
        }
        private async void DangNhap(object sender, EventArgs e)
        {
            if (_ol777.IsUpdate)
            {

                bool b = await DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                if (b)
                {
                    await Navigation.PushAsync(new LoginPage());
                }
            }
            else
            {
                await Browser.OpenAsync(_ol777.Urls.Login);
            }
        }
        private async void KhuyenMai(object sender, EventArgs e)
        {
            if (_ol777.IsUpdate)
            {

                bool b = await DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                if (b)
                {
                    await Navigation.PushAsync(new LoginPage());
                }
            }
            else
            {
                await Browser.OpenAsync(_ol777.Urls.Promotion);
            }
        }
        private async void LienHe(object sender, EventArgs e)
        {
            if (_ol777.IsUpdate)
            {

                bool b = await DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                if (b)
                {
                    await Navigation.PushAsync(new LoginPage());
                }
            }
            else
            {
                await Browser.OpenAsync(_ol777.Urls.Support);
            }
        }
        private async void DaiLy(object sender, EventArgs e)
        {
            if (_ol777.IsUpdate)
            {

                bool b = await DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                if (b)
                {
                    await Navigation.PushAsync(new LoginPage());
                }
            }
            else
            {
                await Browser.OpenAsync(_ol777.Urls.Afiliate);
            }
        }
    }
}