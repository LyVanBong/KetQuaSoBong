using Foundation;
using KetQuaSoBong.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using UIKit;
using Xamarin.Forms;

[assembly: Dependency(typeof(MyOwnNetService))]
public class MyOwnNetService : IMyOwnNetService
{
    public HttpClientHandler GetHttpClientHandler()
    {
        return new HttpClientHandler();
    }
}