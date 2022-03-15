using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.TabViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FootballTab : ContentPage
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