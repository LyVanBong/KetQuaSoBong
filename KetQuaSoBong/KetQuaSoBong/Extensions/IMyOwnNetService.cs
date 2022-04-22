using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace KetQuaSoBong.Extensions
{
    public interface IMyOwnNetService
    {
        HttpClientHandler GetHttpClientHandler();
    }
}
