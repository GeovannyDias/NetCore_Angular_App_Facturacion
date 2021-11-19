using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// MODEL OR ENTITY
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

        [Required]
        public bool State { get; set; }


        public int CategoryId { get; set; }
        // public Category Category { get; set; }



        // public virtual IList<InvoiceDetail> InvoiceDetails { get; set; }

    }
}
