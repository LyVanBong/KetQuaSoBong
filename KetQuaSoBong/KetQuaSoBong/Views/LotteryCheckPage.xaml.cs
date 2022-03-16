using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.ViewModels;
using Prism.Navigation;
using Xamarin.Forms;

namespace KetQuaSoBong.Views
{
    public partial class LotteryCheckPage : ContentPage
    {
        private INavigationService navigationService;
        private LotteryCheckPageViewModel lotteryCheckPageViewModel;

        public LotteryCheckPage()
        {
            InitializeComponent();
            SetLotteryCheck();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            lotteryCheckPageViewModel = BindingContext as LotteryCheckPageViewModel;
            lotteryCheckPageViewModel.page = this;
        }

        private void SetLotteryCheck()
        {
            foreach (LotteryCheckItem x in App.LotteryCheckItems)
            {
                int row = StandardRowColumn(x.Number[0]);
                int column = StandardRowColumn(x.Number[1]);

                Label label = new Label()
                {
                    Text = x.Number,
                    FontSize = 17,
                    HorizontalOptions = LayoutOptions.Center,
                    TextColor = Color.Black,
                    FontFamily = "Roboto-Bold.ttf"
                };
                Label label1 = new Label()
                {
                    Text = x.Time + " lần",
                    FontSize = 12,
                    HorizontalOptions = LayoutOptions.Center,
                    TextColor = Color.FromHex("#B02019"),
                    FontFamily = "Roboto-Regular.ttf"
                };
                StackLayout stackLayout = new StackLayout()
                {
                    Spacing = 0
                };
                stackLayout.Children.Add(label);
                stackLayout.Children.Add(label1);
                RadioButton rd = new RadioButton()
                {
                    ControlTemplate = FrameRadioTemplate2,
                    IsChecked = x.IsChecked,
                    TextColor = x.NumberColor,
                    Content = stackLayout
                };
                grid.Children.Add(rd, column, row);
            }
        }

        public int StandardRowColumn(char number)
        {
            switch (number)
            {
                case '0': return 1; break;
                case '1': return 3; break;
                case '2': return 5; break;
                case '3': return 7; break;
                case '4': return 9; break;
                case '5': return 11; break;
                case '6': return 13; break;
                case '7': return 15; break;
                case '8': return 17; break;
                case '9': return 19; break;
                default: return 0; break;
            }
        }

        public string LotteryControlTemplate => "<ControlTemplate x:Key=\"FrameRadioTemplate\">\n" +
            "<Frame Padding = \"0\" HasShadow=\"False\" VerticalOptions=\"Fill\"\n" +
               "HorizontalOptions=\"Fill\"\n" +
                   "Margin=\"2,2\">\n" +

                "<VisualStateManager.VisualStateGroups>\n" +
                    "<VisualStateGroup x:Name=\"CheckedStates\">\n" +
                        "<VisualState x:Name=\"Checked\">\n" +
                            "<VisualState.Setters>\n" +
                                "<Setter Property = \"BackgroundColor\" Value=\"{StaticResource primaryColor}\"/>\n" +
                            "</VisualState.Setters>\n" +
                        "</VisualState>\n" +

                        "<VisualState x:Name=\"Unchecked\">\n" +
                            "<VisualState.Setters>\n" +
                                "<Setter Property = \"BackgroundColor\" Value=\"White\"/>\n" +
                            "</VisualState.Setters>\n" +
                        "</VisualState>\n" +
                    "</VisualStateGroup>\n" +
                "</VisualStateManager.VisualStateGroups>\n" +

                "<Grid Margin = \"4\" WidthRequest=\"100\">\n" +
                    "<ContentPresenter/>\n" +
                "</Grid>\n" +
            "</Frame>\n" +
        "</ControlTemplate>";
    }
}