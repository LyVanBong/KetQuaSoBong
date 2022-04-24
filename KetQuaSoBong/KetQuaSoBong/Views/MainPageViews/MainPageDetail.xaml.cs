using Prism.Mvvm;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.MainPageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainPageDetail : TabbedPage
    {
        public MainPageDetail()
        {
            InitializeComponent();
            BindingContext = new MainPageDetailVM(this);
        }

        private void TabbedPage_CurrentPageChanged(object sender, System.EventArgs e)
        {

        }
    }
    class MainPageDetailVM : BindableBase
    {
        private int _currentIndex = 0;
        public int CurrentIndex
        {
            get => _currentIndex;
            set => SetProperty(ref _currentIndex, value);
        }
        public MainPageDetailVM(TabbedPage p)
        {
            CurrentPageChangedCommand = new Command(async () =>
            {
                if (p.Children.IndexOf(p.CurrentPage) == 3 && Preferences.Get("IsLogin", true) == false)
                {
                    bool b = await p.DisplayAlert("Thông báo", "Để tham gia trò chuyện bạn phải đăng nhập tài khoản trước.", "Đăng nhập", "Bỏ qua");
                    if (b)
                    {
                        await p.Navigation.PushAsync(new LoginPage());
                    }

                }
            });
        }
        public Command CurrentPageChangedCommand { get; set; }
    }
}