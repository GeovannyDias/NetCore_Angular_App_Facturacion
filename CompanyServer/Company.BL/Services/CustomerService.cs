using Company.DAL;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.BL.Services
{
    public class CustomerService: ICustomerRepository
    {
        private readonly ApiDbContext _context;

        // Creamos un constructor e inyectar el contexto
        public CustomerService(ApiDbContext context)
        {
            _context = context;
        }


        // GET
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            var listCustomers = await _context.Customer.ToListAsync();
            return listCustomers;
        }

        // GET By Id
        public async Task<Customer> GetCustomerById(int id)
        {
            var CustomerFound = await _context.Customer.FindAsync(id);
            return CustomerFound;
        }

        // POST
        public async Task<Customer> PostCustomer(Customer dataCustomer)
        {
            _context.Customer.Add(dataCustomer);
            await _context.SaveChangesAsync();
            return dataCustomer;
        }

        // UPDATE
        public async Task<Customer> UpdateCustomer(int id, Customer dataCustomer)
        {
            _context.Customer.Update(dataCustomer);
            await _context.SaveChangesAsync();
            return dataCustomer;
        }

        // DELETE
        public async Task<string> DeleteCustomerById(int id)
        {
            var CustomerFound = await _context.Customer.FindAsync(id);
            if (CustomerFound == null)
            {
                return "NOT_FOUND";
            }
            _context.Customer.Remove(CustomerFound);
            await _context.SaveChangesAsync();
            return "OK";
        }
    }
}
