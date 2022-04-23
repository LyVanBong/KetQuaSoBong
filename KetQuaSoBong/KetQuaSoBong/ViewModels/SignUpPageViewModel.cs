using KetQuaSoBong.Views.Popups;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Diagnostics;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class SignUpPageViewModel : BindableBase
    {
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
        private bool _isFailFormatRP;
        public bool IsFailFormatRP
        {
            get { return _isFailFormatRP; }
            set { SetProperty(ref _isFailFormatRP, value); }
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
        private string _repass;
        public string Repass
        {
            get { return _repass; }
            set { SetProperty(ref _repass, value); }
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
                IsFailFormatRP = !Password.ToLower().Equals(Repass.ToLower()) ? true : false;
            });
            InputRepassChanged = new Command(() =>
            {
                if(!string.IsNullOrEmpty(Password))
                {
                    IsFailFormatRP = !Repass.ToLower().Equals(Password.ToLower()) ? true : false;
                }
            });
            DialogSCommand = new DelegateCommand(async () =>
            {  
                try
                {
                    S = (string)await page.Navigation.ShowPopupAsync(new SDialog());
                }
                catch(Exception ex)
                {

                }
                
            });

        }
        public Command InputPasswordChanged { get; set; }
        public Command InputUsernameChanged { get; set; }
        public Command InputRepassChanged { get; set; }
        public DelegateCommand DialogSCommand { get; set; }
    }
}