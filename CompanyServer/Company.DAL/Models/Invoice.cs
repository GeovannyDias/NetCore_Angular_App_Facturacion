using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// MODEL OR ENTITY
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
        public decimal Subtotal { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 2)")]
        public decimal Iva { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 2)")]
        public decimal Total { get; set; }

        [Required]
        public bool State { get; set; }


        public int CustomerId { get; set; }
        // public virtual Customer Customer { get; set; }

        // public virtual IList<InvoiceDetail> InvoiceDetails { get; set; }

        // TotalPayment



    }
}
