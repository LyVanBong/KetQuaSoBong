using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Account.Login
{
    public interface ILoginService
    {
        Task<bool> Login(string username, string password);
    }
}
