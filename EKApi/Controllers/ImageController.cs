using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EKApi.Controllers
{
    public class ImageController : ApiController
    {
        // GET: api/Image
        [EnableCors(origins: "*", headers: "*", methods: "*")]

        public IEnumerable<string> Get()
        {
           // string wanted_path = Path.GetDirectoryName(Path.GetDirectoryName(System.IO.Directory.GetCurrentDirectory()));
            //string[] filePaths = Directory.GetFiles("../Images");
            //return filePaths;

            //string startupPath = System.IO.Directory.GetCurrentDirectory();

            //string startupPath2 = Environment.CurrentDirectory;
            string[] files = Directory.GetFiles(@"Images");
            //string path = Directory.GetCurrentDirectory();


            return files;
        }

        // GET: api/Image/5
        public string Get(int id)
        {

            //string[] filePaths = Directory.GetFiles(@"Images");

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
