using Newtonsoft.Json;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class ItemChat : BindableBase
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("userName")]
        private string _userName;
        public string UserName
        {
            get => _userName;
            set
            {
                SetVisible(value, ListAllChat);
                SetProperty(ref _userName, value);
            }
        }

        [JsonProperty("image")]
        public Uri Image { get; set; }

        [JsonProperty("dateCreate")]
        public string DateCreate { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        private List<ItemChat> _listAllChat;
        public List<ItemChat> ListAllChat
        {
            get => _listAllChat;
            set => SetProperty(ref _listAllChat, value);
        }
        public DateTime DateTimeUpdate { get; set; }
        private Thickness _thickness = new Thickness(10);

        public Thickness MarginThickness
        {
            get => _thickness;
            set => SetProperty(ref _thickness, value);
        }
        public LayoutOptions LayoutOptions
        {
            get
            {
                if (Preferences.Get("User", "") != null) { return UserName != Preferences.Get("User", "").Split(',')[0] ? LayoutOptions.StartAndExpand : LayoutOptions.EndAndExpand; }
                else
                {
                    return LayoutOptions.StartAndExpand;
                }
            }
        }
        private bool _nameVisible = true;
        public bool NameVisible { get => _nameVisible; set => SetProperty(ref _nameVisible, value); }
        private bool _avatarVisible = true;
        public bool AvatarVisible { get => _avatarVisible; set => SetProperty(ref _avatarVisible, value); }

        public void SetVisible(string userName, List<ItemChat> list)
        {
            if (list != null)
            {
                ItemChat beforeItem = list[list.Count - 1];
                if (beforeItem.UserName == userName && DateTime.Now.Subtract(DateTime.Parse(beforeItem.DateCreate)).TotalMinutes < 2)
                {
                    this.NameVisible = false;
                    this.AvatarVisible = false;
                    this.MarginThickness = new Thickness(10, 0, 10, 5);
                }
            }
        }
    }
}
