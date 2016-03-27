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
    //[Authorize(Roles = "Administrator")]
    public class UsersController : ApiController
    {
        private EKDBEntities1 db = new EKDBEntities1();

        // GET: api/Users
        public IQueryable<tUser> GettUsers()
        {
            return db.tUsers;
        }

        // GET: api/Users/5
        [ResponseType(typeof(tUser))]
        public IHttpActionResult GettUser(string id)
        {
            tUser tUser = db.tUsers.Find(id);
            if (tUser == null)
            {
                return NotFound();
            }

            return Ok(tUser);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttUser(tUser tUser)
        {
            var id = this.RequestContext.Principal.Identity.Name;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tUser.Email)
            {
                return BadRequest();
            }

            db.Entry(tUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tUserExists(id))
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

        // POST: api/Users
        [ResponseType(typeof(tUser))]
        public IHttpActionResult PosttUser(tUser tUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tUsers.Add(tUser);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tUserExists(tUser.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tUser.Email }, tUser);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(tUser))]
        public IHttpActionResult DeletetUser(string id)
        {
            tUser tUser = db.tUsers.Find(id);
            if (tUser == null)
            {
                return NotFound();
            }

            db.tUsers.Remove(tUser);
            db.SaveChanges();

            return Ok(tUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tUserExists(string id)
        {
            return db.tUsers.Count(e => e.Email == id) > 0;
        }
    }
}