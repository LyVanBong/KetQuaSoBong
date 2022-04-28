using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using KetQuaSoBong.Droid;
using KetQuaSoBong.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xamarin.Forms;

[assembly: Dependency(typeof(BaseUrl_Android))]
namespace KetQuaSoBong.Droid
{
    public class BaseUrl_Android : IBaseUrl
    {
        public string Get()
        {
            return "file:///android_asset/www.nowgoal.com/www.nowgoal.com/index.html";
        }
    }
}