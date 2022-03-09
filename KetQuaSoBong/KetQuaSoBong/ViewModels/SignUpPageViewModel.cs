using KetQuaSoBong.Views;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KetQuaSoBong.ViewModels
{
    public class SignUpPageViewModel : ViewModelBase
    {   
        public SignUpPageViewModel(INavigationService navigationService): base(navigationService)
        {
            ShowLoginPage = new DelegateCommand(() =>
            {
                navigationService.NavigateAsync("/LoginPage");
            });
        }
        public DelegateCommand ShowLoginPage { get; set; }
    }
}
