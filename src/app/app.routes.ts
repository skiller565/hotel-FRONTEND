import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full'},
    { 
        path: 'pages', 
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.routes').then(x => x.pagesRoutes)
    }
];
