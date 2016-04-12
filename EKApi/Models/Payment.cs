using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class Payment
    {
        public string chName { get; set; }
        public string cardNo { get; set; }
        public string cvc { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string FlatNo { get; set; }
        public string Town { get; set; }
       
        public string verifypayment()
        {
            if ( this.chName != "" && this.cardNo!= "") {
               return Guid.NewGuid().ToString();
            }
            else
            {
                return "0";
            }
        }

    }
}