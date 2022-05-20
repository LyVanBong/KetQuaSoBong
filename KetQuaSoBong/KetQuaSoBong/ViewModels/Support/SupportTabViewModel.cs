using KetQuaSoBong.Views;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels.Support
{
    public class SupportTabViewModel : BindableBase
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
