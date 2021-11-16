using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Company.DAL.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Code { get; set; }

        [Required]
        [MaxLength(150)]
        public DateTime InvoiceDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 2)")]
        public decimal Total { get; set; }

        public int CustomerId { get; set; }
        // public virtual Customer Customer { get; set; }

        // public virtual IList<InvoiceDetail> InvoiceDetails { get; set; }

        // TotalPayment



    }
}
