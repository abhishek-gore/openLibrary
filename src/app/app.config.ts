import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookshelfReducer } from './features/book/books.reducer';
import { BookShelfEffects } from './features/book/books.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      bookshelf: bookshelfReducer
    }),
    provideEffects([BookShelfEffects]),
    provideStoreDevtools({ maxAge: 25})
  ]
};
