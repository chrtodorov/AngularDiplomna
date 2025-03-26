import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ViewItemsComponent } from './view-items/view-items.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent},
    {path: 'viewOrders', component: ViewOrdersComponent},
    {path: 'createOrder', component: CreateOrderComponent},
    {path: 'viewItems', component: ViewItemsComponent}
];
    