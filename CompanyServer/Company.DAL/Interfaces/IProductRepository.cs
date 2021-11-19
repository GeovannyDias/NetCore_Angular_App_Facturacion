using Company.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.DAL.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetProductsByState(bool state);

        Task<Product> GetProductById(int id);
        Task<Product> PostProduct(Product dataProduct);
        Task<Product> UpdateProduct(int id, Product dataProduct);
        Task<string> DeleteProductById(int id);
    }
}
