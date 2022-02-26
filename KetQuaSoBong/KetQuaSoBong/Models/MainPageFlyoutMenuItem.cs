using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class MainPageFlyoutMenuItem
    {
        public MainPageFlyoutMenuItem()
        {
            
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public ImageSource Icon { get; set; }
    }
}