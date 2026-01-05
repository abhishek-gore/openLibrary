import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/home/home').then(m => m.Home),
                canActivate: [AuthGuard]
            },
            {
                path: 'book',
                loadChildren: () => 
                    import('./features/book/book.module').then(m => m.BookModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'shelf',  
                loadComponent: () => 
                    import('./features/shelf/shelf.component').then(m => m.ShelfComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadComponent: () => 
                    import('./features/profile/profile').then(m => m.Profile),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => 
            import('./features/auth/auth').then(m => m.Auth),
    },
    {
        path: '**', redirectTo: ''
    }
];
