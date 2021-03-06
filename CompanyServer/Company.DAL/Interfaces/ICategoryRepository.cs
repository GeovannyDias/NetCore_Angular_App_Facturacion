using Company.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


// Intefaces o contratos con las funciones que si o si el servicio debe tener
namespace Company.DAL.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(int id);
        Task<Category> PostCategory(Category dataCategory);
        Task<Category> UpdateCategory(int id, Category dataCategory);
        Task<string> DeleteCategoryById(int id);
    }
}
