using KetQuaSoBong.Models;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.Views.CustomViews
{
    public class ChatItemTemplate : DataTemplateSelector
    {
        public DataTemplate MyChat { get; set; }
        public DataTemplate YourChat { get; set; }

        protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
        {
            string name = (item as ItemChat).UserName;
            if (Preferences.Get("IsLogin", false) == true)
            {
                return name == Preferences.Get("User", "").Split(',')[4] ? MyChat : YourChat;
            }
            else
            {
                return YourChat;
            }
        }
    }
}