using Company.DAL.DTOs;
using Company.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.DAL.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<IEnumerable<Invoice>> GetInvoices();
        Task<Invoice> GetInvoiceById(int id);
        // Task<Invoice> PostInvoice(Invoice dataInvoice);
        Task<Invoice> PostInvoice(InvoiceDto dataInvoice);
        Task<Invoice> UpdateInvoice(int id, Invoice dataInvoice);
        Task<string> DeleteInvoiceById(int id);
    }
}
