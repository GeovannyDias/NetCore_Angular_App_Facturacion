using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Company.DAL.DTOs
{
    public class InvoiceDetailDto
    {

        // public int? Id { get; set; }

        // Optional
        public int? InvoiceId { get; set; }


        public int ProductId { get; set; }
        public int Amount { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? Total { get; set; }

    }
}
