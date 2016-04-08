using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{

    public class Item
    {
        
        public int ProductID  { get; set; }
        public int Quantity { get; set; }
        public Item()
        {

        }
        public tProduct getItem() {

            return new tProduct();

        }
    }
}