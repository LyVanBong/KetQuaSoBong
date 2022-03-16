using KetQuaSoBong.Models;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using System.Collections.ObjectModel;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.FootballTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MathPlaying : Frame
    {
        INavigationService navigation;
        public MathPlaying()
        {
            InitializeComponent();
            BindingContext = new MatchPlayingVM(navigation, this);
        }
    }
    class MatchPlayingVM : ViewModelBase
    {
        public ObservableCollection<Match> MacthPlayings { get; set; }
        public MatchPlayingVM(INavigationService navigationService, Frame frame) : base(navigationService)
        {
            MacthPlayings = App.MatchePlayings;
        }
    }
}