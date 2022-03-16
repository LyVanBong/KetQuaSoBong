using Prism.Mvvm;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.VotePageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NorthVoteTab : ContentView
    {
        public NorthVoteTab()
        {
            InitializeComponent();
            BindingContext = new NorthVoteTabVM(this);
        }
    }

    internal class NorthVoteTabVM : BindableBase
    {
        private int _count = 0;
        public string[] Numbers { get; set; }
        private bool _isVisibleResult = true;

        public bool IsVisibleResult
        {
            get => _isVisibleResult;
            set => SetProperty(ref _isVisibleResult, value);
        }

        public NorthVoteTabVM(ContentView c)
        {
            Setsource(c);
        }

        public void Setsource(ContentView view)
        {
            Numbers = new string[100];
            for (int i = 0; i < 100; i++)
            {
                Numbers[i] = i < 10 ? "0" + i : i.ToString();
            }
            SelectCommand = new Command((x) =>
            {
                var btn = x as Button;
                if (btn.ClassId == "0")
                {
                    if (_count < 3)
                    {
                        _count++;
                        btn.ClassId = "1";
                    }
                }
                else
                {
                    _count--;
                    btn.ClassId = "0";
                }
            });
            ShowHideResultCommand = new Command(() =>
            {
                IsVisibleResult = !IsVisibleResult;
            });
        }

        public Command SelectCommand { get; set; }
        public Command ShowHideResultCommand { get; set; }
    }
}