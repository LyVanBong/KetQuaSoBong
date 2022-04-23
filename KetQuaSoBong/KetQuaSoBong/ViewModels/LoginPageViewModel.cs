using Prism.Mvvm;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class LoginPageViewModel : BindableBase
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
       
        public LoginPageViewModel()
        {
            InputPasswordChanged = new Command(() =>
            {
                IsFailFormatPW = Password.Length < 6 ? true: false;
            });
            InputUsernameChanged = new Command(() =>
            {
                IsFailFormatUN = UserName.Length < 6 ? true : false;
            });
        }
        public Command InputPasswordChanged { get; set; }
        public Command InputUsernameChanged { get; set; }
    }
}