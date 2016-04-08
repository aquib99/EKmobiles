using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class MyOrder
    {
        public string UserID { get; set; }
        public ICollection<Item> Items { get; set; }
        public double Total { get; set; }
        public Payment PaymentInfo { get; set; }
    
        public tOrder processorder()
        {
            tOrder Order = new tOrder();
            decimal Total = 0;
            Stock Stock = new Stock();
            bool StockCheck = Stock.checkstock(this.Items);
            string vid = this.PaymentInfo.verifypayment();
            if (vid != "" && StockCheck == true)
            {
               
                ICollection<tOrderLine> OrderItems = Stock.updatestock(this.Items);
                foreach (tOrderLine oi in OrderItems)
                {
                    Total += oi.Price * oi.QuantityOrdered; 
                }
                Order.UserID = UserID;
                Order.PaymentVerificationID = vid;
                Order.Date = System.DateTime.Now;
                Order.Total = Total;
                Order.tOrderLines = OrderItems;
                return Order;

            }
            else
            {
                return new tOrder();
            }
            
        }
       
    }
   
}