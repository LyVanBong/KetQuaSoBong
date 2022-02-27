using KetQuaSoBong.Models;
using Prism.Commands;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class MainPageFlyoutViewModel : ViewModelBase
    {
        public ObservableCollection<MainPageFlyoutMenuItem> ListItem { get; set; }
        public MainPageFlyoutViewModel(INavigationService navigationService, Page page) : base(navigationService)
        {
            ListItem = new ObservableCollection<MainPageFlyoutMenuItem>()
            {
                new MainPageFlyoutMenuItem {Id = 0, Title="Xổ số miền Bắc", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.bac.png")},
                new MainPageFlyoutMenuItem {Id = 0, Title="Xổ số miền Trung", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.trung.png")},
                new MainPageFlyoutMenuItem {Id = 0, Title="Xổ số miền Nam", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.nam.png")},
                new MainPageFlyoutMenuItem {Id = 0, Title="Soi cầu", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.soi_cau.png")},
                new MainPageFlyoutMenuItem {Id = 0, Title="Điện toán", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.dien_toan.png")},
                new MainPageFlyoutMenuItem {Id = 0, Title="Hướng dẫn", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.huong_dan.png")}
            };
            CollapseMenuCommand = new DelegateCommand(() =>
            {
                (page.Parent as FlyoutPage).IsPresented = false;
            });
        }
        public DelegateCommand CollapseMenuCommand { get; }
    }
}
