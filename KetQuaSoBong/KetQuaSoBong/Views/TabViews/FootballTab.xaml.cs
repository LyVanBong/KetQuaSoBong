using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballTab : ContentView
    {   
        public string DateTimeNow { get; set; }
        public FootballTab()
        {
            InitializeComponent();
            DateTimeNow = DateTime.Now.ToString("dd/MM/yyyy");
            BindingContext = this;
        }
    }
}