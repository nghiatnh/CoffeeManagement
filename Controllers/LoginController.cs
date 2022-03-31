using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CoffeeManagement.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CoffeeManagement.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/api/[controller]")]
    public class LoginController : ControllerBase
    {

        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post(string userName, string password)
        {
            var db = new CoffeeDbContext();
            Staffaccount acc = db.Staffaccounts.FirstOrDefault(x => x.Username == userName && x.Password == password);

            if (acc == null){
                return new JsonResult(new {success = false});
            }
            var identity = new ClaimsIdentity("CookieAuthentication");
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, acc.Id.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Name, acc.Username));
            identity.AddClaim(new Claim(ClaimTypes.Role, db.Roles.FirstOrDefault(y => y.Id == db.Staffs.FirstOrDefault(x => x.Id == acc.Id).Id).Name));
            HttpContext.SignInAsync(new ClaimsPrincipal(identity));
            return new JsonResult(new {success = true});
        }

        [Route("/api/getuser")]
        public IActionResult GetUser(){
            return new JsonResult(new {UserName = HttpContext.User.Identity.Name});
        }
    }
}
