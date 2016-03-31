using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class Item
    {
        public string OrderID { get; set; }
        public string ProductID  { get; set; }
        public int Quantity { get; set; }

    }
}