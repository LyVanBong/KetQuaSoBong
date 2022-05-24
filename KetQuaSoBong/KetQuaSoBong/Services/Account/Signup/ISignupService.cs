using KetQuaSoBong.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KetQuaSoBong.Services.Account.Signup
{
    public interface ISignupService
    {
        Task<bool> SignUp(Register reg);
    }
}
