using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EKApi.Models;
using System.Web.Http.Cors;

namespace EKApi.Controllers
{
    // [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Authorize]
    public class OrdersController : ApiController
    {
        private EKDBEntities2 db = new EKDBEntities2();

        // GET: api/Orders
        [Authorize(Roles = "Administrator,Manager")]
        public List<Order> GettOrders()
         {
            List<tOrder> Orders = new List<tOrder>();
            Orders = db.tOrders.ToList();
            List<Order> ViewOrders = new List<Order>();
            Order VO = new Order();
            ViewOrders = VO.getOrders(Orders);
            return ViewOrders;
         }

        // GET: api/Orders/5
        [Authorize(Roles = "Administrator,Manager")]
        [ResponseType(typeof(tOrder))]
         public IHttpActionResult GettOrder(int id)
         {
             tOrder tOrder = db.tOrders.Find(id);
             if (tOrder == null)
             {
                 return NotFound();
             }
            Order Order = new Order();
            Order OrderSummary = Order.getOrderSummary(tOrder);
            return Ok(OrderSummary);
         }

        // PUT: api/Orders/5
        [Authorize(Roles = "Administrator,Manager")]
        [ResponseType(typeof(void))]
         public IHttpActionResult PuttOrder(int id, tOrder tOrder)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             if (id != tOrder.Id)
             {
                 return BadRequest();
             }

             db.Entry(tOrder).State = EntityState.Modified;

             try
             {
                 db.SaveChanges();
             }
             catch (DbUpdateConcurrencyException)
             {
                 if (!tOrderExists(id))
                 {
                     return NotFound();
                 }
                 else
                 {
                     throw;
                 }
             }

             return StatusCode(HttpStatusCode.NoContent);
         }

        // POST: api/Orders          
        [ResponseType(typeof(MyOrder))]
        public IHttpActionResult PosttOrder(MyOrder NewOrder)
        {

           // tOrder.tOrderLines.Add(new tOrderLine = { };)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tOrder O = NewOrder.processorder();
            if (O!= null)
            {
                //Add the order ot the DB
                db.tOrders.Add(O);
                try
                {
                    db.SaveChanges();
                }
                catch (DBConcurrencyException)
                {
                    return BadRequest("DB concurrency exception");
                }
            }
            else {
                return BadRequest("Payment or Stock validation Failed");
            }
            //Converting the actual DB order class to view model order class for  
            Order Order = new Order();
            Order OrderSummary = Order.getOrderSummary(O);
           // return CreatedAtRoute("DefaultApi", new { id = tUser.Email }, tUser);
            return Ok(OrderSummary);          
            // return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Orders/5
        [Authorize(Roles = "Administrator,Manager")]
        [ResponseType(typeof(tOrder))]
        public IHttpActionResult DeletetOrder(int id)
        {
            tOrder tOrder = db.tOrders.Find(id);
            if (tOrder == null)
            {
                return NotFound();
            }

            db.tOrders.Remove(tOrder);
            db.SaveChanges();
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tOrderExists(int id)
        {
            return db.tOrders.Count(e => e.Id == id) > 0;
        }
    }
}