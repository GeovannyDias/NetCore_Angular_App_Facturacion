using Company.BL.Services;
using Company.DAL;
using Company.DAL.Interfaces;
using Company.DAL.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Company.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Company.API", Version = "v1" });
            });

            

            // DATABASE CONNECTION
            // Inyectar el contexto en el contenedor de servicios mediante inyeccion de dependencias
            // services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer("cadena_conexion"));
            services.AddDbContext<ApiDbContext>(options => options.UseSqlServer(
                Configuration.GetConnectionString("DevConnection")
                ));

            // CORS
            services.AddCors(options => options.AddPolicy("AllowWebApp",
                builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                ));

            // INYECCIÓN DE DEPENDENCIAS
            services.AddTransient<ICategoryRepository, CategoryService>();
            services.AddTransient<IProductRepository, ProductService>();
            services.AddTransient<ICustomerRepository, CustomerService>();
            services.AddTransient<IInvoiceRepository, InvoiceService>();

            // Corrigiendo el error “A possible object cycle was detected”
            // services.AddControllers().AddJsonOptions(x =>
            // x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Company.API v1"));
            }

            // CORS
            app.UseCors("AllowWebApp"); // Cors

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
