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
        private INavigationService navigation;

        public UpdateScoreView()
        {
            InitializeComponent();
        }
    }

}