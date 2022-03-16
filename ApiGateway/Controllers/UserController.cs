using Microsoft.AspNetCore.Mvc;
using Models;
using MongoDbServices;

namespace ApiGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserModel user)
        {
            if (user is null) return BadRequest();
            await _userService.AddUser(user);
            //return CreatedAtAction(nameof(Get), new { username = user.UserName }, user);
            return Ok(new
            {
                Code = 1,
                Message = "Successful",
                Data = user
            });
        }
        [HttpGet]
        public async Task<ActionResult<UserModel>> Get(string username, string passwd)
        {
            var user = await _userService.GetUser(username, passwd);
            if (user is null) return BadRequest();
            return Ok(user);
        }
    }
}
