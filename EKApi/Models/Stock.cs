using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace EKApi.Models
{
    public class Stock
    {
        public EKDBEntities db = new EKDBEntities();
        public List<tProduct> Products = new List<tProduct>();
       // public List<tProduct> Products = new List<tProduct>();

        public List<tOrderLine> OrderItems = new List<tOrderLine>();

        public bool checkstock(ICollection<Item> Items)
        {
            int c = Items.Count();
            List<bool> results =new List<bool>();
            foreach (Item i in Items)
            {
                tProduct Item = new tProduct(); 
                Item = db.tProducts.Find(i.ProductID);
                if (Item != null)
                {
                   if (Item.Quantity >= i.Quantity)
                   {
                        Products.Add(Item);                        
                   }            
                }
            }
            if (c == Products.Count)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public ICollection<tOrderLine> updatestock(ICollection<Item> Items)
        {
            
            foreach (Item I in Items)
            {
                tOrderLine OLItem = new tOrderLine();
                tProduct Product = (from P in Products.OfType<tProduct>() where P.Id == I.ProductID select P).FirstOrDefault();
                Product.Quantity = Product.Quantity - I.Quantity;
                OLItem.ProductID = Product.Id;
                OLItem.QuantityOrdered = I.Quantity;
                OLItem.Price = Product.Price;
                db.Entry(Product).State = EntityState.Modified;
                OrderItems.Add(OLItem);
            }
            try
            {
              db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
               throw;
            }

            return OrderItems;
        }
        public bool rollbackstock(ICollection<Item> Items) {
            return true;
        }
    }
}