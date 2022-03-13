using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class ItemCalendar : BindableBase
    {
        public int Number { get; set; }
        private Color _numberColor;
        public double ItemHeight { get => 30; }
        public double ItemWidth { get => 30; }
        public Color NumberColor 
        { 
            get=>_numberColor;
            set
            {
               
                SetProperty(ref _numberColor, value);
            }
        }
        public Color BgColor { get; set; }
        private bool _isChecked = false;
        public bool IsChecked
        {
            get => _isChecked;
            set
            {
                
                SetProperty(ref _isChecked, value);
            }
        }
        private bool _isEnable = false;
        public bool IsEnable
        {
            get => _isEnable;
            set
            {
               
                SetProperty(ref _isEnable, value);
            }
               
        }
        
    }
}
