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

namespace EKApi.Controllers
{
    [Authorize]
    public class OrdersController : ApiController
    {
        private EKDBEntities2 db = new EKDBEntities2();

         // GET: api/Orders
         public IQueryable<tOrder> GettOrders()
         {
             return db.tOrders;
         }

        // GET: api/Orders/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(tOrder))]
         public IHttpActionResult GettOrder(int id)
         {
             tOrder tOrder = db.tOrders.Find(id);
             if (tOrder == null)
             {
                 return NotFound();
             }

             return Ok(tOrder);
         }

        // PUT: api/Orders/5
        [Authorize(Roles = "Administrator")]
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
        public IHttpActionResult PosttOrder(MyOrder Order)
        {

           // tOrder.tOrderLines.Add(new tOrderLine = { };)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.tOrders.Add(tOrder);
            db.SaveChanges();
            return NotFound();
            //return CreatedAtRoute("DefaultApi", new { id = tOrder.Id }, tOrder);
        }

        // DELETE: api/Orders/5
        [Authorize(Roles = "Administrator")]
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

            return Ok(tOrder);
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