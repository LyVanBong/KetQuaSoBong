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
            BindingContext = new FootballnewsTabVM(navigation, this);
        }
    }

    internal class FootballnewsTabVM : ViewModelBase
    {
        public ObservableCollection<NewsItem> FootballNews { get; set; }

        public FootballnewsTabVM(INavigationService navigationService, ContentView contentView) : base(navigationService)
        {
            FootballNews = App.FootballNews;
        }
    }
}