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
            BindingContext = new LeagueViewVM(navigationService, this);
        }
    }

    internal class LeagueViewVM : ViewModelBase
    {
        private ObservableCollection<League> _favouriteLeague;
        public ObservableCollection<League> FavouriteLeagues { get => _favouriteLeague; set => SetProperty(ref _favouriteLeague, value); }
        public ObservableCollection<League> WorldLeagues { get; set; }
        public ObservableCollection<League> ClubLeagues { get; set; }
        public ObservableCollection<League> NationLeagues { get; set; }
        private bool _IsShowMore = false;

        public bool IsShowMore
        {
            get => _IsShowMore;
            set => SetProperty(ref _IsShowMore, value);
        }

        public LeagueViewVM(INavigationService navigationService, Frame frame) : base(navigationService)
        {
            SetSource();
            //Commands
            ShowMoreCommand = new DelegateCommand(() =>
            {
                IsShowMore = !IsShowMore;
            });
        }

        public DelegateCommand ShowMoreCommand { get; set; }

        public void SetSource()
        {
            FavouriteLeagues = new ObservableCollection<League>()
            {
                new League(){ Id="pl", Name="Premier League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_premier.png") },
                new League(){ Id="l1", Name="League 1", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_league1.png") },
                new League(){ Id="asian", Name="Asian Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_asian.png") },
                new League(){ Id="vl", Name="V-League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_vleague.png") },
                 new League(){ Id="wc", Name="World Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_wc.png") }
            };
            WorldLeagues = new ObservableCollection<League>()
            {
                new League(){ Id="wc", Name="World Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_wc.png") },
                new League(){ Id="euro", Name="Euro", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_euro.png") },
                new League(){ Id="asian", Name="Asian Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_asian.png") },
                new League(){ Id="copa", Name="Copa America", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_copa.png") },
                new League(){ Id="caf", Name="Afica Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_caf.png") },
                //new League(){ Id="ocf", Name="Oceland Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_ofc.png"), BgColor=Color.FromHex("#FOFOFO") }
            };
            ClubLeagues = new ObservableCollection<League>()
            {
                new League(){ Id="cl", Name="UEFA Champion League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_uefa_cl.png") },
                new League(){ Id="el", Name="UEFA Europa League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_uefa_el.png") },
                new League(){ Id="sc", Name="Super Cup", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_uefa_sc.png") },
                new League(){ Id="afcc", Name="AFC Champion League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_afc_cl.png") },
                new League(){ Id="ccc", Name="Concacaf Champion League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_ccc_cl.png") },
                new League(){ Id="ocf", Name="Ocean Champion League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_ofc.png") }
            };
            NationLeagues = new ObservableCollection<League>()
            {
                new League(){ Id="pl", Name="Premier League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_premier.png") },
                new League(){ Id="l1", Name="League 1", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_league1.png") },
                new League(){ Id="laliga", Name="La Liga", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_laliga.png") },
                new League(){ Id="serieA", Name="Serie A", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_serieA.png") },
                new League(){ Id="bunesliga", Name="Bunesliga", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_bunesliga.png") },
                new League(){ Id="vl", Name="V-League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_vleague.png") },
                new League(){ Id="jl", Name="J-League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_jleague.png") },
                new League(){ Id="kl", Name="K-League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_kleague.png") },
                new League(){ Id="tl", Name="Thai League", Icon=ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_thaileague.png") }
            };
        }
    }
}