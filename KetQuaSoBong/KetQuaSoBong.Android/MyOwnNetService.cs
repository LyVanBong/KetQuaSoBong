using KetQuaSoBong.Droid;
using KetQuaSoBong.Extensions;
using System.Net.Http;
using Xamarin.Forms;

[assembly: Dependency(typeof(MyOwnNetService))]

namespace KetQuaSoBong.Droid
{
    internal class MyOwnNetService : IMyOwnNetService
    {
        public HttpClientHandler GetHttpClientHandler()
        {
            return new Xamarin.Android.Net.AndroidClientHandler();
        }
    }
}