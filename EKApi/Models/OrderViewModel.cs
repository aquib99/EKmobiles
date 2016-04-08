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

    }

    public partial class Order
    {
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
    }
}