using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public partial class OrderLine
    {
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public int QuantityOrdered { get; set; }
        public decimal Price { get; set; }
        public string Model { get; set; }
        public string ImageURL { get; set; }

    }

    public partial class Order
    {
        private EKDBEntities db = new EKDBEntities();
        // [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            this.OrderLines = new HashSet<OrderLine>();
        }

        public int Id { get; set; }
        public string UserID { get; set; }
        public System.DateTime Date { get; set; }
        public decimal Total { get; set; }
        public string PaymentVerificationID { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public ICollection<OrderLine> OrderLines { get; set; }

        public Order getOrderSummary(tOrder O)
        {

            List<tOrder> tableOrders = new List<tOrder>();
            tableOrders.Add(O);

            List<Order> ViewOrders = new List<Order>();
            ViewOrders =getOrders(tableOrders);
            if (ViewOrders[0] != null)
            {
                return ViewOrders[0];
            }
            else
            {
                Order nullOrder = null;
                return nullOrder;

            }
            
            

        }
        public List<Order> getOrders(List<tOrder> Orders)
        {
            List<Order> ViewOrders =new List<Order>();
            foreach (tOrder O in Orders)
            {
                if (O != null)
                {
                    Order OrderSummary = new Order();
                    OrderSummary.Id = O.Id;
                    OrderSummary.Total = O.Total;
                    OrderSummary.UserID = O.UserID;
                    OrderSummary.PaymentVerificationID = O.PaymentVerificationID;
                    OrderSummary.Date = O.Date;
                    foreach (tOrderLine tol in O.tOrderLines)
                    {
                        tProduct p = db.tProducts.Find(tol.ProductID);
                        OrderLine Ol = new OrderLine();
                        Ol.Model = p.Model;
                        Ol.ImageURL = p.ImageURL;
                        Ol.OrderID = tol.OrderID;
                        Ol.ProductID = tol.ProductID;
                        Ol.QuantityOrdered = tol.QuantityOrdered;
                        Ol.Price = tol.Price;
                        OrderSummary.OrderLines.Add(Ol);
                    }
                    ViewOrders.Add(OrderSummary);
                }
            }
            return ViewOrders;
        }
    }
}