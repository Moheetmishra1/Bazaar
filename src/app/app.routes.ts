import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { PnF } from './NoPageFound';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        
    },
    {
        path:'products/view/:productId',
        component:ViewComponent
    },{
        path:'addproduct',
        component:AddProductComponent
    }
    ,
    {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'**',
        component:PnF
    }
];
