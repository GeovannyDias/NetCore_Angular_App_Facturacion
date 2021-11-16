using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Company.DAL.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(7, 2)")]
        public decimal Price { get; set; }


        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }


        // public virtual IList<InvoiceDetail> InvoiceDetails { get; set; }

    }
}
