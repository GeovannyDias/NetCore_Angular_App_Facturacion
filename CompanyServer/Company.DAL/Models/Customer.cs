using System.ComponentModel.DataAnnotations;

// MODEL OR ENTITY
namespace Company.DAL.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public string CI{ get; set; }

        [Required]
        [MaxLength(10)]
        public string Phone { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        public bool State { get; set; }

        // public virtual List<Invoice> Invoices { get; set; }
    }
}
