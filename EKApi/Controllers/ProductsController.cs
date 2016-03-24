using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using EKApi.Models;
using System.Web.Http.Cors;

namespace EKApi.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using EKApi.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<tProduct>("Products");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductsController : ODataController
    {
        private EKDBEntities db = new EKDBEntities();
        

        // GET: odata/Products
        [EnableQuery]
        
        public IQueryable<tProduct> GetProducts()
        {
            return db.tProducts;
        }

        // GET: odata/Products(5)
        [EnableQuery]
        public SingleResult<tProduct> GettProduct([FromODataUri] int key)
        {
            return SingleResult.Create(db.tProducts.Where(tProduct => tProduct.Id == key));
        }

        // PUT: odata/Products(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<tProduct> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tProduct tProduct = db.tProducts.Find(key);
            if (tProduct == null)
            {
                return NotFound();
            }

            patch.Put(tProduct);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tProductExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tProduct);
        }

        // POST: odata/Products
        public IHttpActionResult Post(tProduct tProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            db.tProducts.Add(tProduct);
            db.SaveChanges();

            return Created(tProduct);
        }

        // PATCH: odata/Products(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<tProduct> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tProduct tProduct = db.tProducts.Find(key);
            if (tProduct == null)
            {
                return NotFound();
            }

            patch.Patch(tProduct);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tProductExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tProduct);
        }

        // DELETE: odata/Products(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            tProduct tProduct = db.tProducts.Find(key);
            if (tProduct == null)
            {
                return NotFound();
            }

            db.tProducts.Remove(tProduct);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tProductExists(int key)
        {
            return db.tProducts.Count(e => e.Id == key) > 0;
        }
    }
}
