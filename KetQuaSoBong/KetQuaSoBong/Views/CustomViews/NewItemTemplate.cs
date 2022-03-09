using KetQuaSoBong.Models;
using Xamarin.Forms;

namespace KetQuaSoBong.Views.CustomViews
{
    public class NewItemTemplate : DataTemplateSelector
    {
        public DataTemplate ItemTitle { get; set; }
        public DataTemplate ItemBigPicture { get; set; }
        public DataTemplate ItemMorePicture { get; set; }
        public DataTemplate ItemSimple { get; set; }
        protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
        {
            int type = (item as NewsItem).TypeTemplate;
            return type == 0 ? ItemSimple : (type == 1 ? ItemBigPicture : (type == 2 ? ItemMorePicture : ItemTitle));
        }
    }

}
