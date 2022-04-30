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
                    bool b = await page.DisplayAlert("Thông báo", "Để tham gia trò chuyện bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
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