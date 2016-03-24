using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class Payment
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string chName { get; set; }
        public string cardNo { get; set; }
        public string csv { get; set; }
        public DateTime ExpDate { get; set; }
        public string FlatNo { get; set; }
        public string Town { get; set; }
        public void verifypayment()
        {
            if ( chName== "") {

            }
        }

    }
}