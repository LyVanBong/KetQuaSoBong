using KetQuaSoBong.Models;
using Prism.Mvvm;
using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballTab : ContentPage
    {
        

        public FootballTab()
        {
            InitializeComponent();
            BindingContext = new FootballTabViewModel();
        }
    }
    class FootballTabViewModel : BindableBase
    {
        public string DateTimeNow { get; set; }
        private string _webSource;
        public string WebSource
        {
            get { return _webSource; }
            set { SetProperty(ref _webSource, value); }
        }
        public FootballTabViewModel()
        {
            DateTimeNow = DateTime.Now.ToString("dd/MM/yyyy");
            WebSource = "file:///android_asset/www.scorespro.com/www.scorespro.com/index.html";
        }
    }
}