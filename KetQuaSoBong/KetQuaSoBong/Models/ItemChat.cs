using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class ItemChat : BindableBase
    {   
        public string Icon { get; set; }
        private string _nameUser;
        public string NameUser { get=> _nameUser; set { SetVisible(value); SetProperty(ref _nameUser, value); } }
        public DateTime DateTimeUpdate { get; set; }
        private Thickness _thickness = new Thickness(10);
        public Thickness MarginThickness
        {
            get => _thickness;
            set => SetProperty(ref _thickness, value);
        }
        private string _content;
        public string Content { get => _content; set => SetProperty(ref _content, value); }
        public LayoutOptions LayoutOptions { get => NameUser != "Admin" ? LayoutOptions.StartAndExpand : LayoutOptions.EndAndExpand; }
        private bool _nameVisible = true;
        public bool NameVisible { get => _nameVisible; set=> SetProperty(ref _nameVisible, value); }
        private bool _avatarVisible = true;
        public bool AvatarVisible { get => _avatarVisible; set => SetProperty(ref _avatarVisible, value); }
        public void SetVisible(string userName)
        {
            if(App.ItemChatsDemo!=null)
            {
                ItemChat beforeItem = App.ItemChatsDemo[App.ItemChatsDemo.Count-1];
                if (beforeItem.NameUser == userName && DateTime.Now.Subtract(beforeItem.DateTimeUpdate).TotalMinutes < 2)
                {
                    this.NameVisible = false;
                    this.AvatarVisible = false;
                    this.MarginThickness = new Thickness(10,0,10,5);
                }
            }
            
        }
    }
}
