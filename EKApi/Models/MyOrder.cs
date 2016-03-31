using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class MyOrder
    {
        public string UserID { get; set; }
        //public System.DateTime Date { get; set; }
        //public decimal Total { get; set; }
        //public string PaymentVerificationID { get; set; }

        public MyOrder()
        {
            //this.tOrderLines = new HashSet<tOrderLine>();
        }
    }
}