using KetQuaSoBong.Models;
using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.Services.Account.Login;
using KetQuaSoBong.Services.Account.Signup;
using KetQuaSoBong.Services.Lottery;
using KetQuaSoBong.Services.NumberVoted;
using KetQuaSoBong.ViewModels;
using KetQuaSoBong.ViewModels.Lottery;
using KetQuaSoBong.Views;
using KetQuaSoBong.Views.MainPageViews;
using KetQuaSoBong.Views.Popups;
using KetQuaSoBong.Views.TabViews;
using KetQuaSoBong.Views.TabViews.LotteryTabViews;
using Prism;
using Prism.Ioc;
using System;
using System.Collections.ObjectModel;
using KetQuaSoBong.Services.Firebase;
using MobileApp.Services.Database;
using Xamarin.Essentials;
using Xamarin.Essentials.Implementation;
using Xamarin.Essentials.Interfaces;
using Xamarin.Forms;

[assembly: ExportFont("Roboto-Black.ttf", Alias = "RB")]
[assembly: ExportFont("Roboto-BlackItalic.ttf", Alias = "RBI")]
[assembly: ExportFont("Roboto-Bold.ttf", Alias = "RBo")]
[assembly: ExportFont("Roboto-BoldItalic.ttf", Alias = "RBoI")]
[assembly: ExportFont("Roboto-Italic.ttf", Alias = "RI")]
[assembly: ExportFont("Roboto-Light.ttf", Alias = "RL")]
[assembly: ExportFont("Roboto-LightItalic.ttf", Alias = "RLI")]
[assembly: ExportFont("Roboto-Medium.ttf", Alias = "RM")]
[assembly: ExportFont("Roboto-MediumItalic.ttf", Alias = "RMI")]
[assembly: ExportFont("Roboto-Regular.ttf", Alias = "R")]
[assembly: ExportFont("Roboto-Thin.ttf", Alias = "RT")]
[assembly: ExportFont("Roboto-ThinItalic.ttf", Alias = "RTI")]

namespace KetQuaSoBong
{
    public partial class App
    {
        public static string ApiUrl = "https://tructiepketqua.net/api/";



        public App(IPlatformInitializer initializer)
            : base(initializer)
        {
        }

        protected override async void OnInitialized()
        {
            InitializeComponent();


            await NavigationService.NavigateAsync("NavigationPage/MainPage");
            Preferences.Set("Date", DateTime.Now.ToString("dd/MM/yyyy"));
            Preferences.Set("NumLog", 1);
            if (Preferences.Get("NumLog", 0) == 0)
            {
                Preferences.Set("IsLogin", false);
            }

            Preferences.Set("S", "rdNam");
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterSingleton<IAppInfo, AppInfoImplementation>();
            //Services
            containerRegistry.Register<ILoginService, LoginService>();
            containerRegistry.Register<ISignupService, SignupService>();
            //Dialogs
            containerRegistry.RegisterDialog<SDialog, SDialogVM>();
            //ViewModels
            containerRegistry.RegisterForNavigation<NavigationPage>();
            containerRegistry.RegisterForNavigation<MainPage, MainPageViewModel>();
            containerRegistry.RegisterForNavigation<SplashScreen, SplashScreenViewModel>();
            containerRegistry.RegisterForNavigation<MainPageFlyout, MainPageFlyoutViewModel>();
            containerRegistry.RegisterForNavigation<UserProfilePage, UserProfilePageViewModel>();
            containerRegistry.RegisterForNavigation<LoginPage, LoginPageViewModel>();
            containerRegistry.RegisterForNavigation<SignUpPage, SignUpPageViewModel>();
            containerRegistry.RegisterForNavigation<NorthLotteryPage, NorthLotteryPageViewModel>();
            containerRegistry.RegisterForNavigation<VotePage, VotePageViewModel>();
            containerRegistry.RegisterForNavigation<SouthLotteryPage, SouthLotteryPageViewModel>();
            containerRegistry.RegisterForNavigation<CentralLotteryPage, CentralLotteryPageViewModel>();

            containerRegistry.Register<IFirebaseDatabaseService, FirebaseDatabaseService>();
        }
    }
}