using KetQuaSoBong.Models;
using KetQuaSoBong.Views;
using Prism.Commands;
using Prism.Navigation;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class MainPageFlyoutViewModel : ViewModelBase
    {
        INavigationService navigation;
        public ObservableCollection<MainPageFlyoutMenuItem> ListItem { get; set; }
        public MainPageFlyoutViewModel(INavigationService navigationService, Page page) : base(navigationService)
        {
          
            ListItem = new ObservableCollection<MainPageFlyoutMenuItem>()
            {
                new MainPageFlyoutMenuItem {Id = 0, Title="Xổ số miền Bắc", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.bac.png")},
                new MainPageFlyoutMenuItem {Id = 1, Title="Xổ số miền Trung", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.trung.png")},
                new MainPageFlyoutMenuItem {Id = 2, Title="Xổ số miền Nam", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.nam.png")},
                new MainPageFlyoutMenuItem {Id = 3, Title="Soi cầu", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.soi_cau.png")},
                new MainPageFlyoutMenuItem {Id = 4, Title="Bình chọn", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_vote.png")},
                new MainPageFlyoutMenuItem {Id = 5, Title="Điện toán", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.dien_toan.png")},
                new MainPageFlyoutMenuItem {Id = 6, Title="Hướng dẫn", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.huong_dan.png")}
            };
            CollapseMenuCommand = new DelegateCommand(() =>
            {
                (page.Parent as FlyoutPage).IsPresented = false;
            });
            SelectedMenuItemCommand = new Command(async (x) =>
            {
                var menuItem = x as MainPageFlyoutMenuItem;
                switch(menuItem.Id)
                {
                    case 0:
                        await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new NorthLotteryPage());
                        (page.Parent as FlyoutPage).IsPresented = false;
                        break;
                    case 3:
                        await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new LotteryCheckPage());
                        (page.Parent as FlyoutPage).IsPresented = false;
                        break;
                    case 4:
                        await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new VotePage());
                        (page.Parent as FlyoutPage).IsPresented = false;
                        break;

                }
               
            });
            ShowUserProfilePage = new DelegateCommand(async () =>
            {
                await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new UserProfilePage());
                (page.Parent as FlyoutPage).IsPresented = false;
            });
            ShowSignUpPage = new DelegateCommand(async () =>
            {
                await (page.Parent as FlyoutPage).Detail.Navigation.PushAsync(new SignUpPage());
                (page.Parent as FlyoutPage).IsPresented = false;
            });

        }
        public DelegateCommand CollapseMenuCommand { get; }
        public Command SelectedMenuItemCommand { get; }
        public DelegateCommand ShowUserProfilePage { get; }
        public DelegateCommand ShowSignUpPage { get; }

    }
}
