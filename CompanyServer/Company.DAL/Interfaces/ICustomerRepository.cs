using Company.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Company.DAL.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomers();
        Task<Customer> GetCustomerById(int id);
        Task<Customer> PostCustomer(Customer dataCustomer);
        Task<Customer> UpdateCustomer(int id, Customer dataCustomer);
        Task<string> DeleteCustomerById(int id);
    }
}
