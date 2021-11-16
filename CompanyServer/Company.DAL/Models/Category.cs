using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Company.DAL.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        // public virtual ICollection<Product> Products { get; set;  }

        // [Column(TypeName = "varchar(200)")]

    }
}
