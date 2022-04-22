using Newtonsoft.Json;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Xamarin.Forms;

namespace KetQuaSoBong.Models.LotteryModel
{
    public class LotteryCollectionResult : BindableBase
    {
        public LotteryCollectionResult()
        {
            ChangeDisplayNumberCommand = new Command((x) =>
            {
                var button = (x as RadioButton);

                switch (button.ClassId)
                {
                    case "AllNum": Datas.ForEach((d) => { if (d.IsRefresh == true) { d.SetAllNumberDisplay(); } }); ; break;
                    case "2Num": Datas.ForEach((d) => { if (d.IsRefresh == true) { d.Set2NumberDisplay(); } }); ; break;
                    case "3Num": Datas.ForEach((d) => { if (d.IsRefresh == true) { d.Set3NumberDisplay(); } }); ; break;
                }


            });
        }
        public Command ChangeDisplayNumberCommand { get; set; }
        [JsonProperty("ngayQuay")]
        public string NgayQuay { get; set; }

        [JsonProperty("datas")]
        public List<Data> Datas { get; set; }
        public string[] NumberTemp { get => new string[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" }; }
        private bool _isLoading = false;
        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value);
        }

    }

    public partial class Data : BindableBase
    {
        [JsonProperty("tenTinhThanh")]
        public string TenTinhThanh { get; set; }

        [JsonProperty("dacBiet")]
        public string DacBiet { get; set; }

        [JsonProperty("kyHieu")]
        public string KyHieu { get; set; }

        [JsonProperty("g1")]
        public string G1 { get; set; }

        [JsonProperty("g2_1")]
        public string G21 { get; set; }

        [JsonProperty("g2_2")]
        public string G22 { get; set; }

        [JsonProperty("g3_1")]
        public string G31 { get; set; }

        [JsonProperty("g3_2")]
        public string G32 { get; set; }

        [JsonProperty("g3_3")]
        public string G33 { get; set; }

        [JsonProperty("g3_4")]
        public string G34 { get; set; }

        [JsonProperty("g3_5")]
        public string G35 { get; set; }

        [JsonProperty("g3_6")]
        public string G36 { get; set; }

        [JsonProperty("g4_1")]
        public string G41 { get; set; }

        [JsonProperty("g4_2")]
        public string G42 { get; set; }

        [JsonProperty("g4_3")]
        public string G43 { get; set; }

        [JsonProperty("g4_4")]
        public string G44 { get; set; }

        [JsonProperty("g4_5")]
        public string G45 { get; set; }

        [JsonProperty("g4_6")]
        public string G46 { get; set; }

        [JsonProperty("g4_7")]
        public string G47 { get; set; }

        [JsonProperty("g5_1")]
        public string G51 { get; set; }

        [JsonProperty("g5_2")]
        public string G52 { get; set; }

        [JsonProperty("g5_3")]
        public string G53 { get; set; }

        [JsonProperty("g5_4")]
        public string G54 { get; set; }

        [JsonProperty("g5_5")]
        public string G55 { get; set; }

        [JsonProperty("g5_6")]
        public string G56 { get; set; }

        [JsonProperty("g6_1")]
        public string G61 { get; set; }

        [JsonProperty("g6_2")]
        public string G62 { get; set; }

        [JsonProperty("g6_3")]
        public string G63 { get; set; }

        [JsonProperty("g7_1")]
        public string G71 { get; set; }

        [JsonProperty("g7_2")]
        public string G72 { get; set; }

        [JsonProperty("g7_3")]
        public string G73 { get; set; }

        [JsonProperty("g7_4")]
        public string G74 { get; set; }

        [JsonProperty("g8")]
        public string G8 { get; set; }
        private string _strDacBiet;
        public string StrDacBiet
        {
            get => _strDacBiet;
            set
            {
                SetProperty(ref _strDacBiet, value);
            }
        }

        private string _strG1;
        public string StrG1
        {
            get => _strG1;
            set
            {
                SetProperty(ref _strG1, value);
            }
        }
        private string _strG21;
        public string StrG21
        {
            get => _strG21;
            set
            {
                SetProperty(ref _strG21, value);
            }
        }
        private string _strG22;
        public string StrG22
        {
            get => _strG22;
            set
            {
                SetProperty(ref _strG22, value);
            }
        }
        private string _strG31;
        public string StrG31
        {
            get => _strG31;
            set
            {
                SetProperty(ref _strG31, value);
            }
        }
        private string _strG32;
        public string StrG32
        {
            get => _strG32;
            set
            {
                SetProperty(ref _strG32, value);
            }
        }

        private string _strG33;
        public string StrG33
        {
            get => _strG33;
            set
            {
                SetProperty(ref _strG33, value);
            }
        }

        private string _strG34;
        public string StrG34
        {
            get => _strG34;
            set
            {
                SetProperty(ref _strG34, value);
            }
        }

        private string _strG35;
        public string StrG35
        {
            get => _strG35;
            set
            {
                SetProperty(ref _strG35, value);
            }
        }
        private string _strG36;
        public string StrG36
        {
            get => _strG36;
            set
            {
                SetProperty(ref _strG36, value);
            }
        }

        private string _strG41;
        public string StrG41
        {
            get => _strG41;
            set
            {
                SetProperty(ref _strG41, value);
            }
        }
        private string _strG42;
        public string StrG42
        {
            get => _strG42;
            set
            {
                SetProperty(ref _strG42, value);
            }
        }

        private string _strG43;
        public string StrG43
        {
            get => _strG43;
            set
            {
                SetProperty(ref _strG43, value);
            }
        }

        private string _strG44;
        public string StrG44
        {
            get => _strG44;
            set
            {
                SetProperty(ref _strG44, value);
            }
        }

        private string _strG45;
        public string StrG45
        {
            get => _strG45;
            set
            {
                SetProperty(ref _strG45, value);
            }
        }
        private string _strG46;
        public string StrG46
        {
            get => _strG46;
            set
            {
                SetProperty(ref _strG46, value);
            }
        }
        private string _strG47;
        public string StrG47
        {
            get => _strG47;
            set
            {
                SetProperty(ref _strG47, value);
            }
        }

        private string _strG51;
        public string StrG51
        {
            get => _strG51;
            set
            {
                SetProperty(ref _strG51, value);
            }
        }
        private string _strG52;
        public string StrG52
        {
            get => _strG52;
            set
            {
                SetProperty(ref _strG52, value);
            }
        }

        private string _strG53;
        public string StrG53
        {
            get => _strG53;
            set
            {
                SetProperty(ref _strG53, value);
            }
        }

        private string _strG54;
        public string StrG54
        {
            get => _strG54;
            set
            {
                SetProperty(ref _strG54, value);
            }
        }

        private string _strG55;
        public string StrG55
        {
            get => _strG55;
            set
            {
                SetProperty(ref _strG55, value);
            }
        }
        private string _strG56;
        public string StrG56
        {
            get => _strG56;
            set
            {
                SetProperty(ref _strG56, value);
            }
        }

        private string _strG61;
        public string StrG61
        {
            get => _strG61;
            set
            {
                SetProperty(ref _strG61, value);
            }
        }
        private string _strG62;
        public string StrG62
        {
            get => _strG62;
            set
            {
                SetProperty(ref _strG62, value);
            }
        }

        private string _strG63;
        public string StrG63
        {
            get => _strG63;
            set
            {
                SetProperty(ref _strG63, value);
            }
        }
        private bool _isLoading = true;
        public bool IsLoading
        {
            get { return _isLoading; }
            set
            {
                SetProperty(ref _isLoading, value);
            }
        }
        private bool _isRefresh = false;
        public bool IsRefresh
        {
            get { return _isRefresh; }
            set
            {

                if (value == true)
                {
                    Set2NumberDisplay();
                    SetAllNumberDisplay();
                }

                SetProperty(ref _isRefresh, value);
            }
        }
        private string _strG71;
        public string StrG71
        {
            get => _strG71;
            set
            {
                SetProperty(ref _strG71, value);
            }
        }
        private string _strG72;
        public string StrG72
        {
            get => _strG72;
            set
            {
                SetProperty(ref _strG72, value);
            }
        }

        private string _strG73;
        public string StrG73
        {
            get => _strG73;
            set
            {
                SetProperty(ref _strG73, value);
            }
        }

        private string _strG74;
        public string StrG74
        {
            get => _strG74;
            set
            {
                SetProperty(ref _strG74, value);
            }
        }

        private string _strG8;
        public string StrG8
        {
            get => _strG8;
            set
            {
                SetProperty(ref _strG8, value);
            }
        }

        private string[] _firstNum = new string[10];
        public string[] FirstNum { get => _firstNum; set => SetProperty(ref _firstNum, value); }
        private string[] _lastNum = new string[10];
        public string[] LastNum { get => _lastNum; set => SetProperty(ref _lastNum, value); }
       
        private string[] _arrLoto;
        public string[] ArrLoto
        {
            get => _arrLoto;
            set
            {

                SetProperty(ref _arrLoto, value);
            }
        }
        private string[] _arrAll;
        public string[] ArrAll { get => _arrAll; set => SetProperty(ref _arrAll, value); }



        private string[] StandardArray(string[] arr, int type)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                if (type == 0)
                {
                    arr[i] = arr[i];
                }
                else if (type == 2)
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

        public void SetAllNumberDisplay()
        {
            StrDacBiet = DacBiet;
            StrG1 = G1;
            StrG21 = G21;
            StrG22 = G22;
            StrG31 = G31;
            StrG32 = G32;
            StrG33 = G33;
            StrG34 = G34;
            StrG35 = G35;
            StrG36 = G36;
            StrG41 = G41;
            StrG42 = G42;
            StrG43 = G43;
            StrG44 = G44;
            StrG45 = G45;
            StrG46 = G46;
            StrG47 = G47;
            StrG51 = G51;
            StrG52 = G52;
            StrG53 = G53;
            StrG54 = G54;
            StrG55 = G55;
            StrG56 = G56;
            StrG61 = G61;
            StrG62 = G62;
            StrG63 = G63;
            StrG71 = G71;
            StrG72 = G72;
            StrG73 = G73;
            StrG74 = G74;
            StrG8 = G8;

        }
        public void Set2NumberDisplay()
        {
            StrDacBiet = To2Character(DacBiet);
            StrG1 = To2Character(G1);
            StrG21 = To2Character(G21);
            StrG22 = To2Character(G22);
            StrG31 = To2Character(G31);
            StrG32 = To2Character(G32);
            StrG33 = To2Character(G33);
            StrG34 = To2Character(G34);
            StrG35 = To2Character(G35);
            StrG36 = To2Character(G36);
            StrG41 = To2Character(G41);
            StrG42 = To2Character(G42);
            StrG43 = To2Character(G43);
            StrG44 = To2Character(G44);
            StrG51 = To2Character(G51);
            StrG52 = To2Character(G52);
            StrG53 = To2Character(G53);
            StrG54 = To2Character(G54);
            StrG55 = To2Character(G55);
            StrG56 = To2Character(G56);
            StrG61 = To2Character(G61);
            StrG62 = To2Character(G62);
            StrG63 = To2Character(G63);
            StrG71 = To2Character(G71);
            StrG72 = To2Character(G72);
            StrG73 = To2Character(G73);
            StrG74 = To2Character(G74);
            StrG8 = To2Character(G8);

            List<string> listLoto = new List<string>();
            listLoto.Add(StrDacBiet);
            listLoto.Add(StrG1);
            listLoto.Add(StrG21);
            listLoto.Add(StrG22);
            listLoto.Add(StrG31);
            listLoto.Add(StrG32);
            listLoto.Add(StrG33);
            listLoto.Add(StrG34);
            listLoto.Add(StrG35);
            listLoto.Add(StrG36);
            listLoto.Add(StrG41);
            listLoto.Add(StrG42);
            listLoto.Add(StrG43);
            listLoto.Add(StrG44);
            listLoto.Add(StrG45);
            listLoto.Add(StrG46);
            listLoto.Add(StrG47);
            listLoto.Add(StrG51);
            listLoto.Add(StrG52);
            listLoto.Add(StrG53);
            listLoto.Add(StrG54);
            listLoto.Add(StrG55);
            listLoto.Add(StrG56);
            listLoto.Add(StrG61);
            listLoto.Add(StrG62);
            listLoto.Add(StrG63);
            listLoto.Add(StrG71);
            listLoto.Add(StrG72);
            listLoto.Add(StrG73);
            listLoto.Add(StrG74);
            listLoto.Add(StrG8);
            ArrLoto = listLoto.Where(x => !string.IsNullOrEmpty(x)).ToArray();

            string[] str = new string[ArrLoto.Length];
            for (int i = 0; i < str.Length; i++)
            {
                str[i] = ArrLoto[i];
            }
            List<double> temp = new List<double>();
            for (int i = 0; i < str.Length; i++)
            {

                temp.Add(double.Parse(str[i]));
            }

            //Sắp xếp danh sách
            temp.Sort();
            //Tách lấy đầu đuôi
            for (int i = 0; i < str.Length; i++)
            {
                str[i] = temp[i] < 10 ? "0" + temp[i] : temp[i].ToString();
                LastNum[int.Parse(str[i].Substring(0, 1))] = String.IsNullOrEmpty(LastNum[int.Parse(str[i].Substring(0, 1))]) ? LastNum[int.Parse(str[i].Substring(0, 1))] += str[i].Substring(1, 1) : LastNum[int.Parse(str[i].Substring(0, 1))] += ", " + str[i].Substring(1, 1);
                FirstNum[int.Parse(str[i].Substring(1, 1))] = String.IsNullOrEmpty(FirstNum[int.Parse(str[i].Substring(1, 1))]) ? FirstNum[int.Parse(str[i].Substring(1, 1))] += str[i].Substring(0, 1) : FirstNum[int.Parse(str[i].Substring(1, 1))] += ", " + str[i].Substring(0, 1);
            }
            //

        }

        public void Set3NumberDisplay()
        {
            StrDacBiet = To3Character(DacBiet);
            StrG1 = To3Character(G1);
            StrG21 = To3Character(G21);
            StrG22 = To3Character(G22);
            StrG31 = To3Character(G31);
            StrG32 = To3Character(G32);
            StrG33 = To3Character(G33);
            StrG34 = To3Character(G34);
            StrG35 = To3Character(G35);
            StrG36 = To3Character(G36);
            StrG41 = To3Character(G41);
            StrG42 = To3Character(G42);
            StrG43 = To3Character(G43);
            StrG44 = To3Character(G44);
            StrG51 = To3Character(G51);
            StrG52 = To3Character(G52);
            StrG53 = To3Character(G53);
            StrG54 = To3Character(G54);
            StrG55 = To3Character(G55);
            StrG56 = To3Character(G56);
            StrG61 = To3Character(G61);
            StrG62 = To3Character(G62);
            StrG63 = To3Character(G63);
            StrG71 = To3Character(G71);
            StrG72 = To3Character(G72);
            StrG73 = To3Character(G73);
            StrG74 = To3Character(G74);
            StrG8 = To3Character(G8);


        }

        public string To2Character(string x)
        {
            if (!string.IsNullOrEmpty(x))
            {
                return x.Length > 2 ? x.Substring(x.Length - 2, 2) : x;
            }
            else
            {
                return "";
            }
        }
        public string To3Character(string x)
        {
            if (!string.IsNullOrEmpty(x))
            {
                return x.Length > 3 ? x.Substring(x.Length - 3, 3) : x;
            }
            else
            {
                return "";
            }
        }
    }
}