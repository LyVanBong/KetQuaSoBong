using KetQuaSoBong.Extensions;
using System.Net.Http;
using Xamarin.Forms;

[assembly: Dependency(typeof(MyOwnNetService))]

public class MyOwnNetService : IMyOwnNetService
{
    public HttpClientHandler GetHttpClientHandler()
    {
        return new HttpClientHandler();
    }
}