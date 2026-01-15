import { createReducer, on } from "@ngrx/store";
import { Book } from "./book.model";
import * as BookshelfActions from './book.actions';

export interface state {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: state = {
    books: [],
    loading: false,
    error: null
}

export const bookshelfReducer = createReducer(
    initialState, on(BookshelfActions.loadBooks, (state) => ({
        ...state,
        loading: true,
        isLoading: false,
        error: null
    })),

    on(BookshelfActions.loadBooksSuccess, (state, {books}) => ({
        ...state, 
        books,
        loading: false,
        isLoading: false
    })),

    on(BookshelfActions.addBook, (state, {book}) => {
        if (state.books.some(b => b.key === book.key)) {
            return state;
        }
        return {
        ...state,
        books: [...state.books, book]
        }
    }),

    on(BookshelfActions.removeBook, (state, {bookId}) => ({
        ...state,
        books: state.books.filter(book => book.key !== bookId)
    }))

)