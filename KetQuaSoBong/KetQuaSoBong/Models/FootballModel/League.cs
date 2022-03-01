using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class League : BindableBase
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ImageSource Icon { get; set; }

    }
}
