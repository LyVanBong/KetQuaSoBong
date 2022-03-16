using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System.Collections.ObjectModel;
using System.Linq;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.FootballTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class UpdateScoreView : Frame
    {
        INavigationService navigation;
        public UpdateScoreView()
        {
            InitializeComponent();
            BindingContext = new UpdateScoreViewVM(navigation);
        }
    }
    class UpdateScoreViewVM : ViewModelBase
    {
        public ObservableCollection<Match> PremierScores { get; set; }
        public ObservableCollection<Match> League1Scores { get; set; }
        public ObservableCollection<Match> LaligaScores { get; set; }
        public ObservableCollection<Match> BunesligaScores { get; set; }
        public ObservableCollection<Match> SerieAScores { get; set; }


        public UpdateScoreViewVM(INavigationService navigationService) : base(navigationService)
        {
            SetSource();
            ShowHideLayoutCommand = new Command((x) =>
            {
                var layout = x as StackLayout;
                layout.IsVisible = !layout.IsVisible;
            });
        }

        public Command ShowHideLayoutCommand { get; set; }
        public void SetSource()
        {
            PremierScores = new ObservableCollection<Match>(App.LeagueScores.Where(x => x.LeagueId == "premier"));
            LaligaScores = new ObservableCollection<Match>(App.LeagueScores.Where(x => x.LeagueId == "laliga"));
            SerieAScores = new ObservableCollection<Match>(App.LeagueScores.Where(x => x.LeagueId == "serieA"));
            BunesligaScores = new ObservableCollection<Match>(App.LeagueScores.Where(x => x.LeagueId == "bunesliga"));
            League1Scores = new ObservableCollection<Match>(App.LeagueScores.Where(x => x.LeagueId == "league1"));
        }
    }
}