using Company.DAL;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.BL.Services
{
    public class ProductService: IProductRepository
    {
        private readonly ApiDbContext _context;

        // Creamos un constructor e inyectar el contexto
        public ProductService(ApiDbContext context)
        {
            _context = context;
        }


        // GET
        public async Task<IEnumerable<Product>> GetProducts()
        {
            var listProducts = await _context.Product.ToListAsync();
            return listProducts;
        }

        // GET By Id
        public async Task<Product> GetProductById(int id)
        {
            var productFound = await _context.Product.FindAsync(id);
            return productFound;
        }

        // POST
        public async Task<Product> PostProduct(Product dataProduct)
        {
            _context.Product.Add(dataProduct);
            await _context.SaveChangesAsync();
            return dataProduct;
        }

        // UPDATE
        public async Task<Product> UpdateProduct(int id, Product dataProduct)
        {
            _context.Product.Update(dataProduct);
            await _context.SaveChangesAsync();
            return dataProduct;
        }

        // DELETE
        public async Task<string> DeleteProductById(int id)
        {
            var ProductFound = await _context.Product.FindAsync(id);
            if (ProductFound == null)
            {
                return "NOT_FOUND";
            }
            _context.Product.Remove(ProductFound);
            await _context.SaveChangesAsync();
            return "OK";
        }
    }
}
