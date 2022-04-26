using KetQuaSoBong.Models;
using Prism.Mvvm;
using System;
using Xamarin.Essentials;

namespace KetQuaSoBong.ViewModels
{
    public class UserProfilePageViewModel : BindableBase
    {
        private Register _user;
        public Register User
        {
            get { return _user; }
            set { SetProperty(ref _user, value); }
        }
        public UserProfilePageViewModel()
        {
            
            string[] user = Preferences.Get("User", "").Split(',');
            User = new Register()
            {
                Name = user[0],
                NumberPhone = user[1],
                Email = user[2],
                Sex = Convert.ToInt32(user[3]),
                UserName = user[4]
            };
        }
    }
}