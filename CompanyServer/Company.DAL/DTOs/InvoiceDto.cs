using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Company.DAL.DTOs;

namespace Company.DAL.DTOs
{
    public class InvoiceDto
    {
        // Optional
        public int? Id { get; set; }


        public string Code { get; set; }

        // Optional
        public DateTime? InvoiceDate { get; set; }

        [Required]
        [Range(1, Double.MaxValue, ErrorMessage = "You must submit CustomerId")]
        public int CustomerId { get; set; }

        // Optional
        public decimal? Subtotal { get; set; }

        // Optional
        public decimal? Iva { get; set; }

        // Optional
        public decimal? Total { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "You must select Products")]
        public List<InvoiceDetailDto> InvoiceDetails { get; set; }

        // Opcional
        [Required]
        public bool State { get; set; }


        public InvoiceDto()
        {
            this.InvoiceDetails = new List<InvoiceDetailDto>();
        }
    }
}
