using Prism.Mvvm;
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