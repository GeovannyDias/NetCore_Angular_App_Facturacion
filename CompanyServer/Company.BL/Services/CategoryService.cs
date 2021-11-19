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





        /*
         * 
         * var blog = context.Blogs.Single(e => e.Id == 1);
         * var entityEntry = context.Entry(blog);
         * 
         * 
         * SQL QUERY
         * 
             public async Task<ActionResult> Details(int? id)
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            // Commenting out original code to show how to use a raw SQL query.
            //Department department = await db.Departments.FindAsync(id);

            // Create and execute raw SQL query.
            string query = "SELECT * FROM Department WHERE DepartmentID = @p0";
            Department department = await db.Departments.SqlQuery(query, id).SingleOrDefaultAsync();
    
            if (department == null)
            {
                return HttpNotFound();
            }
            return View(department);
         */



    }
}





/*

var posts = await _context.Post
    .Where(post =>
        _context.BlogPost.Any(bp => bp.BlogId == blogId && bp.PostId == post.PostId)
    )
    .ToListAsync();


var postIds = await _context.BlogPost
    .Where(bp => bp.BlogId = blogId)
    .Select(bp => bp.PostId)
    .ToArrayAsync();
var posts = await _context.Post
    .Where(p => postIds.Contains(p.PostId))
    .ToListAsync();


var posts = await _context.BlogPost
    .Where(bp => bp.BlogId == blogId)
    .Select(bp => bp.Post)
    .ToListAsync();


var posts = await _context.Blog
    .Where(b => b.BlogId == blogId)
    .SelectMany(b => b.Posts)
    .ToListAsync();


var posts = await _context.Blog
    .Where(b => b.BlogId == blogId)
    .SelectMany(b => b.BlogPosts)
    .Select(bp => bp.Post)
    .ToListAsync();


var posts = await _context.Blog
    .Where(b => b.BlogId == blogId)
    .SelectMany(b => b.BlogPosts.Select(bp => bp.Post))
    .ToListAsync();



 */