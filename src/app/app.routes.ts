import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/home/home').then(m => m.Home),
            },
            {
                path: 'book',
                loadChildren: () => 
                    import('./features/book/book.module').then(m => m.BookModule),
            },
            {
                path: 'shelf',  
                loadChildren: () => 
                    import('./features/shelf/shelf.module').then(m => m.ShelfModule),
            },
            {
                path: 'profile',
                loadComponent: () => 
                    import('./features/profile/profile').then(m => m.Profile),
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
