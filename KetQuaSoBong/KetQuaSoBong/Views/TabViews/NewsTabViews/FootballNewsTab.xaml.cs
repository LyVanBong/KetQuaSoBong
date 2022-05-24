using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System.Collections.ObjectModel;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.NewsTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballNewsTab : ContentView
    {
        private INavigationService navigation;

        public FootballNewsTab()
        {
            InitializeComponent();
           
        }
    }

 
}