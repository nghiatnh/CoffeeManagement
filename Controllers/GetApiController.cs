using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CoffeeManagement.Models;
using CoffeeManagement.ReturnModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CoffeeManagement.Controllers
{
    [Authorize]
    [Route("/api/{action}/{id?}")]
    public class GetApiController : Controller
    {

        private readonly ILogger<GetApiController> _logger;

        public GetApiController(ILogger<GetApiController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Tables(string id)
        {
            var db = new CoffeeDbContext();
            List<ReturnTable> arr = new List<ReturnTable>();
            await foreach(var table in db.Tables){
                arr.Add(new ReturnTable(){
                    Id = table.Id,
                    Name = table.Name,
                    State = db.Tablestates.FirstOrDefault(x => x.Id == table.Idstate).Name,
                    CountOrder = db.Orders.Count(x => x.Idtable == table.Id && x.Idstate == 0)
                });
            }
            return new JsonResult(arr);
        }

        [HttpGet]
        public IActionResult Categories(string id)
        {
            return new JsonResult((new CoffeeDbContext()).Categories.ToArray());
        }

        [HttpGet]
        public IActionResult Foods(string id)
        {
            return new JsonResult((new CoffeeDbContext()).Products.ToArray());
        }

        [HttpGet]
        public async Task<IActionResult> Order_Details(string id)
        {
            var db = new CoffeeDbContext();
            List<ReturnOrderDetail> arr = new List<ReturnOrderDetail>();
            await foreach(var orderdetail in db.Orderdetails){
                var order = db.Orders.FirstOrDefault(y => y.Id == orderdetail.Idorder);
                var table = db.Tables.FirstOrDefault(x => x.Id == order.Idtable);
                arr.Add(new ReturnOrderDetail(){
                    Id = orderdetail.Id,
                    Table = new ReturnTable(){
                        Id = table.Id,
                        Name = table.Name,
                        State = db.Tablestates.FirstOrDefault(x => x.Id == table.Idstate).Name,
                        CountOrder = db.Orders.Count(x => x.Idtable == table.Id && x.Idstate == 0)
                    },
                    State = db.Orderdetailstates.FirstOrDefault(x => x.Id == orderdetail.Idstate).Name,
                    Count = orderdetail.Count,
                    Time = orderdetail.Ordertime.ToString(),
                    Food = new ReturnProduct(db.Products.FirstOrDefault(x => x.Id == orderdetail.Idproduct))
                });
            }
            return new JsonResult(arr);
        }

        [HttpPost]
        public async Task<IActionResult> Order_Details(long Idtable, long Idproduct, long Count)
        {
            var db = new CoffeeDbContext();
            var order = db.Orders.FirstOrDefault(x => x.Idstate == 1 && x.Idtable == Idtable);
            if (order == null){ 
                order = new Order(){
                    Idtable = Idtable,
                    Idstate = 1,
                };
                db.Orders.Add(order);
                db.SaveChanges();
            }
            var data = new Orderdetail(){
                Id = 4850,
                Count = Count,
                Idproduct = Idproduct,
                Idstate = 1,
                Idorder = order.Id,
            };
            db.Orderdetails.Add(data);
            db.SaveChanges();
            return new JsonResult(new {success = true});
        }

        [HttpGet]
        public IActionResult Order_Detail_States(string id)
        {
            var db = new CoffeeDbContext();
            return new JsonResult(db.Orderdetailstates.ToArray());
        }

        [HttpGet]
        public IActionResult Customers(string id)
        {
            return new JsonResult((new CoffeeDbContext()).Customers.ToArray());
        }

        [HttpGet]
        public IActionResult Payments(string id)
        {
            return new JsonResult((new CoffeeDbContext()).Bills.ToArray());
        }
    }
}
