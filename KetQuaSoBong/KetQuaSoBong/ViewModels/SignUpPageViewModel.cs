using KetQuaSoBong.Models;
using KetQuaSoBong.Services.Account.Signup;
using KetQuaSoBong.Views;
using KetQuaSoBong.Views.Popups;
using Newtonsoft.Json;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class SignUpPageViewModel : BindableBase
    {
        private bool _isVisible = true;
        SignupService signupService = new SignupService();
        public bool IsVisible
        {
            get { return _isVisible; }
            set { SetProperty(ref _isVisible, value); }
        }

        private bool _isFailFormatUN = false;

        public bool IsFailFormatUN
        {
            get { return _isFailFormatUN; }
            set { SetProperty(ref _isFailFormatUN, value); }
        }

        private bool _isFailFormatPW = false;

        public bool IsFailFormatPW
        {
            get { return _isFailFormatPW; }
            set { SetProperty(ref _isFailFormatPW, value); }
        }

        private bool _isFailFormatN = false;

        public bool IsFailFormatN
        {
            get { return _isFailFormatN; }
            set { SetProperty(ref _isFailFormatN, value); }
        }

        private bool _isFailFormatEM = false;

        public bool IsFailFormatEM
        {
            get { return _isFailFormatEM; }
            set { SetProperty(ref _isFailFormatEM, value); }
        }

        private string _s = "Giới tính";

        public string S
        {
            get { return _s; }
            set { SetProperty(ref _s, value); }
        }

        private string _phone;

        public string Phone
        {
            get { return _phone; }
            set { SetProperty(ref _phone, value); }
        }

        private string _email;

        public string Email
        {
            get { return _email; }
            set { SetProperty(ref _email, value); }
        }

        private string _name;

        public string Name
        {
            get { return _name; }
            set { SetProperty(ref _name, value); }
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

        public SignUpPageViewModel(Page page)
        {
            InputPasswordChanged = new Command(() =>
            {
                IsFailFormatPW = Password.Length < 6 ? true : false;
            });
            InputUsernameChanged = new Command(() =>
            {
                IsFailFormatUN = UserName.Length < 6 ? true : false;
            });
            InputNameChanged = new Command(() =>
            {
                IsFailFormatN = Name.Length == 0 ? true : false;
            });
            InputEmailChanged = new Command(() =>
            {
                Regex reg = new Regex(@"\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*");
                IsFailFormatEM = !reg.IsMatch(Email) ? true : false;
            });
            DialogSCommand = new DelegateCommand(async () =>
            {
                try
                {
                    S = (string)await page.Navigation.ShowPopupAsync(new SDialog());
                }
                catch (Exception ex)
                {
                }
            });
            SignupCommand = new Command(async () =>
            {
                if (IsFailFormatUN == true || IsFailFormatN == true || IsFailFormatPW == true || IsFailFormatEM == true || string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Name) || string.IsNullOrWhiteSpace(UserName) || string.IsNullOrWhiteSpace(Password) || string.IsNullOrWhiteSpace(Phone))
                {
                    IsVisible = true;
                    await page.DisplayAlert("Thông báo", "Vui lòng nhập đúng định dạng và đầy đủ thông tin.", "Trở lại");
                }
                else
                {
                    Register res = new Register()
                    {
                        UserName = UserName,
                        Passwd = Password,
                        Email = Email,
                        Name = Name,
                        NumberPhone = Phone,
                        Sex = (S != "Giới tính") ? (S == "Nam" ? 0 : (S == "Nữ" ? 1 : 2)) : 0
                    };
                    bool b = await signupService.SignUp(res);
                    if( b == true )
                    {
                        IsVisible = false;
                        await page.Navigation.PushAsync(new MainPage());
                    }
                    else
                    {
                        IsVisible = true;
                        await page.DisplayAlert("Thông báo", "Tên đăng nhập đã tồn tại vui lòng nhập tên đăng nhập khác.", "Trở lại");
                    }    
                }
            });
        }

        public Command InputPasswordChanged { get; set; }
        public Command InputUsernameChanged { get; set; }
        public Command InputNameChanged { get; set; }
        public Command InputEmailChanged { get; set; }
        public Command SignupCommand { get; set; }
        public DelegateCommand DialogSCommand { get; set; }
    }
}