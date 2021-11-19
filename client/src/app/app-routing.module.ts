import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './pages/home/components/invoice/invoice.component';
import { SelectProductComponent } from './pages/home/components/select-product/select-product.component';
import { FormProductComponent } from './pages/products/components/form-product/form-product.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },



  {
    path: 'not-found',
    // loadChildren: () => import('./shared/components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
    component: PageNotFoundComponent
  },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'form-product', component: FormProductComponent },
  { path: 'select-product', component: SelectProductComponent },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
