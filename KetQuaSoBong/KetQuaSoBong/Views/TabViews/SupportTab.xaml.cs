using System;
using System.Diagnostics;
using Prism.Mvvm;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SupportTab : ContentPage
    {
        public SupportTab()
        {
            InitializeComponent();
            BindingContext = new SupportTabViewModel(this);
        }

        private void TapGestureRecognizer_OnTapped(object sender, EventArgs e)
        {
            try
            {
                Browser.OpenAsync("https://www.facebook.com/groups/738082837533203", BrowserLaunchMode.SystemPreferred);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);
            }
        }

        private void TapGestureRecognizer_OnTapped2(object sender, EventArgs e)
        {
            try
            {
                Browser.OpenAsync("https://t.me/tructiepketqua", BrowserLaunchMode.External);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);
            }
        }
    }
    class SupportTabViewModel : BindableBase
    {
        public SupportTabViewModel(ContentPage page)
        {
            SendSupport = new Command(async () =>
            {
                if (Preferences.Get("IsLogin", false) == true)
                {

                }
                else
                {
                    bool b = await page.DisplayAlert("Thông báo", "Để gửi phản hồi bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                    if (b)
                    {
                        await (page.Parent as Page).Navigation.PushAsync(new LoginPage());
                    }
                }
            });
        }
        public Command SendSupport { get; set; }
    }
}