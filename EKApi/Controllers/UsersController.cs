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
    
    public class UsersController : ApiController
    {
        private EKDBEntities1 db = new EKDBEntities1();

        // GET: api/Users
        [Authorize(Roles = "Administrator")]
        public IQueryable<tUser> GettUsers()
        {
            return db.tUsers;
        }

        // GET: api/Users/5
        [Authorize]
        [ResponseType(typeof(tUser))]
        public IHttpActionResult GettUser(string id)
        {
            if (id == this.RequestContext.Principal.Identity.Name)
            {
                tUser tUser = db.tUsers.Find(id);
                if (tUser == null)
                {
                    
                    return NotFound();
                }

                return Ok(tUser);
            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }
        }

        // PUT: api/Users/id?="mdnfk@fnnf.com"
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttUser(tUser User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (this.RequestContext.Principal.IsInRole("Administrator"))
            {
                if (tUserExists(User.Email))
                    db.Entry(User).State = EntityState.Modified;
                else
                    db.tUsers.Add(User);
                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
                return StatusCode(HttpStatusCode.OK);
            }
            else
            {
                if (User.Email == this.RequestContext.Principal.Identity.Name)
                {
                   // this.RequestContext.Configuration.
                    var id = this.RequestContext.Principal.Identity.Name;
                    if (tUserExists(id))
                        db.Entry(User).State = EntityState.Modified;
                    else
                        db.tUsers.Add(User);

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        throw;
                    }

                    return StatusCode(HttpStatusCode.OK);
                }
                else
                {
                    
                    return StatusCode(HttpStatusCode.Forbidden);
                }
            }
        }

        // POST: api/Users
        /*[ResponseType(typeof(tUser))]
        [Authorize(Roles = "Administrator")]
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
        }*/

        // DELETE: api/Users/5
        [ResponseType(typeof(tUser))]
        [Authorize(Roles = "Administrator")]
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