using KetQuaSoBong.Models;
using Xamarin.Forms;

namespace KetQuaSoBong.Views.CustomViews
{
    public class ChatItemTemplate : DataTemplateSelector
    {
        public DataTemplate MyChat { get; set; }
        public DataTemplate YourChat { get; set; }

        protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
        {
            string name = (item as ItemChat).NameUser;
            return name == "Admin" ? MyChat : YourChat;
        }
    }
}