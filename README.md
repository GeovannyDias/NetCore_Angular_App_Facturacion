# NetCore, Angular, App Facturación
.Net Core (Api RestFull), Angular, Sql Server



## Corrigiendo el error “A possible object cycle was detected” en distintas versiones de ASP.NET Core

* **https://gavilanch.wordpress.com/2021/05/19/corrigiendo-el-error-a-possible-object-cycle-was-detected-en-distintas-versiones-de-asp-net-core/**

```
ASP.NET Core 6+)

services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


ASP.NET Core 5

services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

SP.NET Core 3.1 o menos

Instala la librería: Microsoft.AspNetCore.Mvc.NewtonsoftJson (instala la versión correspondiente, si tienes ASP.NET Core 3.1, pues instalas la versión 3.1 de la librería)

services.AddControllers().AddNewtonsoftJson(x => 
 x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


```

## Tipos numéricos de punto flotante (referencia de C#)
* **https://docs.microsoft.com/es-es/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types**


```
Literales reales

El tipo de un literal real viene determinado por su sufijo, como se indica a continuación:

El literal sin sufijo o con el sufijo d o D es del tipo double
El literal con el sufijo f o F es del tipo float
El literal con el sufijo m o M es del tipo decimal
En el código siguiente se muestra un ejemplo de cada uno de ellos:

double d = 3D;
d = 4d;
d = 3.934_001;

float f = 3_000.5F;
f = 5.4f;

decimal myMoney = 3_000.5m;
myMoney = 400.75M;

```

## Recuperación de datos relacionados

* **https://docs.microsoft.com/es-es/dotnet/architecture/modern-web-apps-azure/work-with-data-in-asp-net-core-apps**
* **https://docs.microsoft.com/en-us/ef/core/miscellaneous/async**

```
// Includes all expression-based includes
query = specification.Includes.Aggregate(query,
            (current, include) => current.Include(include));

// Include any string-based include statements
query = specification.IncludeStrings.Aggregate(query,
            (current, include) => current.Include(include));


Asynchronous Programming

var groupedHighlyRatedBlogs = await context.Blogs
    .AsQueryable()
    .Where(b => b.Rating > 3) // server-evaluated
    .AsAsyncEnumerable()
    .GroupBy(b => b.Rating) // client-evaluated
    .ToListAsync();

```



## Lectura de datos relacionados con el Entity Framework en una aplicación ASP.NET MVC (5 de 10)

* **https://docs.microsoft.com/es-es/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/reading-related-data-with-the-entity-framework-in-an-asp-net-mvc-application**

* **https://docs.microsoft.com/es-es/ef/ef6/fundamentals/relationships**

```
Carga diferida, diligente y explícita de datos relacionados
```

## Relación de Entidades

* **https://docs.microsoft.com/es-es/ef/core/modeling/relationships?tabs=fluent-api%2Cfluent-api-simple-key%2Csimple-key**

```
Ver Doc*

 protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>()
            .HasMany(p => p.Tags)
            .WithMany(p => p.Posts)
            .UsingEntity<PostTag>(
                j => j
                    .HasOne(pt => pt.Tag)
                    .WithMany(t => t.PostTags)
                    .HasForeignKey(pt => pt.TagId),
                j => j
                    .HasOne(pt => pt.Post)
                    .WithMany(p => p.PostTags)
                    .HasForeignKey(pt => pt.PostId),
                j =>
                {
                    j.Property(pt => pt.PublicationDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                    j.HasKey(t => new { t.PostId, t.TagId });
                });
    }


public DateTime PublicationDate { get; set; }
TimeDate.now

```

## ASP.NET Core Performance Best Practices
* **https://docs.microsoft.com/en-us/aspnet/core/performance/performance-best-practices?view=aspnetcore-5.0**

```
Return IEnumerable<T> or IAsyncEnumerable<T>

```


## FRONT END

```
Angular 11:

PrimeNG:

npm install primeng@11 --save
npm install primeicons --save

npm install @angular/cdk@11 --save

https://stackoverflow.com/questions/55609555/error-module-not-found-error-cant-resolve-angular-cdk-scrolling


Pring NG

https://www.geeksforgeeks.org/angular-primeng-dialog-component/

Ionicons v5.5.2

In app.module.ts

import { NgModule, /** ADD THIS -> **/ CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [...],
    entryComponents: [...],
    imports: [...],
    exports: [...],
    providers: [...],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] /** 👈🏻 ADD THIS **/ 
})
export AppModule {}

in src\index.html

<body>
  <app-root></app-root>
  <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
</body>

https://github.com/ionic-team/ionicons/issues/769


PRIMEFLEX: (No instalado)

npm install primeflex@2 --save 

"styles": [
    "src/styles.scss",
    "./node_modules/primeflex/primeflex.css"
],


```