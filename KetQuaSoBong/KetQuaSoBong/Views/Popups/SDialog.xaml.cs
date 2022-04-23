using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.CommunityToolkit.UI.Views;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.Popups
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SDialog : Popup
    {
        public SDialog()
        {
            InitializeComponent();
            BindingContext = new SDialogVM(this);
        }
        
    }
    class SDialogVM : BindableBase
    {
        public SDialogVM(Popup p)
        {
            p.FindByName<RadioButton>(Preferences.Get("S", "")).IsChecked = true;
            SSelectedCommand = new Command((x) =>
            {
                RadioButton btn = x as RadioButton;
                switch(btn.ClassId)
                {
                    case "rdNam": p.Dismiss("Nam"); Preferences.Set("S", "rdNam"); break;
                    case "rdNu": p.Dismiss("Nữ"); Preferences.Set("S", "rdNu"); break;
                    case "rdKhac": p.Dismiss("Khác"); Preferences.Set("S", "rdKhac"); break;
                }
            });
        }
        public Command SSelectedCommand { get; set; } 
        
    }
}