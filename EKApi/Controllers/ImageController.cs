﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EKApi.Controllers
{
    public class ImageController : ApiController
    {
        // GET: api/Image
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Image/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Image
        public void Post([FromBody]string value)
        {
        }

         // DELETE: api/Image/5
        public void Delete(int id)
        {
        }
    }
}