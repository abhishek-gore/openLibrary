import { inject, Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import * as BookshelfActions from './book.actions';
import { catchError, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";

@Injectable()
export class BookShelfEffects {
    private actions$= inject(Actions);
    private store = inject(Store<AppState>);
    constructor (
    ) {}
    loadBooks$ = createEffect(() => 
        this.actions$.pipe(ofType(BookshelfActions.loadBooks), switchMap(() => {
            const books = JSON.parse(localStorage.getItem('books') || '[]');
            return of(BookshelfActions.loadBooksSuccess({books}));
        }),
    catchError(error => of(BookshelfActions.loadBooksFailure({error})))));

    saveBooks$ = createEffect(() => 
    this.actions$.pipe(
        ofType(BookshelfActions.addBook, BookshelfActions.removeBook), 
        withLatestFrom(this.store.select(state => state.bookshelf)),
        tap(([action, bookshelf]) => {
            localStorage.setItem('books', JSON.stringify(bookshelf.books));
        })
    ),
    { dispatch: false }
    )
}