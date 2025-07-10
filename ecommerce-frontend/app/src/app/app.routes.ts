import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './frontLayout/front-layout/front-layout.component';
import { ListproductsComponent } from './frontLayout/listproducts/listproducts.component';

import { RegisterComponent } from './auth/register/register.component';
import { DashboardLayoutComponent } from './adminArea/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './adminArea/dashboard/dashboard.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import ("./login/login.component").then( c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import ("./auth/register/register.component").then(c => c.RegisterComponent)},
    {
        path: "", component: FrontLayoutComponent, children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            { path: 'products', component: ListproductsComponent },
            { path: 'products/:id', loadComponent: () => import("./frontLayout/listproducts/product-details/product-details.component").then(c => c.ProductDetailsComponent)   },
            { path: 'cart', loadComponent: () => import("./frontLayout/front-layout/cart/cart.component").then(c => c.CartComponent) },
            { path: 'orders', loadComponent: () => import("./frontLayout/front-layout/order/order.component").then(c => c.OrderComponent) },
            { path: 'userprofile', loadComponent: () => import("./frontLayout/front-layout/user-profile/user-profile.component").then(c => c.UserProfileComponent) },
            { path: 'favs', loadComponent: () => import("./frontLayout/front-layout/favs/favs.component").then(c => c.FavsComponent) },
            { path: 'aboutus', loadComponent: () => import("./frontLayout/front-layout/display-about-us/display-about-us.component").then(c => c.DisplayAboutUsComponent) },
            { path: 'faq', loadComponent: () => import("./frontLayout/front-layout/display-faq/display-faq.component").then(c => c.DisplayFAQComponent) },
            { path: 'testimonials', loadComponent: () => import("./frontLayout/front-layout/testimonials/testimonials.component").then(c => c.TestimonialsComponent) },
            { path: 'categories', loadComponent: () => import("./frontLayout/front-layout/display-categories/display-categories.component").then(c => c.DisplayCategoriesComponent) },
            { path: 'subcategories', loadComponent: () => import("./frontLayout/front-layout/display-sub-categories/display-sub-categories.component"   ).then(c => c.DisplaySubCategoriesComponent) },
            { path: 'brands', loadComponent: () => import("./frontLayout/front-layout/display-brands/display-brands.component").then(c => c.DisplayBrandsComponent) },
        ]

    },
    {
        path: "admin", component: DashboardLayoutComponent, canActivate: [authGuardGuard], children: [
            { path: "", component: DashboardComponent },
            {path: "addproduct", loadComponent: () => import("./adminArea/add-product/add-product.component").then(c => c.AddProductComponent)},
            {path: "myproducts", loadComponent: () => import("./adminArea/my-products/my-products.component").then(c => c.MyProductsComponent)},
            {path: "editProduct/:id", loadComponent: () => import("./adminArea/my-products/edit-product/edit-product.component").then(c => c.EditProductComponent) },
            {path: "addbrand", loadComponent: () => import("./adminArea/add-brand/add-brand.component").then(c => c.AddBrandComponent) },
            {path: "mybrands", loadComponent: () => import("./adminArea/add-brand/display-delete-brand/display-delete-brand.component").then(c => c.DisplayDeleteBrandComponent) },
            {path: "addcategories", loadComponent: () => import("./adminArea/add-category/add-category.component").then(c => c.AddCategoryComponent) },
            {path: "mycategories", loadComponent: () => import("./adminArea/add-category/display-delete-category/display-delete-category.component").then(c => c.DisplayDeleteCategoryComponent) },
            {path: "addsubcategories", loadComponent: () => import("./adminArea/add-sub-category/add-sub-category.component").then(c => c.AddSubCategoryComponent) },
            {path: "mysubcategories", loadComponent: () => import("./adminArea/add-sub-category/display-delete-sub-category/display-delete-sub-category.component").then(c => c.DisplayDeleteSubCategoryComponent) },
            {path: "addfaq", loadComponent: () => import("./adminArea/add-faq/add-faq.component").then(c => c.AddFAQComponent) },
            {path: "myfaqs", loadComponent: () => import("./adminArea/add-faq/edit-faq//edit-faq.component").then(c => c.EditFAQComponent) },
            {path: "mytestimonials", loadComponent: () => import("./adminArea/edit-testimonials/edit-testimonials.component").then(c => c.EditTestimonialsComponent) },
            {path: "addaboutus", loadComponent: () => import("./adminArea/add-about-us/add-about-us.component").then(c => c.AddAboutUsComponent) },
            {path: "myaboutus", loadComponent: () => import("./adminArea/add-about-us/delete-about-us/delete-about-us.component").then(c => c.DeleteAboutUsComponent) },
            {path: "myorders", loadComponent: () => import("./adminArea/update-orders/update-orders.component").then(c => c.UpdateOrdersComponent) },
            {path: "allusers", loadComponent: () => import("./adminArea/all-users/all-users.component").then(c => c.AllUsersComponent) },
            { path: 'adminRegister', loadComponent: () => import ("./admin-register/admin-register.component").then(c => c.AdminRegisterComponent)},

        ]
    }
];
