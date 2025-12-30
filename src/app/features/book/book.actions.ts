import { createAction, props } from "@ngrx/store";
import { Book } from "./book.model";

export const loadBooks = createAction('[Bookshelf] Load Books');

export const loadBooksSuccess = createAction('[Bookshelf] Load Books Success', props<{ books: Book[] }>());

export const addBook = createAction('[Bookshelf] Add Book', props<{ book: Book }>());

export const removeBook = createAction('[Bookshelf] Remove Book', props<{ bookId: string }>());

export const loadBooksFailure = createAction('[Bookshelf] Load Books Failure', props<{ error: string }>());