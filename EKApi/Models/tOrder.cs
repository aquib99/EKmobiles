//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EKApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tOrder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tOrder()
        {
            this.tOrderLines = new HashSet<tOrderLine>();
        }
    
        public int Id { get; set; }
        public string UserID { get; set; }
        public System.DateTime Date { get; set; }
        public decimal Total { get; set; }
        public string PaymentVerificationID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tOrderLine> tOrderLines { get; set; }
        public virtual tUser tUser { get; set; }
    }
}
