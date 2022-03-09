using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models.LotteryModel
{
    public class LotteryCheckItem : BindableBase
    {
        public string Number { get; set; }
        public int Time { get; set; }
        private bool _isChecked = false;
        public bool IsChecked
        {
            get => _isChecked;
            set 
            {   
                if(value == true) 
                {
                    NumberColor = TimeColor = Color.White;
                }
                SetProperty(ref _isChecked, value); 
            }
        }
        private Color _numColor;
        public Color NumberColor { get => _numColor; set => SetProperty(ref _numColor, value); }
        private Color _timeColor;
        public Color TimeColor { get => _timeColor; set=> SetProperty(ref _timeColor, value); }
               
    }
}
