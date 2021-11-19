using Company.DAL;
using Company.DAL.DTOs;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.BL.Services
{
    public class InvoiceService: IInvoiceRepository
    {
        private readonly ApiDbContext _context;

        // Creamos un constructor e inyectar el contexto
        public InvoiceService(ApiDbContext context)
        {
            _context = context;
        }


        // GET
        public async Task<IEnumerable<Invoice>> GetInvoices()
        {
            var listInvoices = await _context.Invoice.ToListAsync();
            return listInvoices;
        }

        // GET By Id
        public async Task<Invoice> GetInvoiceById(int id)
        {
            var InvoiceFound = await _context.Invoice.FindAsync(id);
            return InvoiceFound;
        }

        // POST                       [AUTOMAPER (Pendiente)]
        public async Task<Invoice> PostInvoice(InvoiceDto dataInvoice)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var invoice = new Invoice();
                invoice.Code = dataInvoice.Code;
                invoice.InvoiceDate = DateTime.Now;
                invoice.CustomerId = dataInvoice.CustomerId;
                invoice.State = true;

                // invoice.Total = dataInvoice.InvoiceDetails.Sum(d => d.Amount * d.UnitPrice); // lambda
                var subtotal = dataInvoice.InvoiceDetails.Sum(d => d.Amount * d.UnitPrice); // lambda
                var iva = subtotal * 0.12m; // m → literal con sufijo (m) es de tipo decimal.
                invoice.Subtotal = subtotal;
                invoice.Iva = iva;
                invoice.Total = subtotal + iva;

                _context.Invoice.Add(invoice);
                await _context.SaveChangesAsync();

                foreach (var data in dataInvoice.InvoiceDetails)
                {
                    var detail = new InvoiceDetail();
                    detail.InvoiceId = invoice.Id;
                    detail.ProductId = data.ProductId;
                    detail.Amount = data.Amount;
                    detail.UnitPrice = data.UnitPrice;
                    detail.Total = data.Amount * data.UnitPrice;
                    _context.InvoiceDetail.Add(detail);
                    await _context.SaveChangesAsync();
                }
                await transaction.CommitAsync();
                return invoice;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw new Exception(); // throw;
            }
        }


        //public async Task<Invoice> PostInvoice(Invoice dataInvoice)
        //{
        //    _context.Invoice.Add(dataInvoice);
        //    await _context.SaveChangesAsync();
        //    return dataInvoice;
        //}


        // UPDATE
        public async Task<Invoice> UpdateInvoice(int id, Invoice dataInvoice)
        {
            _context.Invoice.Update(dataInvoice);
            await _context.SaveChangesAsync();
            return dataInvoice;
        }

        // DELETE
        public async Task<string> DeleteInvoiceById(int id)
        {
            var InvoiceFound = await _context.Invoice.FindAsync(id);
            if (InvoiceFound == null)
            {
                return "NOT_FOUND";
            }
            _context.Invoice.Remove(InvoiceFound);
            await _context.SaveChangesAsync();
            return "OK";
        }
    }
}
