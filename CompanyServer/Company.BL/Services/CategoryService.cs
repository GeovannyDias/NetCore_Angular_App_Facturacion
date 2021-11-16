using Company.DAL;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Company.BL.Services
{
    public class CategoryService: ICategoryRepository
    {
        private readonly ApiDbContext _context;

        // Creamos un constructor e inyectar el contexto
        public CategoryService(ApiDbContext context)
        {
            _context = context;
        }


        // GET Categories
        public async Task<IEnumerable<Category>> GetCategories()
        {
            // var includeProduct = _context.Category.Include(x => x.Products);
            // var listCategories = await includeProduct.ToListAsync();

            var listCategories = await _context.Category.ToListAsync();
            return listCategories;
        }

        // GET Category By Id
        public async Task<Category> GetCategoryById(int id)
        {

            var categoryFound = await _context.Category.FindAsync(id);
            return categoryFound;
        }


        // POST Category
        public async Task<Category> PostCategory(Category dataCategory)
        {
            _context.Category.Add(dataCategory);
            await _context.SaveChangesAsync();
            return dataCategory;
        }


        // UPDATE
        public async Task<Category> UpdateCategory(int id, Category dataCategory)
        {
            _context.Category.Update(dataCategory);
            await _context.SaveChangesAsync();
            return dataCategory;
        }

        // DELETE
        public async Task<string> DeleteCategoryById(int id)
        {
            var categoryFound = await _context.Category.FindAsync(id);
            if (categoryFound == null)
            {
                return "NOT_FOUND";
            }
            _context.Category.Remove(categoryFound);
            await _context.SaveChangesAsync();
            return "OK";
        }




    }
}
