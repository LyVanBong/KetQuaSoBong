using Prism.Navigation;
using System;
using System.Diagnostics;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels
{
    public class SplashScreenViewModel : ViewModelBase
    {
        private int _dem;
        private string _lblLoading = "";
        public string LblLoading
        {
            get => _lblLoading;
            set => SetProperty(ref _lblLoading, value);
        }
        public SplashScreenViewModel(INavigationService navigationService) : base(navigationService)
        {
            Title = "SplashScreen";

            var stopWatch = new Stopwatch();
            stopWatch.Start();
            Device.StartTimer(TimeSpan.FromSeconds(1 / 2f), () =>
                {
                    LblLoading = LblLoading == "..." ? "" : (LblLoading + ".");
                    _dem++;
                    if (_dem == 20)
                    {
                        stopWatch.Stop();

                        navigationService.NavigateAsync("/MainPage");
                        return false;
                    }
                    return true;
                });


        }
    }
}
