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
    [ApiController]
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
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Tables.Select(t => new
                {
                    Id = t.Id,
                    Name = t.Name,
                    State = t.IdstateNavigation.Name,
                    CountOrder = t.Idstate == 1 ? 0 : t.Orders.FirstOrDefault(x => x.Idstate == 1).Orderdetails.Count(x => x.Idstate == 1)
                }).ToArray());
            }
        }

        [HttpGet]
        public IActionResult Categories(long? id)
        {
            using (var db = new CoffeeDbContext())
            {
                if (id == null)
                {
                    return new JsonResult(db.Categories.Select(c => new
                    {
                        c.Id,
                        c.Name
                    }).ToArray());
                }
                else
                {
                    var category = db.Categories.FirstOrDefault(x => x.Id == id);
                    return new JsonResult(db.Categories.Select(x => new
                    {
                        x.Id,
                        x.Name
                    }).FirstOrDefault(x => x.Id == id));
                }
            }
        }

        [HttpGet]
        public IActionResult Foods(long? id)
        {
            using (var db = new CoffeeDbContext())
            {
                int count = db.Products.Count();
                if (id == null)
                {
                    return new JsonResult(db.Products.Select(p => new
                    {
                        p.Id,
                        p.Name,
                        p.ImageUrl,
                        p.Price,
                        IdCategory = p.Idcategory
                    }).ToArray());
                }
                else
                {
                    return new JsonResult(db.Products.Select(p => new
                    {
                        p.Id,
                        p.Name,
                        p.ImageUrl,
                        p.Price,
                        IdCategory = p.Idcategory
                    }).FirstOrDefault(x => x.Id == id));
                }
            }
        }

        [HttpGet]
        public IActionResult Order_Details(string id)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Orderdetails.Where(x => x.IdorderNavigation.Idstate == 1).Select(o => new
                {
                    o.Id,
                    Table = o.IdorderNavigation.IdtableNavigation.Name,
                    State = o.IdstateNavigation.Name,
                    o.Count,
                    Time = o.Ordertime,
                    Food = o.IdproductNavigation.Name
                }).ToArray());
            }
        }

        [HttpPost]
        public IActionResult Order_Foods(OrderItem item)
        {
            using (var db = new CoffeeDbContext())
            {
                try
                {
                    var order = db.Orders.FirstOrDefault(x => x.Idstate == 1 && x.Idtable == item.table);
                    if (order == null)
                    {
                        order = new Order()
                        {
                            Id = db.Orders.Count() == 0 ? 1 : db.Orders.Max(x => x.Id) + 1,
                            Idtable = item.table,
                            Idstate = 1,
                        };
                        db.Orders.Add(order);
                    }
                    var data = new Orderdetail()
                    {
                        Id = db.Orderdetails.Count() == 0 ? 1 : db.Orderdetails.Max(x => x.Id) + 1,
                        Count = item.count,
                        Idproduct = item.food,
                        Idstate = 1,
                        Idorder = order.Id,
                        Ordertime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                    };
                    db.Orderdetails.Add(data);
                    db.SaveChanges();
                    return new JsonResult(new { success = true });
                }
                catch
                {
                    return new JsonResult(new { success = false });
                }
            }
        }

        [HttpPost]
        public IActionResult Update_States(OrderStateItem item)
        {
            using (var db = new CoffeeDbContext())
            {
                try
                {
                    foreach (var order in db.Orderdetails.Where(x => item.orders.Contains(x.Id)))
                    {
                        order.Idstate = item.state;
                    }
                    db.SaveChanges();
                    return new JsonResult(new { success = true });
                }
                catch
                {
                    return new JsonResult(new { success = false });
                }
            }
        }

        [HttpPost]
        public IActionResult Payments(PaymentItem item)
        {
            using (var db = new CoffeeDbContext())
            {
                try
                {
                    item.staffName = HttpContext.User.Identity.Name;
                    var bill = new Bill()
                    {
                        Id = db.Orders.FirstOrDefault(x => x.Idtable == item.table && x.Idstate == 1).Id,
                        Paytime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                        Idstaff = db.Staffaccounts.FirstOrDefault(x => x.Username == item.staffName).Id,
                        Iddiscount = item.discountCode,
                        Idcustomer = item.customer,
                    };
                    db.Bills.Add(bill);
                    db.SaveChanges();
                    return new JsonResult(new { success = true });
                }
                catch (Exception e)
                {
                    return new JsonResult(new { success = false });
                }
            }
        }

        [HttpGet]
        public IActionResult Order_Detail_States(string id)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Orderdetailstates.ToArray());
            }
        }

        [HttpGet]
        public IActionResult Customers(string id)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Customers.Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Address,
                    x.Birthday,
                    x.Code,
                    x.Phone,
                    x.Point
                }).ToArray());
            }
        }

        [HttpGet]
        public IActionResult Bills(long table)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Orders.Where(x => x.Idtable == table && x.Idstate == 1).Select(x => new
                {
                    x.Id,
                    TotalPrice = x.Orderdetails.Where(y => y.Idstate == 2).Sum(y => y.Count * y.IdproductNavigation.Price)
                }).FirstOrDefault());
            }
        }

        [HttpGet]
        public IActionResult Payments(string id)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Bills.Select(x => new
                {
                    x.Id,
                    x.IdstaffNavigation.Name,
                    x.Paytime,
                    customer = "(" + x.Idcustomer + ") " + x.IdcustomerNavigation.Name,
                    Table = db.Orders.FirstOrDefault(y => y.Id == x.Id).IdtableNavigation.Name,
                    TotalPrice = db.Orders.FirstOrDefault(y => y.Id == x.Id).Orderdetails.Where(x => x.Idstate == 2).Sum(x => x.IdproductNavigation.Price * x.Count),
                    discount = x.Iddiscount == null ? null : new {
                        x.IddiscountNavigation.Count,
                        x.IddiscountNavigation.Limitprice,
                    }
                }).ToArray());
            }
        }

        [HttpGet]
        public IActionResult Discounts(string id, long? customer, long price = 0)
        {
            using (var db = new CoffeeDbContext())
            {
                return new JsonResult(db.Discountcodes.Where(x => (x.Idcustomer == null || x.Idcustomer == customer) && x.Duetime.CompareTo("04-04-2022") > 0 && x.Minprice <= price && x.Used == 0).Select(x => new
                {
                    x.Id,
                    x.Duetime,
                    x.Count,
                    x.Limitprice,
                    x.Name
                }).ToArray());
            }
        }
    }
}
