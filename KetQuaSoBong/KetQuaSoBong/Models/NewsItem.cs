using System;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class NewsItem
    {
        public string Picture { get; set; }
        public ObservableCollection<string> ListPicture { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public DateTime TimeCreated { get; set; }
        public string Resource { get; set; }
        public int TypeTemplate { get; set; }
        public string Content { get; set; }
        public string RightTitle { get; set; }
        public ImageSource TitleSource { get; set; }
    }
}
