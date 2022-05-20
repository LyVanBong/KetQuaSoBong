using System;
using System.Diagnostics;
using Prism.Mvvm;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using KetQuaSoBong.ViewModels.Support;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SupportTab : ContentPage
    {
        public SupportTab()
        {
            InitializeComponent();
            BindingContext = new SupportTabViewModel(this);
        }

        private void TapGestureRecognizer_OnTapped(object sender, EventArgs e)
        {
            try
            {
                Browser.OpenAsync("https://www.facebook.com/groups/738082837533203", BrowserLaunchMode.SystemPreferred);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);
            }
        }

        private void TapGestureRecognizer_OnTapped2(object sender, EventArgs e)
        {
            try
            {
                Browser.OpenAsync("https://t.me/tructiepketqua", BrowserLaunchMode.External);
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);
            }
        }
    }
}