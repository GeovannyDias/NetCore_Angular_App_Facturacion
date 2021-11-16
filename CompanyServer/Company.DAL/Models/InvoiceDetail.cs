using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Company.DAL.Models
{
    public class InvoiceDetail
    {
        // public int Id { get; set; }

        // Relationship
        public int InvoiceId { get; set; }
        // public virtual Invoice Invoice { get; set; }

        // Relationship
        public int ProductId { get; set; }
        // public virtual Product Product { get; set; }



        // Cantidad
        [Required]
        [MaxLength(100)]
        public int Amount { get; set; }

        [Required]
        [Column(TypeName = "decimal(9, 2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Total { get; set; }
    }
}
