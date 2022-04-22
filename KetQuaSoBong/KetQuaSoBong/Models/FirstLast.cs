using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;

namespace KetQuaSoBong.Models
{
    public class FirstLast : BindableBase
    {
        public string Id { get; set; }
        private List<string> _strArr;
        public List<string> StrArr
        {
            get => _strArr;
            set
            {
                Str = String.Join(",", value);
                SetProperty(ref _strArr, value);
            }
        }
        private string _str;
        public string Str
        {
            get => _str;
            set => SetProperty(ref _str, value);
        }
    }
}
