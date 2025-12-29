import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BookshelfState } from '../book/book.model';
import { Store } from '@ngrx/store';
import { loadBooks, removeBook } from '../book/book.actions';

@Component({
  selector: 'app-shelf',
  imports: [SharedModule],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
})
export class ShelfComponent {
  private store = inject(Store<{ bookshelf: BookshelfState }>);
  books$ = this.store.select((state) => state.bookshelf.books);
  loading$ = this.store.select(state => state.bookshelf.loading);
  constructor() {
    this.store.dispatch(loadBooks());
  }

  removeBook(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }
}
