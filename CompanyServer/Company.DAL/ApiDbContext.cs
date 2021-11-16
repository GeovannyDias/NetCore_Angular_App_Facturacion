using Company.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Company.DAL
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

        // RELATIONSHIP
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // CATEGORY TO PRODUCT

            //modelBuilder.Entity<Product>()
            //    .HasOne<Category>(p => p.Category)
            //    .WithMany(c => c.Products)
            //    .HasForeignKey(p => p.CategoryId);

            //modelBuilder.Entity<Category>()
            //    .HasMany(c => c.Products)
            //    .WithOne()
            //    .HasForeignKey(c => c.CategoryId);

            modelBuilder.Entity<Product>()
                .HasOne<Category>()
                .WithMany()
                .HasForeignKey(p => p.CategoryId);


            // CUSTOMER TO INVOICE
            
            //modelBuilder.Entity<Invoice>()
            //    .HasOne<Customer>(i => i.Customer)
            //    .WithMany(c => c.Invoices)
            //    .HasForeignKey(i => i.CustomerId);

            modelBuilder.Entity<Invoice>()
                .HasOne<Customer>()
                .WithMany()
                .HasForeignKey(i => i.CustomerId);

            // MANY TO MANY
            // Invoice to InvoiceDetail to Product
            modelBuilder.Entity<InvoiceDetail>().HasKey(id => new { id.InvoiceId, id.ProductId });

            //modelBuilder.Entity<InvoiceDetail>()
            //    .HasOne<Invoice>(id => id.Invoice)
            //    .WithMany(i => i.InvoiceDetails)
            //    .HasForeignKey(id => id.InvoiceId);

            //modelBuilder.Entity<InvoiceDetail>()
            //    .HasOne<Product>(id => id.Product)
            //    .WithMany(p => p.InvoiceDetails)
            //    .HasForeignKey(id => id.ProductId);

            modelBuilder.Entity<InvoiceDetail>()
                .HasOne<Invoice>()
                .WithMany()
                .HasForeignKey(id => id.InvoiceId);

            modelBuilder.Entity<InvoiceDetail>()
                .HasOne<Product>()
                .WithMany()
                .HasForeignKey(id => id.ProductId);


        }

        // Mapping Entities (Models)
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }


        public DbSet<Customer> Customer { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetail { get; set; }





    }
}
