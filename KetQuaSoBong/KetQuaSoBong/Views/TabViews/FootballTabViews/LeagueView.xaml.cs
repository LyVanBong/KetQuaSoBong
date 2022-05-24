using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Commands;
using Prism.Navigation;
using System.Collections.ObjectModel;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.FootballTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LeagueView : Frame
    {
        private INavigationService navigationService;

        public LeagueView()
        {
            InitializeComponent();
        }
    }

   
}