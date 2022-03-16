using KetQuaSoBong.Extensions;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models.LotteryModel
{
    public class LotteryResult : BindableBase
    {   
        public string Id { get; set; }
        public DateTime DateResult { get; set; }
        private string[] _result;
        public string[] Result
        { 
            get => _result;
            set
            { 
                if (value != null) 
                {
                    if(value.Length == 27)
                    {
                        DB = value[0];
                        G1 = value[1];
                        ArrG2 = value.SubArray(2, 2);
                        ArrG31 = value.SubArray(4, 3);
                        ArrG32 = value.SubArray(7, 3);
                        ArrG4 = value.SubArray(10, 4);
                        ArrG51 = value.SubArray(14, 3);
                        ArrG52 = value.SubArray(17, 3);
                        ArrG6 = value.SubArray(20, 3);
                        ArrG7 = value.SubArray(23, 4);
                    }
                    else
                    {
                        G8 = value[0];
                        G7 = value[1];
                        ArrG6 = value.SubArray(2, 3);
                        G5 = value[5];
                        ArrG4 = value.SubArray(6, 7);
                        ArrG31 = value.SubArray(13, 2);
                        G2 = value[15];
                        G1 = value[16];
                        DB = value[17];
                    }
                    ArrAll = value;
                    GetFirstLast(ArrAll);
                   
                } 
                SetProperty(ref _result, value);
            } 
        }
        private string _db;
        public string DB { get => _db; set => SetProperty(ref _db, value); }
        private string _g1;
        public string G1 { get => _g1; set => SetProperty(ref _g1, value); }
        private string[] _arrG2;
        public string[] ArrG2 { get => _arrG2; set => SetProperty(ref _arrG2, value); }
        private string[] _arrG31;
        public string[] ArrG31 { get => _arrG31; set => SetProperty(ref _arrG31, value); }
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
        private string[] _firstNum = new string[10];
        public string[] FirstNum { get => _firstNum; set => SetProperty(ref _firstNum,value); }
        private string[] _lastNum = new string[10];
        public string[] LastNum { get => _lastNum; set => SetProperty(ref _lastNum, value); }
        public string[] NumberTemp { get => new string[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" }; }
        private string[] _arrLoto;
        public string[] ArrLoto { get => _arrLoto; set => SetProperty(ref _arrLoto, value); }
        private string[] _arrAll;
        public string[] ArrAll { get => _arrAll; set => SetProperty(ref _arrAll, value); }
        private string _g8;
        public string G8 { get => _g8; set => SetProperty(ref _g8, value); }
        private string _g7;
        public string G7 { get => _g7; set => SetProperty(ref _g7, value); }
        private string _g5;
        public string G5 { get => _g5; set => SetProperty(ref _g5, value); }
        private string _g2;
        public string G2 { get => _g2; set => SetProperty(ref _g2, value); }
        private int _type = 0;

        public int Type
        {
            get => _type;
            set
            {

                
                
                SetProperty(ref _type, value);
                
            }
        }
        private int _region = 0;
        public int Region 
        { 
            get => _region; 
            set {
                SetProperty(ref _region, value);

            }
        }
        public string Province { get; set; }

       private void GetFirstLast(string[] result)
        {
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
           
        }

        private string[] StandardArray(string[] arr,  int type)
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

        public void SetSource(string[] arr)
        {  
            if(Region == 0)
            {   
                
               
            }
            else
            {
                 
            }
        }



    }
}
