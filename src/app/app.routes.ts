import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: UserComponent,
        children: [
            {path: 'signup', component:RegisterComponent},
            {path: 'login', component:LoginComponent},
        ]
    },
    {path: 'dashboard', component:DashboardComponent}
];
