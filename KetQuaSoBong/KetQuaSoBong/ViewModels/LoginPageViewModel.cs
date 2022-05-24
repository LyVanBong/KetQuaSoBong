using KetQuaSoBong.Models;
using KetQuaSoBong.Services.Account.Login;
using KetQuaSoBong.Views;
using Newtonsoft.Json;
using Prism.Mvvm;
using Prism.Navigation;
using Prism.Services;
using Prism.Services.Dialogs;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class LoginPageViewModel : ViewModelBase
    {
        private bool _isVisible = true;
        private ILoginService _loginService;
        private IPageDialogService _pageDialogService;
        private INavigationService _navigationService;
        private IDialogService _dialogService; 

        public bool IsVisible
        {
            get { return _isVisible; }
            set { SetProperty(ref _isVisible, value); }
        }

        private bool _isFailFormatUN;

        public bool IsFailFormatUN
        {
            get { return _isFailFormatUN; }
            set { SetProperty(ref _isFailFormatUN, value); }
        }

        private bool _isFailFormatPW;

        public bool IsFailFormatPW
        {
            get { return _isFailFormatPW; }
            set { SetProperty(ref _isFailFormatPW, value); }
        }

        private string _password;

        public string Password
        {
            get { return _password; }
            set { SetProperty(ref _password, value); }
        }

        private string _userName;

        public string UserName
        {
            get { return _userName; }
            set { SetProperty(ref _userName, value); }
        }

        public LoginPageViewModel(ILoginService loginService, IPageDialogService pageDialogService, INavigationService navigationService) : base(navigationService)
        {
            _loginService = loginService;
            _pageDialogService = pageDialogService;
            _navigationService = navigationService;
            Preferences.Set("IsLogin", false);
            Preferences.Clear("User");
            InputPasswordChanged = new Command(() =>
            {
                IsFailFormatPW = Password.Length < 6 ? true : false;
            });
            InputUsernameChanged = new Command(() =>
            {
                IsFailFormatUN = UserName.Length < 6 ? true : false;
            });
            LoginCommand = new Command(async () =>
            {
                IsVisible = false;
                if (IsFailFormatUN == true || IsFailFormatPW == true || string.IsNullOrWhiteSpace(UserName) || string.IsNullOrWhiteSpace(Password))
                {
                    IsVisible = true;
                    await _pageDialogService.DisplayAlertAsync("Thông báo", "Vui lòng nhập đúng định dạng và đầy đủ thông tin.", "Trở lại");
                }
                else
                {
                    bool b = await loginService.Login(UserName, Password);
                    if(b == true)
                    {
                        IsVisible = false;
                        await _navigationService.NavigateAsync("MainPage");
                    }
                    else
                    {
                        IsVisible = true;
                        await _pageDialogService.DisplayAlertAsync("Thông báo", "Tài khoản hoặc mật khẩu không chính xác.", "Trở lại");
                    }
                 }
            });
        }

        public Command LoginCommand { get; set; }
        public Command InputPasswordChanged { get; set; }
        public Command InputUsernameChanged { get; set; }
    }
}