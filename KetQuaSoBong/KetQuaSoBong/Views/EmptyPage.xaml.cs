using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class EmptyPage : ContentPage
    {
        public EmptyPage(int page)
        {
            InitializeComponent();
            if(page == 1)
            {
                this.Navigation.PushAsync(new LotteryCheckPage());
            }
        }
    }
}