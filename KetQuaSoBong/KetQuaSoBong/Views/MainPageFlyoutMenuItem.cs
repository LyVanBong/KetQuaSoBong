using System;

namespace KetQuaSoBong.Views
{
    public class MainPageFlyoutMenuItem
    {
        public MainPageFlyoutMenuItem()
        {
            TargetType = typeof(MainPageFlyoutMenuItem);
        }

        public int Id { get; set; }
        public string Title { get; set; }

        public Type TargetType { get; set; }
    }
}