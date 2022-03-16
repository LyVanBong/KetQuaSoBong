using Prism.Mvvm;
using System;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace KetQuaSoBong.Models.FootballModel
{
    public class Team : BindableBase
    {
        public ImageSource Logo { get; set; }
        public String Name { get; set; }
        public ObservableCollection<Player> Players { get; set; }
    }
}
