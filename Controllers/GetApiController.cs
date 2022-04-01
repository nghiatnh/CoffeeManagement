using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CoffeeManagement.Models;
using CoffeeManagement.ReturnModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;

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
        public IActionResult Tables(string id)
        {
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Tables.Select(t => new {
                    Id = t.Id,
                    Name = t.Name,
                    State = t.IdstateNavigation.Name,
                    CountOrder = db.Orders.Count(x => x.Idtable == t.Id && x.Idstate == 1)
                }).ToArray());
            }
        }

        [HttpGet]
        public IActionResult Categories(string id)
        {
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Categories.Select(c => new {
                    c.Id,
                    c.Name
                }).ToArray());
            }
        }

        [HttpGet]
        public IActionResult Foods(string id)
        {
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Products.Select(p => new {
                    p.Id,
                    p.Name,
                    p.ImageUrl,
                    p.Price,
                    Category = p.IdcategoryNavigation.Name
                }).ToArray());
            }
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
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Orderdetailstates.ToArray());
            }
        }

        [HttpGet]
        public IActionResult Customers(string id)
        {
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Customers.ToArray());
            }
        }

        [HttpGet]
        public IActionResult Payments(string id)
        {
            using (var db = new CoffeeDbContext()){
                return new JsonResult(db.Bills.ToArray());
            }
        }
    }
}
