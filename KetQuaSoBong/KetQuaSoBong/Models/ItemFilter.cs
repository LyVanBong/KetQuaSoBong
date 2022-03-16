using Prism.Mvvm;

namespace KetQuaSoBong.Models
{
    public class ItemFilter : BindableBase
    {
        private string _name;

        public string Name
        {
            get => _name;
            set => SetProperty(ref _name, value);
        }

        public string rdClassId { get; set; }
        public bool IsChecked { get; set; }
    }
}