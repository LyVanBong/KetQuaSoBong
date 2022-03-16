using Prism.Commands;
using Prism.Navigation;

namespace KetQuaSoBong.ViewModels
{
    public class SignUpPageViewModel : ViewModelBase
    {
        public SignUpPageViewModel(INavigationService navigationService) : base(navigationService)
        {
            ShowLoginPage = new DelegateCommand(() =>
            {
                navigationService.NavigateAsync("/LoginPage");
            });
        }

        public DelegateCommand ShowLoginPage { get; set; }
    }
}