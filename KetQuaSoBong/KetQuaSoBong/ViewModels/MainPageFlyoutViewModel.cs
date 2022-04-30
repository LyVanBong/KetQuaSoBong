using KetQuaSoBong.Models;
using KetQuaSoBong.Views;
using KetQuaSoBong.Views.TabViews;
using Prism.Commands;
using Prism.Navigation;
using System.Collections.ObjectModel;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class MainPageFlyoutViewModel : ViewModelBase
    {
        private INavigationService navigation;
        public ObservableCollection<MainPageFlyoutMenuItem> ListItem { get; set; }

        public MainPageFlyoutViewModel(INavigationService navigationService, Page page) : base(navigationService)
        {
            IsLogin = Preferences.Get("IsLogin", false);
            ListItem = new ObservableCollection<MainPageFlyoutMenuItem>()
            {
                new MainPageFlyoutMenuItem {Id = 0, Title="Xổ số miền Bắc", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.bac.png")},
                new MainPageFlyoutMenuItem {Id = 1, Title="Xổ số miền Trung", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.trung.png")},
                new MainPageFlyoutMenuItem {Id = 2, Title="Xổ số miền Nam", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.nam.png")},
                new MainPageFlyoutMenuItem {Id = 3, Title="Bóng đá", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.bongda.png")},
                new MainPageFlyoutMenuItem {Id = 4, Title="Dự đoán", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_vote.png")},
                new MainPageFlyoutMenuItem {Id = 5, Title="Group", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.group_chat.png")},
                new MainPageFlyoutMenuItem {Id = 6, Title="Hỗ trợ", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ho_tro.png")},

            };
            CollapseMenuCommand = new DelegateCommand(() =>
            {
                (page.Parent as FlyoutPage).IsPresented = false;
            });
            SelectedMenuItemCommand = new Command(async (x) =>
            {
                var menuItem = x as MainPageFlyoutMenuItem;
                FlyoutPage p = page.Parent as FlyoutPage;
                TabbedPage t = (p.Detail as NavigationPage).FindByName<TabbedPage>("contentPage");
                p.IsPresented = false;

                switch (menuItem.Id)
                {
                    case 0:
                        p.IsVisible = false;
                        await p.Navigation.PushAsync(new NorthLotteryPage());

                        break;

                    case 1:
                        p.IsVisible = false;
                        await p.Navigation.PushAsync(new CentralLotteryPage());

                        break;

                    case 2:
                        p.IsVisible = false;
                        await p.Navigation.PushAsync(new SouthLotteryPage());

                        break;

                    case 3:
                        t.CurrentPage = t.Children[1];

                        break;

                    case 4:
                        
                        t.CurrentPage = t.Children[2];

                        break;

                    case 5:
                        t.CurrentPage = t.Children[3];

                        break;

                    case 6:
                        t.CurrentPage = t.Children[4];

                        break;
                }
            });
            ShowUserProfilePage = new DelegateCommand(async () =>
            {
                if (Preferences.Get("IsLogin", false) == true)
                {
                    await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new UserProfilePage());
                    (page.Parent as FlyoutPage).IsPresented = false;
                }
            });
            ShowSignUpPage = new DelegateCommand(async () =>
            {
                await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new SignUpPage());
                (page.Parent as FlyoutPage).IsPresented = false;
            });
        }

        private bool _isLogin = false;

        public bool IsLogin
        {
            get => _isLogin;
            set
            {
                if (value == true) { Name = Preferences.Get("User", "").Split(',')[0]; }
                SetProperty(ref _isLogin, value);
            }
        }

        private string _name = "Tài khoản người dùng";

        public string Name
        {
            get => _name;
            set => SetProperty(ref _name, value);
        }

        public DelegateCommand CollapseMenuCommand { get; }
        public Command SelectedMenuItemCommand { get; }
        public DelegateCommand ShowUserProfilePage { get; }
        public DelegateCommand ShowSignUpPage { get; }
    }
}