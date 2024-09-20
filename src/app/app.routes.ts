import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { PnF } from './NoPageFound';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
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
