using KetQuaSoBong.Extensions;
using KetQuaSoBong.Helper;
using KetQuaSoBong.ViewModels;
using Prism.Commands;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Internals;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews.LotteryTabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NorthLotteryView : Frame
    {
        private INavigationService navigation;
        public NorthLotteryView()
        {
            InitializeComponent();
            BindingContext = new NorthLoterryViewVM(navigation, this);
        }
    }
    class NorthLoterryViewVM : ViewModelBase
    {
        private string _datetimeNow; 
        public string DateTimeNow
        {
            get => _datetimeNow;
            set => SetProperty(ref _datetimeNow, value);
        }
        private bool _IsShowMore = false;
        public bool IsShowMore
        {
            get => _IsShowMore;
            set => SetProperty(ref _IsShowMore, value);
        }
        private string _db;
        public string DB { get => _db; set=> SetProperty(ref _db, value); }
        private string _g1;
        public string G1 { get=>_g1; set=>SetProperty(ref _g1, value); }
        private string[] _arrG2;
        public string[] ArrG2 { get=>_arrG2; set=>SetProperty(ref _arrG2,value); }
        private string[] _arrG31;
        public string[] ArrG31 { get=> _arrG31; set=> SetProperty(ref _arrG31,value); }
        private string[] _arrG32;
        public string[] ArrG32 { get => _arrG32; set => SetProperty(ref _arrG32, value); }
        private string[] _arrG4;
        public string[] ArrG4 { get => _arrG4; set => SetProperty(ref _arrG4, value); }
        private string[] _arrG51;
        public string[] ArrG51 { get => _arrG51; set => SetProperty(ref _arrG51, value); }
        private string[] _arrG52;
        public string[] ArrG52 { get => _arrG52; set => SetProperty(ref _arrG52, value); }
        private string[] _arrG6;
        public string[] ArrG6 { get => _arrG6; set => SetProperty(ref _arrG6, value); }
        private string[] _arrG7;
        public string[] ArrG7 { get => _arrG7; set => SetProperty(ref _arrG7, value); }
        private string[] _arrAll;
        public string[] ArrAll { get => _arrAll; set => SetProperty(ref _arrAll, value); }
        public string[] FirstNum { get; set; }
        public string[] LastNum { get; set; }
        public string[] NumberTemp { get; set; }
        public string[] ArrLoto { get; set; }
        public NorthLoterryViewVM(INavigationService navigationService, Frame view) : base(navigationService)
        {
            DateTime now = DateTime.Now;
            DateTimeNow = DateTimeHelper.StandardWeekDays(now.DayOfWeek.ToString()) + ", " + now.ToString("dd/MM/yyyy");
            NumberTemp = new string[] { "0","1","2","3","4","5","6","7","8","9" }; 
            FirstNum = new string[10];
            LastNum = new string[10];
            SetSource(StandardArray(0));
            GetFirstLast(view);
            
            //Commands
            ShowMoreCommand = new DelegateCommand(() =>
            {    
                
                IsShowMore = !IsShowMore;
            });
            ChangeDisplayNumberCommand = new Command((x) => 
            {
                var button = (x as RadioButton);
                switch (button.ClassId)
                {
                    case "AllNum": SetSource(StandardArray(0)); break;
                    case "2Num": SetSource(StandardArray(2)); break;
                    case "3Num": SetSource(StandardArray(3)); break;
                }
            });
        }
        public DelegateCommand ShowMoreCommand { get; set; }
        public Command ChangeDisplayNumberCommand { get; set; }
        
       
        private void GetFirstLast(Frame v)
        {
            string[] result = App.NorthLotteryResultTest;
            ArrLoto = new string[result.Length];
           
            List<double> temp = new List<double>();
            for (int i = 0; i < result.Length; i++)
            {
                string str = result[i].Substring(result[i].Length - 2);
               
                temp.Add(double.Parse(str));
            }
            
            //Sắp xếp danh sách
            temp.Sort();
            //Tách lấy đầu đuôi
            for (int i = 0; i < result.Length; i++)
            {
                result[i] = temp[i] < 10 ? "0" + temp[i] : temp[i].ToString();
                ArrLoto[i] = result[i];
                LastNum[int.Parse(result[i].Substring(0, 1))] = String.IsNullOrEmpty(LastNum[int.Parse(result[i].Substring(0, 1))]) ? LastNum[int.Parse(result[i].Substring(0, 1))] += result[i].Substring(1, 1) : LastNum[int.Parse(result[i].Substring(0, 1))] += ", " + result[i].Substring(1, 1);
                FirstNum[int.Parse(result[i].Substring(1, 1))] = String.IsNullOrEmpty(FirstNum[int.Parse(result[i].Substring(1, 1))]) ? FirstNum[int.Parse(result[i].Substring(1, 1))] += result[i].Substring(0, 1) : FirstNum[int.Parse(result[i].Substring(1, 1))] += ", " + result[i].Substring(0, 1);
            }
            //
            int count = -1;
            var gridLoto = v.FindByName<Grid>("gridLoto");
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 9; j++)
                {
                    count++;
                    Label lb = new Label()
                    {
                        Text = ArrLoto[count],
                        FontFamily = "RBo",
                        TextColor = Color.Black,
                        FontSize = 16,
                        HorizontalOptions = LayoutOptions.Center,
                        VerticalOptions = LayoutOptions.Center
                    };
                    Frame frame = new Frame()
                    {
                        Padding = 0,
                        CornerRadius = 0,
                        BorderColor = Color.LightGray,
                        HasShadow = false,
                        Content = lb

                    };
                    gridLoto.Children.Add(frame, j, i);
                }
            }
        }

        private string[] StandardArray(int type)
        {
            string[] arr = App.NorthLotteryResultTest;
            for (int i = 0; i < arr.Length; i++)
            {
                if(type == 0)
                {
                    arr[i] = arr[i];
                }
                else if(type == 2)
                {
                    arr[i] = arr[i].Substring(arr[i].Length - 2);
                }
                else 
                {
                    arr[i] = arr[i].Length > 3 ? arr[i].Substring(arr[i].Length - 3) : arr[i];
                }
            }
            return arr;
        }

        public void SetSource(string[] arr)
        {
            DB = arr[0];
            G1 = arr[1];
            ArrG2 = arr.SubArray(2, 2);
            ArrG31 = arr.SubArray(4, 3);
            ArrG32 = arr.SubArray(7, 3);
            ArrG4 = arr.SubArray(10, 4);
            ArrG51 = arr.SubArray(14, 3);
            ArrG52 = arr.SubArray(17, 3);
            ArrG6 = arr.SubArray(20, 3);
            ArrG7 = arr.SubArray(23, 4);
        }



       
    }
}