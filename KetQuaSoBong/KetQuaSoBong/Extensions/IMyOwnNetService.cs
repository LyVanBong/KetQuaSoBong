using System.Net.Http;

namespace KetQuaSoBong.Extensions
{
    public interface IMyOwnNetService
    {
        HttpClientHandler GetHttpClientHandler();
    }
}